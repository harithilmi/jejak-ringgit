import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import PropTypes from 'prop-types'

const typeOptions = [
  { value: 'expense', label: 'Expense', icon: '💸' },
  { value: 'income', label: 'Income', icon: '💰' },
]

export function TransactionTypeInput({ value, onChange, className = '' }) {
  const selectedOption = typeOptions.find(option => option.value === value)

  return (
    <div className={className}>
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        Type
      </label>
      <Menu as="div" className="relative inline-block text-left w-full">
        {({ open, close }) => (
          <>
            <div>
              <MenuButton className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <span className="flex items-center">
                  {selectedOption.icon} {selectedOption.label}
                </span>
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>
            </div>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems
                className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1">
                  {typeOptions.map((option) => (
                    <MenuItem key={option.value}>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block px-4 py-2 text-sm`}
                          onClick={(e) => {
                            e.preventDefault()
                            onChange(option.value)
                            close() // Close the menu after selection
                          }}
                        >
                          {option.icon} {option.label}
                        </a>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

TransactionTypeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}
