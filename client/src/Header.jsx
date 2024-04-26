import Dropdown from "./Dropdown.jsx";

function Header({ user, tokens, contracts, selectToken }) {
  return (
    <header id="header">
      <nav className=" border-b mb-4 border-gray-200">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
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
          </div>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="text-sm px-4 py-2">
              <span className="contract-address">
                Contract address:{" "}
                <span className="address">{contracts.dex.options.address}</span>
              </span>
            </div>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
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
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
