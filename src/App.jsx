import { NewTransactionForm } from './components/NewTransactionForm'
import { TransactionList } from './components/TransactionList'
import { TransactionProvider } from './components/TransactionContextProvider'
import Navbar from './components/Navbar'
import Overview from './components/Overview'

export default function App() {
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
