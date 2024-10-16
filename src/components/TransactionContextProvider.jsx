import PropTypes from 'prop-types'

import { useReducer, useEffect } from "react"
import { TransactionContext, initialState, transactionReducer } from '../context/TransactionContext'
import { supabase } from '../supabase'

export function TransactionContextProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, initialState)

  async function fetchTransactions() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching transactions:', error)
    } else {
      dispatch({ type: 'SET_TRANSACTIONS', payload: data })
    }
  }

  const addTransaction = async (description, amount, date, type) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('Error getting user:', userError)
      return
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert([{ 
        description, 
        amount, 
        date, 
        type, 
        user_id: user.id
      }])
      .select()
    
    if (error) {
      console.error('Error adding transaction:', error)
    } else if (data && data.length > 0) {
      dispatch({ 
        type: 'ADD_TRANSACTION', 
        payload: data[0]
      })
      fetchTransactions()
    }
  }

  const deleteTransaction = async (id) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .match({ id })
    
    if (error) {
      console.error('Error deleting transaction:', error)
    } else {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id })
    }
  }

  const editTransaction = async (id, updatedTransaction) => {
    const dbUpdatedTransaction = {
      description: updatedTransaction.description,
      amount: updatedTransaction.amount,
      date: updatedTransaction.date,
      type: updatedTransaction.type,
    }

    const { error } = await supabase
      .from('transactions')
      .update(dbUpdatedTransaction)
      .match({ id })
    
    if (error) {
      console.error('Error updating transaction:', error)
    } else {
      dispatch({ type: 'EDIT_TRANSACTION', payload: { id, updatedTransaction } })
    }
  }

  const contextValue = {
    transactions: state,
    addTransaction,
    deleteTransaction,
    editTransaction,
    fetchTransactions
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  )
}

TransactionContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
