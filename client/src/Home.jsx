import NewOrder from "./NewOrder.jsx";
import AllOrders from "./AllOrders.jsx";
import MyOrders from "./MyOrders.jsx";
import AllTrades from "./AllTrades.jsx";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";

function Home({
  user,
  createMarketOrder,
  createLimitOrder,
  tradeableTokens,
  selectToken,
  trades,
  orders,
  buyOrders,
  sellOrders,
}) {
  const location = useLocation();

  useEffect(() => {
    // If you need to perform an action specifically when navigating to a certain path:
    if (location.pathname === "/") {
      //.padEnd(66, "0");
      if (user.selectedToken.ticker.replace(/\0/g, "") == "DAI") {
        console.log(tradeableTokens[0]);
        selectToken(tradeableTokens[0]);
      }
    }
  }, [location]); // Dependency on location makes this effect run on navigation changes within the component

  return (
    <main className="container-fluid">
      {user.selectedToken.ticker.replace(/\0/g, "")}
      <div className="row">
        <div className="col-sm-4 first-col">
          <div className="mt-4">
            {user.selectedToken.ticker.replace(/\0/g, "") !== "DAI" ? (
              <NewOrder
                createMarketOrder={createMarketOrder}
                createLimitOrder={createLimitOrder}
              />
            ) : null}
          </div>
        </div>

        {user.selectedToken.ticker.replace(/\0/g, "") !== "DAI" ? (
          <div className="col-sm-8">
            <AllTrades trades={trades} />
            <div className="mt-4">
              <AllOrders orders={orders} />
            </div>
            <div className="mt-4">
              <MyOrders
                orders={{
                  buy: buyOrders,
                  sell: sellOrders,
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default Home;
