import PropTypes from 'prop-types'
import { useExpense } from '../context/TransactionContext'
import CurrencyFormat from './CurrencyFormat'

export default function ExpenseItem({ id, description, amount, date }) {
  const { deleteExpense } = useExpense()

  return (
    <li>
      <span>{description}</span>
      <CurrencyFormat
        value={amount}
        displayType={'text'}
        prefix={'RM'}
      />
      <span>{new Date(date).toLocaleDateString()}</span>
      <button className="btn btn-danger" onClick={() => deleteExpense(id)}>
        Delete
      </button>
    </li>
  )
}

ExpenseItem.propTypes = {
	id: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired
}
