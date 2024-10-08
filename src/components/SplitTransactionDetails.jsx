import { useState } from 'react'
import PropTypes from 'prop-types'
import CurrencyFormat from './CurrencyFormat'

export function SplitTransactionDetails({ transaction }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-500 hover:text-blue-700"
      >
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>
      {isExpanded && (
        <div className="mt-2">
          {transaction.splitDetails.map((detail, index) => (
            <div key={index} className="flex justify-between items-center mb-1">
              <span>{detail.name}</span>
              <div>
                <CurrencyFormat
                  value={detail.amount}
                  displayType={'text'}
                  prefix={'RM'}
                />
                <span className={`ml-2 ${detail.paid ? 'text-green-500' : 'text-red-500'}`}>
                  {detail.paid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

SplitTransactionDetails.propTypes = {
  transaction: PropTypes.shape({
    splitDetails: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        paid: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
}
