import { useContext, useEffect, useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import {
  subDays,
  isSameDay,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
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
      sumByDate(
        operations,
        (op) =>
          op.status === 'completed' && isSameDay(new Date(op.updatedAt), today)
      ),
    [operations]
  )

  const salesYesterday = useMemo(
    () =>
      sumByDate(operations, (op) =>
        isSameDay(new Date(op.updatedAt), yesterday)
      ),
    [operations]
  )

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

  const sales = [
    {
      name: 'Ayer',
      value: salesYesterday,
      date: yesterday
    },
    {
      name: 'hoy',
      value: salesToday,
      date: today
    }
  ]

  return (
    <div className='operations-component__container'>
      <div className='operations-component__title'>
        <h2>Mis operaciones</h2>
      </div>
      <div className='operations-content__graphics'>
        <div className='operations-component__graphics'>
          <p>Ventas de hoy vs ayer "€"</p>
          <div className='operations-content__sales'>
            <p>Ayer: {salesYesterday}€</p> |<p>Hoy: {salesToday}€</p>
          </div>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              width={500}
              height={400}
              data={sales}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type='monotone'
                dataKey='value'
                stackId='1'
                stroke='#8884d8'
                fill='var(--rb-bg-options'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='operations-content__status-operation'>
        <div className='operations-content__status-title'>
          <h4>Estado de las operaciones del mes</h4>
        </div>
        <div className='operations-content__status-operations'>
          <div>
            <p> Confirmadas</p>
            <p>{operationsStatus.confirmed}</p>
          </div>
          <div>
            <p> Canceladas</p>
            <p>{operationsStatus.cancelled}</p>
          </div>
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

export default Operations

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { value, date } = payload[0].payload // Extraer el valor y la fecha
    const formattedDate = new Date(date).toLocaleDateString() // Formatear la fecha si es necesario

    return (
      <div className='custom-tooltip'>
        <p>{`Fecha: ${formattedDate}`}</p>
        <p>{`Total: €${value}`}</p>
      </div>
    )
  }
  return null
}
