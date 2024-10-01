import Card from './Card'
import { useTransaction } from '../context/TransactionContext'


export default function Overview() {
	const { transactions } = useTransaction()

	const total_expense = transactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0)
	const total_income = transactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0)

	return (
		<div className="grid grid-rows-1 sm:grid-cols-2 sm:gap-4">
			<Card title="Expenses" total={total_expense} />
			<Card title="Income" total={total_income} />	
			
		</div>
	)
}