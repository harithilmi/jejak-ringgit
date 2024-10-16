import { useState, useEffect, useRef } from 'react'
import { useTransaction } from '../context/TransactionContext'
import PropTypes from 'prop-types'

export function EditTransactionModal({ transaction, onClose }) {
  const [description, setDescription] = useState(transaction.description)
  const [amount, setAmount] = useState(transaction.amount * 100)
  const [date, setDate] = useState(transaction.date)
  const [type, setType] = useState(transaction.type)
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const dropdownRef = useRef(null)
  const optionsRef = useRef([])

  const { editTransaction } = useTransaction()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
	}
	  
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTypeDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const typeOptions = [
    { value: 'expense', label: 'Expense', icon: '💸' },
    { value: 'income', label: 'Income', icon: '💰' },
  ]

  const handleKeyDown = (e) => {
    if (!isTypeDropdownOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prevIndex) => 
          prevIndex < typeOptions.length - 1 ? prevIndex + 1 : prevIndex
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prevIndex) => 
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        )
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        setType(typeOptions[highlightedIndex].value)
        setIsTypeDropdownOpen(false)
        break
      case 'Escape':
        setIsTypeDropdownOpen(false)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (isTypeDropdownOpen && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex].scrollIntoView({
        block: 'nearest',
      })
    }
  }, [highlightedIndex, isTypeDropdownOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await editTransaction(transaction.id, {
      description,
      amount: amount / 100,
      date,
      type,
    })
    onClose()
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Transaction</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
              <div className="mt-1">
                <input
                  type="text"
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="edit-amount" className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">RM</span>
                </div>
                <input
                  type="text"
                  id="edit-amount"
                  value={formatAmount(amount)}
                  onChange={handleAmountChange}
                  className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label id="listbox-label" className="block text-sm font-medium text-gray-700">Type</label>
              <div className="mt-1 relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  aria-haspopup="listbox"
                  aria-expanded={isTypeDropdownOpen}
                  aria-labelledby="listbox-label"
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  onKeyDown={handleKeyDown}
                >
                  <span className="flex items-center">
                    <span className="ml-3 block truncate">
                      {typeOptions.find(option => option.value === type)?.icon} {' '}
                      {typeOptions.find(option => option.value === type)?.label}
                    </span>
                  </span>
                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>

                {isTypeDropdownOpen && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant={`listbox-option-${highlightedIndex}`}>
                    {typeOptions.map((option, index) => (
                      <li
                        key={option.value}
                        ref={el => optionsRef.current[index] = el}
                        className={`cursor-default select-none relative py-2 pl-3 pr-9 ${
                          index === highlightedIndex ? 'text-white bg-indigo-600' : 'text-gray-900'
                        }`}
                        id={`listbox-option-${index}`}
                        role="option"
                        aria-selected={type === option.value}
                        onClick={() => {
                          setType(option.value)
                          setIsTypeDropdownOpen(false)
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                      >
                        <div className="flex items-center">
                          <span className={`ml-3 block truncate ${type === option.value ? 'font-semibold' : 'font-normal'}`}>
                            {option.icon} {option.label}
                          </span>
                        </div>

                        {type === option.value && (
                          <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${index === highlightedIndex ? 'text-white' : 'text-indigo-600'}`}>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="edit-date" className="block text-sm font-medium text-gray-700">Date</label>
              <div className="mt-1">
                <input
                  type="date"
                  id="edit-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

EditTransactionModal.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}
