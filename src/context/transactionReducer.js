export const initialState = []

export function transactionReducer(state, action) {
	switch (action.type) {
		case 'ADD_TRANSACTION':
			return [
				...state,
				{
					id: Date.now(),
					description: action.payload.description,
					amount: action.payload.amount,
					date: action.payload.date,
					type: action.payload.type,
					isSplit: action.payload.isSplit || false,
					splitDetails: action.payload.splitDetails || [],
					includeInTotal: action.payload.includeInTotal !== false,
				},
			]
		case 'DELETE_TRANSACTION':
			return state.filter((transaction) => transaction.id !== action.payload)
		case 'EDIT_TRANSACTION':
			return state.map((transaction) =>
				transaction.id === action.payload.id
					? { 
						...transaction, 
						...action.payload.updatedTransaction,
						isSplit: action.payload.updatedTransaction.isSplit || false,
						splitDetails: action.payload.updatedTransaction.splitDetails || [],
						includeInTotal: action.payload.updatedTransaction.includeInTotal !== false,
					}
					: transaction,
			)
		case 'SET_TRANSACTIONS':
			return action.payload
		default:
			return state
	}
}
