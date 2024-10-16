import { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const TransactionContext = createContext()

export const initialState = []

export function transactionReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [
        ...state,
        action.payload
      ]
    case 'DELETE_TRANSACTION':
      return state.filter((transaction) => transaction.id !== action.payload)
    case 'EDIT_TRANSACTION':
      return state.map((transaction) =>
        transaction.id === action.payload.id
          ? { ...transaction, ...action.payload.updatedTransaction }
          : transaction,
      )
    case 'SET_TRANSACTIONS':
      return action.payload
    default:
      return state
  }
}

export function TransactionProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, initialState)

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransaction() {
  const context = useContext(TransactionContext)
  if (context === undefined) {
    throw new Error('useTransaction must be used within a TransactionProvider')
  }
  return context
}

TransactionProvider.propTypes = {
	children: PropTypes.node
}
