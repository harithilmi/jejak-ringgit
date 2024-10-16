import { useState, useEffect } from 'react'
import { Auth } from './components/Auth'
import { supabase } from './supabase'
import { NewTransactionForm } from './components/NewTransactionForm'
import { TransactionList } from './components/TransactionList'
import { TransactionProvider } from './context/TransactionContext'
import Navbar from './components/Navbar'
import { useTransaction } from './context/TransactionContext'
import CurrencyFormat from './components/CurrencyFormat'
import { TransactionContextProvider } from './components/TransactionContextProvider'

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
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleLogout = () => {
    setSession(null)
  }

  return (
    <>
      <Navbar user={session?.user} onLogout={handleLogout} />
      <div className="container mx-auto p-4">
        {!session ? (
          <Auth />
        ) : (
          <TransactionProvider>
            <TransactionContextProvider>
              <h1 className="text-3xl font-bold mb-4">Transaction Tracker</h1>
              <NewTransactionForm />
              <TotalAmount />
              <TransactionList />
            </TransactionContextProvider>
          </TransactionProvider>
        )}
      </div>
    </>
  )
}
