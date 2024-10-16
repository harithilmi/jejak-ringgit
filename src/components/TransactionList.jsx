import { useTransaction } from '../context/TransactionContext'
import CurrencyFormat from './CurrencyFormat'
import { useState } from 'react'
import { EditTransactionModal } from './EditTransactionModal'

export function TransactionList() {
  const { transactions, deleteTransaction } = useTransaction()
  const [filterText, setFilterText] = useState('')
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const filteredTransactions = transactions
    .filter(transaction => 
      transaction.description.toLowerCase().includes(filterText.toLowerCase())
    )

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction)
    setIsEditModalOpen(true)
  }

  const handleEditClose = () => {
    setIsEditModalOpen(false)
    setEditingTransaction(null)
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center">
        <button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className="rounded-md align-middle bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span className="mr-2">&#9776;</span>
          Filter
        </button>
        {isFilterVisible && (
          <input
            type="text"
            placeholder="Filter expenses..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="ml-2 px-2 py-1 border rounded"
          />
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No Transactions</td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="px-4 py-2 truncate">{transaction.description}</td>
                  <td className="px-4 py-2">
                    <div className={`flex justify-end items-baseline ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      <span className="mr-1 w-6 text-right">RM</span>
                      <CurrencyFormat
                        value={transaction.amount}
                        displayType={'text'}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-center">{transaction.type}</td>
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
      {isEditModalOpen && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={handleEditClose}
        />
      )}
    </div>
  )
}
