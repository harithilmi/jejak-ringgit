import { useState } from 'react'
import { useTransaction } from '../context/TransactionContext'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, Transition, TransitionChild, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { InputField } from './InputField'
import { CurrencyInputField } from './CurrencyInputField'
import { TransactionTypeInput } from './TransactionTypeInput'

export function EditTransactionModal({ transaction, onClose }) {
  const [description, setDescription] = useState(transaction.description)
  const [amount, setAmount] = useState((transaction.amount * 100).toString())
  const [date, setDate] = useState(transaction.date)
  const [type, setType] = useState(transaction.type)

  const { editTransaction } = useTransaction()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await editTransaction(transaction.id, {
      description,
      amount: parseFloat(amount) / 100,
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
    <Transition show={true}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild>
          <div className="fixed inset-0 bg-black/30 transition duration-300 data-[closed]:opacity-0" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild>
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition duration-300 data-[closed]:opacity-0 data-[closed]:scale-95 sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Edit Transaction
                    </DialogTitle>
                    <form onSubmit={handleSubmit} className="mt-2">
                      <InputField
                        label="Description"
                        id="edit-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mb-4"
                      />

                      <CurrencyInputField
                        label="Amount"
                        id="edit-amount"
                        value={amount.toString()}
                        onChange={handleAmountChange}
                        formatAmount={formatAmount}
                        className="mb-4"
                      />

                      <InputField
                        label="Date"
                        id="edit-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mb-4"
                      />

                      <TransactionTypeInput
                        value={type}
                        onChange={setType}
                        className="mb-4"
                      />

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

EditTransactionModal.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}
