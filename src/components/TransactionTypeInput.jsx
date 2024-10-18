import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

const typeOptions = [
  { value: 'expense', label: 'Expense', icon: '💸' },
  { value: 'income', label: 'Income', icon: '💰' },
]

export function TransactionTypeInput({ value, onChange, className = '' }) {
  return (
    <div className={className}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              Type
            </Label>
            <div className="relative mt-2">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {typeOptions.find((option) => option.value === value)?.icon}{' '}
                    {
                      typeOptions.find((option) => option.value === value)
                        ?.label
                    }
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {typeOptions.map((option) => (
                    <ListboxOption
                      key={option.value}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={option.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? 'font-semibold' : 'font-normal'
                              }`}
                            >
                              {option.icon} {option.label}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                active ? 'text-white' : 'text-indigo-600'
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}

TransactionTypeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}
