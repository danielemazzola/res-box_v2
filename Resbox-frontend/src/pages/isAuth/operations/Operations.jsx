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
import { formatCash, arrayInformationSales, sumByDate } from './herlpers'
import './Operations.css'
import logo from '/images/logo.png'
import { chartData, chartOptions } from './configCharts'

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
    }, 500)
    handleOperations(false)
  }, [])

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
    const sales = formatCash(
      sumByDate(operationsPending, (op) => op.status === 'completed')
    )
    return sales
  }, [operations])

  const pendingSales = useMemo(() => {
    const operationsPending = operations.filter(
      (op) => op.paid.paid === 'pending'
    )
    const sales = formatCash(
      sumByDate(operationsPending, (op) => op.status === 'completed')
    )
    return sales
  }, [operations])

  const salesToday = useMemo(() => {
    const sales = formatCash(
      sumByDate(
        operations,
        (op) =>
          op.status === 'completed' &&
          op.paid.paid !== 'cancelled' &&
          isSameDay(new Date(op.updatedAt), today)
      )
    )
    return sales
  }, [operations])
  const salesYesterday = useMemo(() => {
    const sales = formatCash(
      sumByDate(
        operations,
        (op) =>
          op.status === 'completed' &&
          op.paid.paid !== 'cancelled' &&
          isSameDay(new Date(op.updatedAt), yesterday)
      )
    )
    return sales
  }, [operations])

  const salesThisWeek = useMemo(() => {
    const sales = formatCash(
      sumByDate(
        operations,
        (op) =>
          op.status === 'completed' &&
          op.paid.paid !== 'cancelled' &&
          isThisWeek(new Date(op.updatedAt), { weekStartsOn: 1 })
      )
    )
    return sales
  }, [operations])

  const salesThisMonth = useMemo(() => {
    const startOfCurrentMonth = startOfMonth(today)
    const sales = formatCash(
      sumByDate(
        operations,
        (op) =>
          op.status === 'completed' &&
          op.paid.paid !== 'cancelled' &&
          new Date(op.updatedAt) >= startOfCurrentMonth
      )
    )
    return sales
  }, [operations])

  const dailySalesThisWeek = useMemo(() => {
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 })
    const daysInWeek = 7

    const dailySales = Array.from({ length: daysInWeek }).map((_, i) => {
      const currentDay = addDays(startOfCurrentWeek, i)
      const sales = sumByDate(
        operations,
        (op) =>
          op.status === 'completed' &&
          op.paid.paid !== 'cancelled' &&
          isSameDay(new Date(op.updatedAt), currentDay)
      )
      return {
        date: currentDay,
        sales
      }
    })

    return dailySales
  }, [operations])

  const dailySalesCancelledThisWeek = useMemo(() => {
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 })
    const daysInWeek = 7

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

  const char_data = chartData(dailySalesThisWeek, dailySalesCancelledThisWeek)

  const arr_info_sales = arrayInformationSales(
    paidOperations,
    pendingSales,
    today,
    salesToday,
    yesterday,
    salesYesterday,
    startWeek,
    endWeek,
    salesThisWeek,
    startMonth,
    endMonth,
    salesThisMonth
  )

  return (
    <div
      className='operations-component__container fadeIn'
      ref={sectionRefOperations}
    >
      <div className='operations-component__title'>
        <h2>Mis operaciones</h2>
      </div>
      <div className='operations-component__chart show'>
        <div>
          <Bar data={char_data} options={chartOptions} />
        </div>
      </div>
      <div className='operations-component__sales'>
        {arr_info_sales?.map((arr, index) => (
          <div className='show' key={index}>
            <div className='operations-component__sales-title'>
              <p>{arr.title}</p>
              {arr.date && <span>{arr.date}</span>}
            </div>
            <div
              className='operations-component__sales-amount'
              style={{ backgroundColor: arr.bg_color }}
            >
              <p>{arr.value}</p>
            </div>
            <img
              src={logo}
              alt='logo res-box'
              width='50'
              className='operations-component__sales-img waveEffect'
              loading='lazy'
            />
          </div>
        ))}
      </div>
      <div className='operations-component__list-operations'>
        <h3 className='show'>Últimas 20 operaciones</h3>
        <p className='show'>
          ¿Necesitas comprobar las últimas operaciones? ¡Adelante!
        </p>
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
