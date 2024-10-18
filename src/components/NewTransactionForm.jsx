import { useState, useEffect, useRef } from 'react'
import { useTransaction } from '../context/TransactionContext'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition, Label } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

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

  const typeOptions = [
    { value: 'expense', label: 'Expense', icon: '💸' },
    { value: 'income', label: 'Income', icon: '💰' },
  ]

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
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
            <input
              ref={descriptionInputRef}
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Expense description"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
            Amount
          </label>
          <div className="mt-2">
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">RM</span>
              </div>
              <input
                type="text"
                id="amount"
                value={formatAmount(amount)}
                onChange={handleAmountChange}
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <Listbox value={type} onChange={setType}>
            {({ open }) => (
              <>
                <Label className="block text-sm font-medium leading-6 text-gray-900">Type</Label>
                <div className="relative mt-2">
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {typeOptions.find(option => option.value === type)?.icon} {' '}
                        {typeOptions.find(option => option.value === type)?.label}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </ListboxButton>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {typeOptions.map((option) => (
                        <ListboxOption
                          key={option.value}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-3 pr-9 ${
                              active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                            }`
                          }
                          value={option.value}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span className={`ml-3 block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                  {option.icon} {option.label}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                    active ? 'text-white' : 'text-indigo-600'
                                  }`}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
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
