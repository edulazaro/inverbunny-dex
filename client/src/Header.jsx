import Dropdown from "./Dropdown.jsx";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";

function Header({ user, tokens, tradeableTokens, selectToken }) {
  return (
    <header id="header">
      <nav className="bg-white border-gray-200  border-b mb-4 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <div>
            {useMatch("/wallet") && (
              <Dropdown
                items={tokens.map((token) => ({
                  label: token.ticker.replace(/\0/g, ""),
                  value: token,
                }))}
                activeItem={{
                  label: user.selectedToken.ticker.replace(/\0/g, ""),
                  value: user.selectedToken,
                }}
                onSelect={selectToken}
              />
            )}
            {useMatch("/") && (
              <Dropdown
                items={tradeableTokens.map((token) => ({
                  label: token.ticker.replace(/\0/g, "") + '/DAI',
                  value: token,
                }))}
                activeItem={{
                  label: user.selectedToken.ticker.replace(/\0/g, "") + '/DAI',
                  value: user.selectedToken,
                }}
                onSelect={selectToken}
              />
            )}
          </div>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                k="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  DEX
                </Link>
              </li>
              <li>
                <Link
                  to="wallet"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Wallet
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
