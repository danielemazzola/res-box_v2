import { useContext, useEffect, useMemo } from 'react'
import {
  subDays,
  isSameDay,
  isThisWeek,
  startOfWeek,
  endOfWeek,
  addDays,
  startOfMonth,
  endOfMonth
} from 'date-fns'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import useScrollToRef from '../../../hooks/useScrollToRef'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import { AuthContext } from '../../../context/auth/AuthContext'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import OperationCard from '../../../components/operation-card/OperationCard'
import { getDate } from '../../../helpers/date'
import './Operations.css'
import logo from '/images/logo.png'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Operations = () => {
  const {
    statePartners: { operations }
  } = useContext(ReducersContext)
  const { sectionRefOperations } = useContext(ScrollRefContext)
  const useScroll = useScrollToRef()

  const { handleOperations } = useContext(AuthContext)

  useEffect(() => {
    setTimeout(() => {
      useScroll(sectionRefOperations)
    }, 1000)
    handleOperations(false)
  }, [])

  const sumByDate = (operations, filterFn) =>
    operations.filter(filterFn).reduce((acc, curr) => acc + curr.amount, 0)

  const today = new Date()
  const yesterday = subDays(today, 1)
  const startWeek = startOfWeek(today, { weekStartsOn: 1 })
  const endWeek = endOfWeek(today, { weekStartsOn: 1 })
  const startMonth = startOfMonth(today)
  const endMonth = endOfMonth(today)

  const paidOperations = useMemo(() => {
    const operationsPending = operations.filter(
      (op) => op.paid.paid === 'completed'
    )
    return sumByDate(operationsPending, (op) => op.status === 'completed')
  }, [operations])

  const pendingSales = useMemo(() => {
    const operationsPending = operations.filter(
      (op) => op.paid.paid === 'pending'
    )
    return sumByDate(operationsPending, (op) => op.status === 'completed')
  }, [operations])

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
      sumByDate(
        operations,
        (op) =>
          op.status === 'completed' &&
          isSameDay(new Date(op.updatedAt), yesterday)
      ),
    [operations]
  )

  const salesThisWeek = useMemo(
    () =>
      sumByDate(
        operations,
        (op) => op.status === 'completed' && isThisWeek(new Date(op.updatedAt))
      ),
    [operations]
  )
  const salesThisMonth = useMemo(() => {
    const startOfCurrentMonth = startOfMonth(today)
    return sumByDate(
      operations,
      (op) =>
        op.status === 'completed' &&
        new Date(op.updatedAt) >= startOfCurrentMonth
    )
  }, [operations])

  // Obtener las ventas diarias de la semana actual
  const dailySalesThisWeek = useMemo(() => {
    // Obtener el inicio de la semana (lunes)
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }) // Lunes
    const daysInWeek = 7

    // Recorrer cada día de la semana (del lunes al domingo)
    const dailySales = Array.from({ length: daysInWeek }).map((_, i) => {
      const currentDay = addDays(startOfCurrentWeek, i)
      const sales = sumByDate(
        operations,
        (op) =>
          op.status === 'completed' &&
          isSameDay(new Date(op.updatedAt), currentDay)
      )
      return {
        date: currentDay,
        sales
      }
    })

    return dailySales
  }, [operations])

  // Obtener las ventas diarias de la semana actual
  const dailySalesCancelledThisWeek = useMemo(() => {
    // Obtener el inicio de la semana (lunes)
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }) // Lunes
    const daysInWeek = 7

    // Recorrer cada día de la semana (del lunes al domingo)
    const dailySales = Array.from({ length: daysInWeek }).map((_, i) => {
      const currentDay = addDays(startOfCurrentWeek, i)
      const sales = sumByDate(
        operations,
        (op) =>
          op.status === 'cancelled' &&
          isSameDay(new Date(op.updatedAt), currentDay)
      )
      return {
        date: currentDay,
        sales
      }
    })

    return dailySales
  }, [operations])

  const chartData = {
    labels: dailySalesThisWeek.map((day) => day.date.toLocaleDateString()),
    datasets: [
      {
        label: 'Venta del día',
        data: dailySalesThisWeek.map((day) => day.sales),
        backgroundColor: 'rgb(119, 223, 119)',
        borderColor: '#d2b48c',
        borderWidth: 1,
        borderRadius: 5,
        borderSkipped: false
      },
      {
        label: 'Venta canceladas del día',
        data: dailySalesCancelledThisWeek.map((day) => day.sales * -1),
        backgroundColor: '#ff5e5e',
        borderColor: '#ff5e5e',
        borderWidth: 1,
        borderRadius: 5,
        borderSkipped: false
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Mis ventas de la semana',
        color: '#ececec',
        font: {
          size: 24
        }
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let value = tooltipItem.raw
            if (value < 0) {
              return `Cancelaciones: €-${Math.abs(value)}`
            }
            return `Ventas: €${value}`
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value < 0 ? `€${value}` : `€${value}`
          }
        }
      }
    }
  }

  const arrayInformationSales = [
    {
      title: 'Abonado',
      value: paidOperations,
      bg_color: 'var(--rb-bg-green)'
    },
    {
      title: 'Acumulado',
      value: pendingSales,
      bg_color: 'var(--rb-bg-register)'
    },
    {
      title: 'Hoy',
      date: getDate(today),
      value: salesToday,
      bg_color: 'var(--rb-bg-options)'
    },
    {
      title: 'Ayer',
      date: getDate(yesterday),
      value: salesYesterday,
      bg_color: 'var(--rb-bg-secondary)'
    },
    {
      title: 'Semana en curso',
      date: `${getDate(startWeek)} - ${getDate(endWeek)}`,
      value: salesThisWeek,
      bg_color: 'var(--rb-bg-options)'
    },
    {
      title: 'Mes en curso',
      date: `${getDate(startMonth)} - ${getDate(endMonth)}`,
      value: salesThisMonth,
      bg_color: 'var(--rb-bg-options)'
    }
  ]

  return (
    <div className='operations-component__container' ref={sectionRefOperations}>
      <div className='operations-component__title'>
        <h2>Mis operaciones</h2>
      </div>
      <div className='operations-component__chart show'>
        <div>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
      <div className='operations-component__sales'>
        {arrayInformationSales?.map((arr, index) => (
          <div className='show' key={index}>
            <div className='operations-component__sales-title'>
              <p>{arr.title}</p>
              {arr.date && <span>{arr.date}</span>}
            </div>
            <div
              className='operations-component__sales-amount'
              style={{ backgroundColor: arr.bg_color }}
            >
              <p>{arr.value} EUR</p>
            </div>
            <img
              src={logo}
              alt='logo res-box'
              width='50'
              className='operations-component__sales-img waveEffect'
            />
          </div>
        ))}
      </div>
      <div className='operations-component__list-operations'>
      <h3 className='show'>Últimas 20 operaciones</h3> 
      <p className='show'>¿Necesitas comprobar las últimas operaciones? ¡Adelante!</p>
        {operations
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 20)
          .map((operation, index) => (
            <OperationCard key={index} operation={operation} />
          ))}
      </div>
    </div>
  )
}

export default Operations
