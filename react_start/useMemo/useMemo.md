# useMemo

## useMemo 가볍게 사용해보기

useMemo도 useEffect와 비슷한 부분이 많습니다. state가 있는 컴포넌트에 state 변화가 생기면 재평가 후 새로 렌더링을 하기 때문이죠. 어떤 부분이 다른지 왜 이 두가지로 분리되었는지 뒤에서 차근차근 살펴보겠습니다.

useMemo는 컴포넌트 성능 최적화에 사용됩니다. Memo는 memoization이라는 기법을 사용합니다.

메모이제이션 기법을 사용하는 대표적인 예로 재귀함수의 피보나치 순열이 있는데요. 피보나치 순열을 재귀로 호출하게 되면 많은 함수가 반복됩니다. 그런데 그러한 결과값을 어떠한 object에 가지고 있다면 반복할 필요가 없습니다.

이러휴게 어떤 부하가 생기는 함수를 반복해서 작업할 때 기억해두었다가 상요하는 기법을 말합니다. 렌더링이 될 때 이전에 작업해 두었던 결과값을 가지고 있다가 반영해주는 것이죠.

```javascript
const 저장할변수 = useMemo (() => {
    return 계산하는_무거운 함수()
}, [감시하고_있는_변수])
```

그렇다면 실제로 부하가 발생되는 코드를 만들어 보도록 하겠습니다. 아래 컴포넌트는 랜더링이 될 때마다 부하함수를 호출하여 부하가 발생하고 있습니다. 중요한 점은 저 부하의 결과값이 항상 같다는 거죠! 이를 렌더링 될 때마다 계산해주는 것이 아니라 단 한 번만 계산되게 하고 싶습니다.

```javascript
import { useState } from "react";

function 부하() {
    let s = 0;
    for (let i = 0; i < 100000000; i++) {
        s += i;
    }
    return s;
}

function App() {
    const [count, setCount] = useState(0);
    let result = 부하();

    const handleCountUp = (e) => {
        setCount(count + 1);
        console.log(count);
    };

    return (
        <div>
            <h1>계산 결과 : {result}</h1>
            <div>{count}</div>
            <button onClick={handleCountUp}>UP!</button>
        </div>
    );
}

export default App;
```

여기서 사용할 수 있는 것이 useMemo입니다.

```javascript
import { useState, useMemo } from "react";

function 부하() {
    let s = 0;
    for (let i = 0; i < 100000000; i++) {
        s += i;
    }
    return s;
}

function App() {
    const [count, setCount] = useState(0);
    const result = useMemo(() => {
        return 부하();
    }, []);

    const handleCountUp = (e) => {
        setCount(count + 1);
        console.log(count);
    };

    return (
        <div>
            <h1>계산 결과 : {result}</h1>
            <div>{count}</div>
            <button onClick={handleCountUp}>UP!</button>
        </div>
    );
}

export default App;
```

또는 특정 변수가 변할 때에만 부하를 발생시킬 수도 있습니다.

```javascript
import React, { useState, useMemo } from "react";

function 부하() {
    let s = 0;
    for (let i = 0; i < 10000000; i++) {
        s += i;
    }
    return s;
}

function App() {
    const [count, setCount] = useState(0);
    const [countTwo, setCountTwo] = useState(0);

    const handleCountUP = (e) => {
        setCount(count + 1);
        console.log(count);
    };
    const handleCountUpTwo = (e) => {
        setCountTwo(countTwo + 1);
        console.log(countTwo);
    };

    console.log("랜더링!!");

    const result = useMemo(() => {
        return 부하();
    }, [countTwo]);

    return (
        <div className="App">
            <h1>계산 결과 : {result}</h1>
            <div>{count}</div>
            <button onClick={handleCountUp}>up!</button>
            <div>{countTwo}</div>
            <button onClick={handleCountUpTwo}>up!</button>
        </div>
    );
}

export default App;
```
