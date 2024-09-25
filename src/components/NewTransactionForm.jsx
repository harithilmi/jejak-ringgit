import { useState, useEffect, useRef } from 'react'
import { useTransaction } from '../context/TransactionContext'

export function NewTransactionForm() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [type, setType] = useState('expense')
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const dropdownRef = useRef(null)
  const optionsRef = useRef([])
  const { addTransaction } = useTransaction()
  const descriptionInputRef = useRef(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setDate(today)
  }, [])

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

  function handleSubmit(e) {
    e.preventDefault()
    if (description === '' || amount === '') return
    addTransaction(description, parseFloat(amount) / 100, date, type)
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
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                ref={descriptionInputRef}
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                placeholder="Expense description"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
            Amount
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">RM</span>
              <input
                type="text"
                id="amount"
                value={formatAmount(amount)}
                onChange={handleAmountChange}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none text-right pr-2"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">
            Type
          </label>
          <div className="relative mt-2" ref={dropdownRef}>
            <button
              type="button"
              className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                </svg>
              </span>
            </button>

            {isTypeDropdownOpen && (
              <ul 
                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" 
                tabIndex="-1" 
                role="listbox" 
                aria-labelledby="listbox-label"
                aria-activedescendant={`listbox-option-${highlightedIndex}`}
              >
                {typeOptions.map((option, index) => (
                  <li
                    key={option.value}
                    ref={el => optionsRef.current[index] = el}
                    className={`relative cursor-default select-none py-2 pl-3 pr-9 ${
                      index === highlightedIndex ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:bg-indigo-100'
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
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
            Date
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
              />
            </div>
          </div>
        </div>
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
