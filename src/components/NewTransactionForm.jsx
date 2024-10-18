import { useState, useEffect, useRef } from 'react'
import { useTransaction } from '../context/TransactionContext'
import { InputField } from './InputField'
import { CurrencyInputField } from './CurrencyInputField'
import { TransactionTypeInput } from './TransactionTypeInput'

export function NewTransactionForm() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [type, setType] = useState('expense')

  const { addTransaction } = useTransaction()
  const descriptionInputRef = useRef(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setDate(today)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (description === '' || amount === '') return
    addTransaction(description, parseFloat(amount) / 100, date, type)
    // Reset form fields
    setDescription('')
    setAmount('')
    setType('expense')
    const currentDate = new Date().toISOString().split('T')[0]
    setDate(currentDate)
    
    if (descriptionInputRef.current) {
      descriptionInputRef.current.focus()
    }
  }

  function handleAmountChange(e) {
    const value = e.target.value.replace(/[^\d]/g, '')
    if (value.length <= 10) { // Limit to 99999.99
      setAmount(value)
    }
  }

  function formatAmount(value) {
    if (value === '') return ''
    const numericValue = parseInt(value, 10)
    return new Intl.NumberFormat('en-MY', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue / 100)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <InputField
          label="Description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Expense description"
          className="sm:col-span-2"
        />

        <CurrencyInputField
          label="Amount"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          formatAmount={formatAmount}
          className="sm:col-span-2"
        />

        <TransactionTypeInput
          value={type}
          onChange={setType}
          className="sm:col-span-2"
        />

        <InputField
          label="Date"
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="sm:col-span-2"
        />
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full lg:w-1/2"
        >
          Add Transaction
        </button>
      </div>
    </form>
  )
}
