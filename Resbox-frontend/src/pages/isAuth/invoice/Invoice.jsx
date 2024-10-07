import { useContext, useEffect } from 'react'
import useScrollToRef from '../../../hooks/useScrollToRef'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import { Link, useNavigate } from 'react-router-dom'
import { formatCash } from '../operations/herlpers'
import { getDate } from '../../../helpers/date'
import { downloadPDF } from './helpers'
import './Invoice.css'
import logo from '/images/logo.png'

const Invoice = () => {
  const navigate = useNavigate()
  const {
    stateInvoices: { invoice },
    stateIsAuth: { user }
  } = useContext(ReducersContext)
  const { refInvoidSection, refInvoidPDF } = useContext(ScrollRefContext)
  const scrollToRef = useScrollToRef()

  useEffect(() => {
    setTimeout(() => {
      scrollToRef(refInvoidSection)
    }, 500)
  }, [])

  useEffect(() => {
    if (Object.keys(invoice).length <= 0) {
      navigate('../my-boxes')
    }
  }, [])

  return (
    <section ref={refInvoidSection} className='invoice__content fadeIn'>
      <div ref={refInvoidPDF} className='invoice-container'>
        <div className='invoice-header'>
          <img src={logo} alt='logo res-box' width='50' />
          <p className='invoice-title'>RES-BOX</p>
          <p>NIF: X-123456789Y</p>
          <p>DIRECCIÓN: PASAJE LOS LUCERS 5, 3-A.</p>
          <p>CIUDAD - CODIGO POSTAL: ALICANTE, 03003.</p>
          <p>TLF: 91 111 11 11</p>
        </div>

        <div className='invoice-info'>
          <h3>FACTURA</h3>
          <p>FECHA: {getDate(invoice.createdAt)}</p>
          <p>Nº Factura: {invoice.invoice_number}</p>
        </div>

        <div className='invoice-client'>
          <h4>FACTURA A:</h4>
          <p>
            {user.name} {user.lastname}
          </p>
          <p>{user.email}</p>
        </div>

        <div className='invoice-table-container'>
          <table className='invoice-table'>
            <thead>
              <tr>
                <th>DESCRIPCIÓN</th>
                <th>CANTIDAD</th>
                <th>P/U</th>
                <th>SUB-TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.box?.map((box, index) => (
                <tr key={index}>
                  <td>{box.box.name_box}</td>
                  <td>{box.quantity}</td>
                  <td>{formatCash(box.box.price)}</td>
                  <td>{formatCash(box.box.price * box.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='invoice-total'>
          <p>
            <strong>Total:</strong> {formatCash(invoice.amount)}
          </p>
        </div>
        <div className='invoice-status'>
          <p>
            <strong>Estado de la compra:</strong>
          </p>
          <p>{invoice.status}</p>
        </div>
      </div>
      <div className='invoice__btn-my-boxes'>
        <Link to={`../my-boxes`}>
          <button className='button yellow'>MIS BOXES</button>
        </Link>
        <button
          className='button'
          style={{ backgroundColor: 'var(--rb-bg-options)!important' }}
          onClick={() => downloadPDF(refInvoidPDF, invoice, user)}
        >
          Descargar Factura
        </button>
      </div>
    </section>
  )
}

export default Invoice
