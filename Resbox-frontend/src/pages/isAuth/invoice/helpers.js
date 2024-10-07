import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import logo from '/images/logo.png'
import { formatCash } from '../operations/herlpers'

export const downloadPDF = (refInvoidPDF, invoice, user) => {
  const doc = new jsPDF('p', 'pt', 'a4')

  // Ancho de la página
  const pageWidth = doc.internal.pageSize.getWidth()

  // Logo en el centro con opacidad 0.4
  const img = new Image()
  img.src = logo

  // Cargar el logo
  img.onload = () => {
    doc.addImage(img, 'PNG', pageWidth / 2 - 50, 40, 100, 100, '', 'NONE', 0.4)

    doc.setFontSize(14)
    doc.setTextColor(40)
    doc.text('RES-BOX', 40, 160)
    doc.setFontSize(10)
    doc.text('NIF: X-123456789Y', 40, 180)
    doc.text('DIRECCIÓN: PASAJE LOS LUCERS 5, 3-A.', 40, 195)
    doc.text('CIUDAD - CODIGO POSTAL: ALICANTE, 03003.', 40, 210)
    doc.text('TLF: 91 111 11 11', 40, 225)

    doc.setFontSize(12)
    doc.text('FACTURA', 40, 255)
    doc.setFontSize(10)
    doc.text(`FECHA: ${invoice.createdAt}`, 40, 270)
    doc.text(`Nº FACTURA: ${invoice.invoice_number}`, 40, 285)

    doc.setFontSize(12)
    doc.text('FACTURA A:', 40, 320)
    doc.setFontSize(10)
    doc.text(`${user.name} ${user.lastname}`, 40, 335)
    doc.text(user.email, 40, 350)

    const tableData = invoice.box.map((box) => [
      box.box.name_box,
      box.quantity,
      formatCash(box.box.price),
      formatCash(box.box.price * box.quantity)
    ])

    autoTable(doc, {
      head: [['DESCRIPCIÓN', 'CANTIDAD', 'P/U', 'SUB-TOTAL']],
      body: tableData,
      startY: 380,
      theme: 'striped',
      headStyles: { fillColor: [210, 180, 140] },
      styles: { overflow: 'linebreak', cellWidth: 'wrap' },
      columnStyles: {
        0: { cellWidth: 150 },
        1: { cellWidth: 80 },
        2: { cellWidth: 80 },
        3: { cellWidth: 100 }
      }
    })

    const finalY = doc.lastAutoTable.finalY + 20
    doc.setFontSize(12)
    doc.text(`Total: ${formatCash(invoice.amount)}`, 40, finalY)

    doc.text('Estado de la compra:', 40, finalY + 30)
    doc.setFontSize(10)
    doc.text(invoice.status.toUpperCase(), 40, finalY + 45)
    doc.text('Muchas gracias por confiar en RES-BOX', 40, finalY + 80)

    doc.save(`FACTURA_${invoice.invoice_number}.pdf`)
  }
}
