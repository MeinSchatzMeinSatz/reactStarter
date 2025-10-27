import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Counting App</h1>
        <p>{count}</p>
        <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      </div>
    </>
  );
}

export default App;
