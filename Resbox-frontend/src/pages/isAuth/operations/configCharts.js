import { formatCash } from './herlpers'

export const chartData = (dailySalesThisWeek, dailySalesCancelledThisWeek) => {
  return {
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
}

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Mis ventas de la semana',
      color: '#ffffff',
      font: {
        size: 24
      }
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          let value = tooltipItem.raw
          if (value < 0) {
            return `Cancelaciones: ${formatCash(Math.abs(value))}`
          }
          return `Ventas: ${formatCash(value)}`
        }
      }
    }
  },
  scales: {
    x: {
      stacked: true,
      ticks: { color: '#ffffff' }
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        color: '#ffffff',
        callback: function (value) {
          return value < 0 ? `€${value}` : `€${value}`
        }
      }
    }
  }
}
