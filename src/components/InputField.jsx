import { Field, Input, Label } from '@headlessui/react'
import PropTypes from 'prop-types'

export function InputField({ label, id, type = 'text', value, onChange, placeholder, className = '' }) {
  return (
    <Field className={className}>
      <Label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </Label>
      <div className="mt-2">
        <Input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
          placeholder={placeholder}
        />
      </div>
    </Field>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
}
