import Moment from "react-moment";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function AllTrades({ trades }) {
  const renderList = (trades, className) => {
    return (
      <>
        <table className={`table table-striped trade-list mb-0 ${className}`}>
          <thead>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.tradeId}>
                <td>{trade.amount.toString()}</td>
                <td>{trade.price.toString()}</td>
                <td>
                  <Moment fromNow>{parseInt(trade.date) * 1000}</Moment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  const renderChart = (trades) => {


    const formattedTrades = trades.map(trade => ({
        ...trade,
        price: Number(trade.price),
        date: trade.date.toString()   // Convert BigInt to Number
      }));
    
      console.log(formattedTrades);
    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={formattedTrades}>
          <Line type="monotone" dataKey="price" stroke="#741cd7" />
          <CartesianGrid stroke="#000000" />
          <XAxis
            dataKey="date"
            tickFormatter={(dateStr) => {
                const date = new Date(dateStr * 1000); 
              return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            }}
          />
          <YAxis dataKey="price" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="card">
      <h2 className="card-title">All trades</h2>
      <div className="row">
        <div className="col-sm-12">
          {renderChart(trades)}
          {renderList(trades, "trade-list")}
        </div>
      </div>
    </div>
  );
}

export default AllTrades;
