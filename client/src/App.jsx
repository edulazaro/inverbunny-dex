import { useState } from "react";
import Footer from "./Footer.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div id="app">
        <div>Header</div>
        <div>Main part</div>

        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <Footer />
      </div>
    </>
  );
}

export default App;
