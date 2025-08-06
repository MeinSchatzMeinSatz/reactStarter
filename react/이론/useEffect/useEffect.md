# useEffect

## 간단한 카운터 만들기

카운터를 만들어 추가해보자

```javascript
import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const handleCountUp = (e) => {
        setCount(count + 1);
    };

    return (
        <>
            <div>{count}</div>
            <button onClick={handleCountUp}>Up!</button>
        </>
    );
}

function App() {
    return (
        <div className="App">
            <Counter />
        </div>
    );
}

export default App;
```

2. useEffect
   count가 컴포넌트의 state로 존재하는데 이 state가 변할 때마다 뭔가 다른 효과를 주고 싶다. 아래와 같이 수정하여 count가 홀수 인지 짝수인지 비교해서 alert를 띄워주겠다.

```javascript
import React, {useState, useEffect} from 'react'; // useEffect추가

function Counter() {
    const [count, setCount] = useState(0)
    cosnt countUp = () => {
        setCount(count+1)
    }
    // count가 변했을 때 동작할 행동을 useEffect를 이용해 구현

    useEffect(()=> {
        if (count%2){
            alert('홀수입니다')
        } else {
            alert("짝수입니다")
        }
    }, [count])

    return (
        <>
            <div>{count}</div>
            <button onClick={countUp}>up!</button>
        </>
    )
}

function App() {
    return (
        <div>
            <Counter/>
        </div>
    )
}

export defualt App;
```

위 예제에서는 useEffect를 사용하기 위해 useState와 마찬가지로 useState와 마찬가지로 useEffect를 import한다. 이 useEffect는 state를 지정하여 해당 스테이트가 변경되었음을 감지하면 함수를 실행시킨다.

useEffect를 조금 더 살펴보자. 기본적인 구조는 아래와 같다.

```javascript
useEffect(()=> {
    // state가 변경되어 렌더링 될 떄 실행하는 부분!
    // 공부하려고 책 펴는 타이밍!

    return ()=> {
        // 다시 렌더링을 하기 이전에 컴포넌트를 지우고 다시 그리겠죠?
        // 이 과정에서 지우기 전에 실행되는 부분.(clean-up)이라고도 한다.
        // 시험 공부 하나를 마치고 다음 시험 공부 전에 책상 정리하는 느낌이다.
        // 결론적으로 클린업 함수는 컴포넌트가 화면에서 지워질 때, 그리고 최초가 아닌 effect 함수가 호출되기 직전에 호출된다.
    }
}[/* 감시할 state값이 들어간다. 들어가지 않을 경우 최초 1번만 실행된다. */])
```

useEffect의 이용형태

```javascript
// 컴포넌트가 업데이트 될 때마다 매번 실행
useEffect(() => {
    console.log("hello world");
});

// 처음에만 실행
useEffect(() => {
    console.log("hello world");
}, []);

// 변수들의 변화가 일어날 때마다 실행
useEffect(() => {
    console.log("hello world");
}, [변수1, 변수2]);
```
