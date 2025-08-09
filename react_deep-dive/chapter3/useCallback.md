# useCallback

useMemo가 값을 기억했다면, useCallback은 인수로 넘겨받은 콜백 자체를 기억한다. 쉽게 말해 useCallback은 특정 함수를 새로 만들지 않고 다시 재사용한다는 의미다.

언뜻 보기엔 특정 함수를 재생성하지 않는다는 말이 이해하기 쉽지 않다. 이에 대한 이해를 돕기 위해 아래 예제를 살펴보자.

```javascript
// memo를 사용함에도 전체 자식 컴포넌트가 리렌더링 되는 예제

const ChildComponent = memo(({ name, value, onChange }) => {
    // 렌더링이 수행되는지 확인하기 위해 넣었다.
    useEffect(() => {
        console.log('rendering!', name)
    })

    return (
        <>
            <h1>
                {name} {value ? "켜짐" : "꺼짐"}
            </h1>
            <button onClick={onChange}>toggle</button>
        </>
    )
})

function App() {
    const [status1, setStatus1] = useState(false)
    const [status2, setStatus2] = useState(false)

    const toggle1 = () => {
        setStatus1(!status1)
    }

    const toggle2 = () => {
        setStatus2(!status2)
    }

    return (
        <>
            <ChildComponent name="1" value={status1} onChange={toggle1}>
            <ChildComponent name="2" value={status2} onChange={toggle2}>
        </>
    )
}
```

memo를 사용해서 컴포넌트를 메모이제이션했지만 App의 자식 컴포넌트 전체가 렌더링되고 있다.

위 코드는 ChildComponent에 memo를 사용해 name, value, onChange의 값을 모두 기억하고, 이 값이 변경되지 않았을 때는 렌더링되지 않도록 작성된 코드다. 정상적인 흐름이라면 하나의 value 변경이 다른 컴포넌트에 영향을 미쳐서는 안되고, 클릭할 때마다 하나의 컴포넌트만 렌더링되어야 한다. 그러나 어느 한 버튼을 클릭하면 클릭한 컴포넌트 외에도 클릭하지 않은 컴포넌트도 렌더링되는 것을 알 수 있다.그 이유는 state의 값이 바뀌면서 App컴포넌트가 리렌더링되고, 그때마다 매번 onChange로 넘기는 함수가 재생성되고 있기 때문이다. 이는 크롬 메모리 프로필에서 확인할 수 있다.

`값의 메모이제이션을 위해 useMemo를 사용했다면, 함수의 메모이제이션을 위해 사용하는 것이 useCallback이다.`

useCallback의 첫 번째 인수로 함수를, 두 번째 인수로 의존성 배열을 집어 넣으면 useMemo와 마찬가지로 의존성 배열이 변경되지 않는 한 함수를 재생성하지 않는다.

```javascript
// 이전 예제의 컴포넌트에 useCallback만 추가한 코드

const ChildComponent = memo(({ name, value, onChange }) => {
    // 렌더링이 수행되는지 확인하기 위해 넣었다.
    useEffect(() => {
        console.log('rendering!', name)
    })

    return (
        <>
            <h1>
                {name} {value ? "켜짐" : "꺼짐"}
            </h1>
            <button onClick={onChange}>toggle</button>
        </>
    )
})

function App() {
    const [status1, setStatus1] = useState(false)
    const [status2, setStatus2] = useState(false)

    const toggle1 = useCallback(
        function toggle1() {
            setStatus1(!status)
        }, [status1],
    )

    const toggle2 = useCallback(
        function toggle2() {
            setStatus2(!status2)
        }, [status2],
    )

    return (
        <>
            <ChildComponent name="1" value={status1} onChange={toggle1}>
            <ChildComponent name="2" value={status2} onChange={toggle2}>
        </>
    )
}
```

useCallback을 추가혀면 해당 의존성이 변경됐을 때만 함수가 재생성되는 것을 볼 수 있다.

이처럼 `함수의 재생성을 막아 불필요한 리소스 또는 리렌더링을 방지하고 싶을 때 useCallback을 사용해 볼 수 있다.`

-   왜 useCallback에 기명 함수를 넘겨주었나요?

일반적으로 useCallback이나 useMemo를 사용할 때 useEffect와 마찬가지로 많은 코드가 익명 함수로 첫 번째 인수를 넘겨준다.

const toggle1 = useCallback(() => {
setStatus1(!status1)
}, [status1])

그러나 위 예제에서는 기명 함수를 넘겨줬는데, 이는 크롬 메모리 탭에서 디버깅을 용이하게 하기 위함이다. 익명 함수는 말 그대로 이름이 없어 해당 함수를 추적하기 어렵기 때문이다. 기명 함수로 선언한 함수를 크롬 개발자 도구에서 디버깅하는 방법은 '크롬 개발자 도구를 활용한 애플리케이션 분석'에서 다룬다.

기본적으로 useCallback은 useMemo를 사용해서 구현할 수 있다. 이는 Preact에서도 리액트 공식 문서에서도 확인해 볼 수 있는 사실이다.

```javascript
// Preact에서의 useCallback 구현

export function useCallback(callback, args) {
    currentHook = 8;
    return useMemo(() => callback, args);
}
```

useMemo와 useCallback의 유일한 차이는 메모이제이션을 하는 대상이 변수냐 함수냐일 뿐이다. 자바스크립트에서는 함수 또한 값으로 표현될 수 있으므로 이러한 코드는 매우 자연스럽다고 볼 수 있다. 다만 useMemo로 useCallback을 구현하는 경우 다음과 같이 불필요하게 코드가 길어지고 혼동을 야기할 수 있으므로 리액트에서 별도로 제공하는 것으로 추측해 볼 수 있다.

```javascript
import { useState, useCallback, useMemo } from "react";

export default function App() {
    const [counter, setCounter] = useState(0);

    /* 아래 두 함수의 작동은 동일하다. */

    const handleClick = useCallback(() => {
        setCounter((prev) => prev + 1);
    }, []);

    const handleClick2 = useMemo(() => {
        return () => setCounter((prev) => prev + 1);
    }, []);

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={handleClick1}>+</button>
            <button onClick={hnadleClick2}>+</button>
        </>
    );
}
```

예제에서 useCallback을 사용한 handleClick1이나 useMemo를 사용한 handleClick2 모두 동일한 기능을 가진다. 다만 useMemo는 값 자체를 메모이제이션하는 용도이기 때문에 반환문으로 함수 선언문을 반환해야 한다. 이는 코드를 작성하거나 리뷰하는 입장에서 혼란을 불러올 수 있으므로 함수를 메모이제이션하는 용도라면 좀 더 간단한 useCallback을 사용하자. 다만 기억해야 할 사실은 useCallback이나 useMemo는 모두 동일한 역할을 한다는 것이다.
