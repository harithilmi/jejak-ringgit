import { useTransaction } from '../context/TransactionContext'
import CurrencyFormat from './CurrencyFormat'
import { useState } from 'react'
import { EditTransactionModal } from './EditTransactionModal'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export function TransactionList() {
  const { transactions, deleteTransaction } = useTransaction()
  const [filterText, setFilterText] = useState('')
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const filteredTransactions = transactions
    .filter(transaction => 
      transaction.description.toLowerCase().includes(filterText.toLowerCase())
    )

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction)
  }

  const handleEditClose = () => {
    setEditingTransaction(null)
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-end">
        {isFilterVisible && (
          <input
            type="text"
            placeholder="Search transactions"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="px-2 py-1 border rounded w-64 mr-2"
          />
        )}
        <button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className="rounded-md bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex-shrink-0"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">No Transactions</td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="px-4 py-2 truncate">{transaction.description}</td>
                  <td className="px-4 py-2">
                    <div className={`flex justify-end items-baseline ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      <span className="mr-1">{transaction.type === 'income' ? '▴' : '▾'}</span>
                      <span className="mr-1 w-6 text-right">RM</span>
                      <CurrencyFormat
                        value={transaction.amount}
                        displayType={'text'}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEditClick(transaction)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={handleEditClose}
        />
      )}
    </div>
  )
}
