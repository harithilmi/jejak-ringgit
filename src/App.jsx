import { NewTransactionForm } from './components/NewTransactionForm'
import { TransactionList } from './components/TransactionList'
import { TransactionProvider } from './components/TransactionContextProvider'
import Navbar from './components/Navbar'
import { useTransaction } from './context/TransactionContext'
import CurrencyFormat from './components/CurrencyFormat'

function TotalAmount() {
  const { transactions } = useTransaction()
  
  const total = transactions
    .filter(t => t.includeInTotal)
    .reduce((acc, t) => {
      return t.type === 'income' ? acc + t.amount : acc - t.amount
    }, 0)

  return (
    <div className="text-xl font-bold mt-4">
      Total: <CurrencyFormat value={total} displayType={'text'} prefix={'RM'} />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <TransactionProvider>
          <h1 className="text-3xl font-bold mb-4">Transaction Tracker</h1>
          <NewTransactionForm />
          <TotalAmount />
          <TransactionList />
        </TransactionProvider>
      </div>
    </>
  )
}