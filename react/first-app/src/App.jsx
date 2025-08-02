import { useState } from "react";
import "./App.css";

function App() {
    let counter = 0;
    const [counter2, setcounter2] = useState(0);
    const increase = () => {
        counter = counter + 1;
        setcounter2(counter2 + 1);
        console.log("counter는", counter, "counter2 state는", counter2);
    };
    return (
        <div>
            <div>{counter}</div>
            <div>state:{counter2}</div>
            <button onClick={increase}>클릭!</button>
        </div>
    );
}

export default App;
