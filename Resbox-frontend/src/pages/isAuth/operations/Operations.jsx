import { useContext, useEffect, useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import {
  subDays,
  isSameDay,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isThisWeek,
  isSameWeek,
  format,
  subWeeks
} from 'date-fns'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import OperationCard from '../../../components/operation-card/OperationCard'
import { AuthContext } from '../../../context/auth/AuthContext'
import './Operations.css'

const COLORS = [
  'var(--rb-bg-options',
  'var(--rb-bg-secondary',
  'var(--rb-bg-tertiary)',
  'var(--rb-bg-card-img)',
  'var(--rb-bg-green)',
  'var(--br-bg-boxes-2)',
  'var(--rb-bg-toast)'
]

const Operations = () => {
  const {
    statePartners: { operations }
  } = useContext(ReducersContext)

  const { handleOperations } = useContext(AuthContext)

  useEffect(() => {
    handleOperations()
  }, [])

  // Función auxiliar para sumar cantidades de ventas y operaciones
  const sumByDate = (operations, filterFn) =>
    operations.filter(filterFn).reduce((acc, curr) => acc + curr.amount, 0)

  // Datos procesados para gráficos
  const today = new Date()
  const yesterday = subDays(today, 1)
  // Ventas de hoy y ayer
  const salesToday = useMemo(
    () =>
      sumByDate(operations, (op) => isSameDay(new Date(op.updatedAt), today)),
    [operations]
  )
  console.log(salesToday);
  
  const salesYesterday = useMemo(
    () =>
      sumByDate(operations, (op) =>
        isSameDay(new Date(op.updatedAt), yesterday)
      ),
    [operations]
  )

  // Ventas de esta semana y semana pasada
  const salesThisWeek = useMemo(() => {
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }) // Lunes
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 1 }) // Domingo

    return sumByDate(operations, (op) => {
      const opDate = new Date(op.updatedAt)
      return opDate >= startOfCurrentWeek && opDate <= endOfCurrentWeek
    })
  }, [operations])

  const salesLastWeek = useMemo(() => {
    // Calcular el inicio y fin de la semana pasada
    const startOfPrevWeek = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 })
    const endOfPrevWeek = endOfWeek(startOfPrevWeek, { weekStartsOn: 1 })

    return sumByDate(operations, (op) => {
      const opDate = new Date(op.updatedAt)
      return opDate >= startOfPrevWeek && opDate <= endOfPrevWeek
    })
  }, [operations])

  // Ventas de este mes y el mes pasado
  const salesThisMonth = useMemo(() => {
    const startOfCurrentMonth = startOfMonth(today)
    return sumByDate(
      operations,
      (op) => new Date(op.updatedAt) >= startOfCurrentMonth
    )
  }, [operations])

  const salesLastMonth = useMemo(() => {
    const startOfPreviousMonth = startOfMonth(subDays(today, 30))
    const endOfPreviousMonth = endOfMonth(subDays(today, 30))
    return sumByDate(
      operations,
      (op) =>
        new Date(op.updatedAt) >= startOfPreviousMonth &&
        new Date(op.updatedAt) <= endOfPreviousMonth
    )
  }, [operations])

  // Cantidad de operaciones confirmadas y canceladas para el mes
  const operationsStatus = useMemo(() => {
    const startOfCurrentMonth = startOfMonth(today)
    const confirmed = operations.filter(
      (op) =>
        op.status === 'completed' &&
        new Date(op.updatedAt) >= startOfCurrentMonth
    ).length
    const cancelled = operations.filter(
      (op) =>
        op.status === 'cancelled' &&
        new Date(op.updatedAt) >= startOfCurrentMonth
    ).length
    return { confirmed, cancelled }
  }, [operations])

  // Comparar box más vendido
  const mostSoldBoxes = useMemo(() => {
    const startOfCurrentMonth = startOfMonth(today)
    const boxCounts = {}

    operations
      .filter((op) => new Date(op.updatedAt) >= startOfCurrentMonth)
      .forEach((op) => {
        const boxName = op.id_box.name_box
        if (boxCounts[boxName]) {
          boxCounts[boxName] += op.consumed
        } else {
          boxCounts[boxName] = op.consumed
        }
      })

    const boxData = Object.keys(boxCounts).map((box) => ({
      name: box,
      value: boxCounts[box]
    }))
    return boxData
  }, [operations])

  return (
    <div className='operations-component__container'>
      <div className='operations-component__title'>
        <h2>Mis operaciones</h2>
      </div>
      <div className='operations-content__graphics'>
        {/* Primera gráfica: Ventas de hoy vs ayer */}
        <div className='operations-component__graphics'>
          <p>Ventas de hoy vs ayer "€"</p>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Hoy', value: salesToday },
                  { name: 'Ayer', value: salesYesterday }
                ]}
                dataKey='value'
                cx='50%'
                cy='50%'
                outerRadius={80}
                label
              >
                {['Hoy', 'Ayer'].map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Segunda gráfica: Ventas de esta semana vs semana pasada */}
        <div className='operations-component__graphics'>
          <p>Ventas de esta semana vs semana pasada "€"</p>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Esta semana', value: salesThisWeek },
                  { name: 'Semana pasada', value: salesLastWeek }
                ]}
                dataKey='value'
                cx='50%'
                cy='50%'
                outerRadius={80}
                label
              >
                {['Esta semana', 'Semana pasada'].map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tercera gráfica: Ventas de este mes vs mes pasado */}
        <div className='operations-component__graphics'>
          <p>Ventas de este mes vs mes pasado "€"</p>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Este mes', value: salesThisMonth },
                  { name: 'Mes pasado', value: salesLastMonth }
                ]}
                dataKey='value'
                cx='50%'
                cy='50%'
                outerRadius={80}
                label
              >
                {['Este mes', 'Mes pasado'].map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cuarta gráfica: Operaciones confirmadas vs canceladas */}
        <div className='operations-component__graphics'>
          <p>Operaciones confirmadas vs canceladas (este mes)</p>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Confirmadas', value: operationsStatus.confirmed },
                  { name: 'Canceladas', value: operationsStatus.cancelled }
                ]}
                dataKey='value'
                cx='50%'
                cy='50%'
                outerRadius={80}
                label
              >
                {['Confirmadas', 'Canceladas'].map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quinta gráfica: Box más vendido del mes */}
        <div className='operations-component__graphics'>
          <p>Box más vendido este mes</p>
          <ResponsiveContainer width='100%' height={400}>
            <PieChart>
              <Pie
                data={mostSoldBoxes}
                dataKey='value'
                cx='50%'
                cy='50%'
                outerRadius={80}
                label
              >
                {mostSoldBoxes.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    style={{ FontFace: 'none' }}
                  />
                ))}
              </Pie>
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='operations-content__graphics'>
        {operations
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 10)
          .map((operation, index) => (
            <OperationCard key={index} operation={operation} />
          ))}
      </div>
    </div>
  )
}

const CustomLegend = (props) => {
  const { payload } = props
  return (
    <div className='operations-component__leyends'>
      {payload
        ?.map((entry, index) => (
          <div key={`${index}`}>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: entry.payload.fill,
                marginRight: '5px'
              }}
            ></span>
            <p>
              {entry?.value}:"{entry?.payload?.payload?.payload?.value}"
            </p>
          </div>
        ))
        .reverse()}
    </div>
  )
}

export default Operations
