import { getDate } from '../../../helpers/date'

export const formatCash = (amount) => {
  const formatEuro = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
  return formatEuro
}

export const arrayInformationSales = (
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
) => {
  const arr = [
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
  return arr
}

export const sumByDate = (operations, filterFn) =>
  operations.filter(filterFn).reduce((acc, curr) => acc + curr.amount, 0)