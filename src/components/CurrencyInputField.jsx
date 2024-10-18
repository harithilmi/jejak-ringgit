import { Field, Input, Label } from '@headlessui/react'
import PropTypes from 'prop-types'

export function CurrencyInputField({ label, id, value, onChange, formatAmount, className = '' }) {
  return (
    <Field className={className}>
      <Label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </Label>
      <div className="mt-2">
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">RM</span>
          </div>
          <Input
            type="text"
            id={id}
            value={formatAmount(value)}
            onChange={onChange}
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
        </div>
      </div>
    </Field>
  )
}

CurrencyInputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  formatAmount: PropTypes.func.isRequired,
  className: PropTypes.string,
}

