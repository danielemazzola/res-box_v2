export const initStateInvoice = {
  invoices: [],
  invoice: {}
}

export const stateInvoice = (state, action) => {
  switch (action.type) {
    case 'SET_INVOICES':
      return { ...state, invoices: [...state.invoices, action.payload] }
    case 'SET_INVOICE':
      return { ...state, invoice: action.payload }

    default:
      return state
  }
}
