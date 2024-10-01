import { NewTransactionForm } from './components/NewTransactionForm'
import { TransactionList } from './components/TransactionList'
import { TransactionProvider } from './components/TransactionContextProvider'
import Navbar from './components/Navbar'
import Overview from './components/Overview'
import axios from 'axios'
import { useEffect } from 'react'
import { useTransaction } from './context/TransactionContext'

export default function App() {
  const { updateTransactions } = useTransaction()

  const fetchAPI = async () => {
    try {
      const response = await axios.get('/.netlify/functions/api/transactions')
      console.log(response.data)
      updateTransactions(response.data)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4">
        <TransactionProvider>
          <Overview />
          <h1 className="text-3xl font-bold mb-4">Transaction Tracker</h1>
          <NewTransactionForm />
          <TransactionList />
        </TransactionProvider>
      </div>
    </>
  )
}
