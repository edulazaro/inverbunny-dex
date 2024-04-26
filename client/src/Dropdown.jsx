import { useState } from "react";
import PropTypes from "prop-types";

function Dropdown({ onSelect, activeItem, items }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const selectItem = (e, item) => {
    e.preventDefault();
    setDropdownVisible(!dropdownVisible);
    onSelect(item);
  };

  return (
    <div className="dropdown">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
          {activeItem.label}
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
      </button>
    
      <div className={`dropdown-menu ${dropdownVisible ? "block" : "hidden"} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
        <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        {items &&
          items.map((item, i) => (
            <li
                className={`${
                  item.value === activeItem.value ? "active" : null
                }`}
                href="#"
                key={i}
            >
              <a
                className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={(e) => selectItem(e, item.value)}
              >
                {item.label}
              </a>
            </li>
          ))}
          </ul>
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  activeItem: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
};

export default Dropdown;
