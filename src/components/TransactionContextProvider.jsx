import PropTypes from 'prop-types'
import { useReducer, useEffect } from "react"
import { TransactionContext } from '../context/TransactionContext'
import { transactionReducer, initialState } from '../context/transactionReducer'

export function TransactionProvider({ children }) {
  const [transactions, dispatch] = useReducer(transactionReducer, initialState, () => {
    const localValue = localStorage.getItem('TRANSACTIONS')
    return localValue ? JSON.parse(localValue) : []
  })

  useEffect(() => {
    localStorage.setItem('TRANSACTIONS', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (description, amount, date, type) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: { description, amount, date, type } })
  }

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  }
	
  const editTransaction = (id, updatedTransaction) => {
	dispatch({ type: 'EDIT_TRANSACTION', payload: { id, updatedTransaction } })
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, editTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

TransactionProvider.propTypes = {
  children: PropTypes.node.isRequired
}