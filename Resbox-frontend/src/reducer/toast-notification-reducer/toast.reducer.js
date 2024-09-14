export const initStateToast = { notifications: [] }

export const stateToast = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { error: action.payload.error, msg: action.payload.msg }
        ]
      }

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (_, index) => index !== action.payload
        )
      }

    default:
      return state
  }
}
