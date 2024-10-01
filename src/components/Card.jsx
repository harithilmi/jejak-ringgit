import PropTypes from 'prop-types'

import CurrencyFormat from './CurrencyFormat'

export default function Card(props) {
  return (
    <div className="w-full rounded-lg shadow p-6 border-2 border-gray-200 bg-white block mb-5">
      <h2 className="text-2xl font-bold">
        {props.title}
      </h2>
      <h3 className="text-lg">
        RM <CurrencyFormat value={props.total} displayType={'text'} />
      </h3>
    </div>
  )
}

Card.propTypes = {
	title: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired
}
