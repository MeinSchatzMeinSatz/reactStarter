# useMemo

-   렌더링이 될때마다 부하가 되는 함수를 호출하여 부하가 발생하는 상황에서, useMemo는 값을 저장해두고, 이를 렌더링 될 때마다 계산해주는 것이 아니라 단 한번만 계산되게 한다.

useMemo는 비용이 큰 연산에 대한 결과를 저장(메모이제이션) 해 두고, 이 저장된 값을 반환하는 훅이다.

흔히 리액트에서 [최적화]를 떠올릴 때 가장 먼저 언급되는 훅이 바로 useMemo다.

```javascript
import { useMemo } from "react";

const memoizedValue = useMemo(() => expensiveComputation(a, b), [a, b]);
```

첫번째 인수로는 어떠한 값을 반환하는 생성 함수를, 두 번째 인수로는 해당 함수가 의존하는 값의 배열을 전달한다.

useMemo는 렌더링 발생 시 의존성 배열의 값이 변경되지 않았으면 함수를 재실행하지 않고 이전에 기억해 둔 해당 값을 반환하고, 의존성 배열의 값이 변경됐다면 첫 번째 인수의 함수를 실행한 후에 그 값을 반환하고 그 값을 다시 기억해 둘 것이다.

이러한 메모이제이션은 단순히 [값]뿐만 아니라 [컴포넌트]도 가능하다.

```javascript
function ExpensiveComponent({ value }) {
    useEffect(() => {
        console.log("rendering");
    });
    return <span>{value + 1000}</span>;
}

function App() {
    const [value, setValue] = useState(10);
    const [, triggerRendering] = useState(false);

    // 컴포넌트의 props를 기준으로 컴포넌트 자체를 메모이제이션했다.
    const MemoizedComponent = useMemo(
        () => <ExpensiveComponent value={value} />,
        [value]
    );

    function handleChange(e) {
        setValue(Number(e.target.value));
    }

    function handleClick() {
        triggerRendering((prev) => !prev);
    }

    return (
        <>
            <input value={value} onChange={handleChange} />
            <button onClick={(handleClick = { handelClick })}>
                렌더링 발생!
            </button>
            {MemoizedComponent}
        </>
    );
}
```

useMemo로 컴포넌트도 감쌀 수 있다. 물론 React.memo를 쓰는 것이 더 현명하다.

triggerRendering으로 컴포넌트 렌더링을 강제로 발생시켰지만 MemoizedComponent는 리렌더링되지 않는 것을 확인할 수 있다. MemoizedComponent는 의존성으로 선언된 value가 변경되지 않는 한 다시 계산되는 일은 없을 것이다. useMemo 등 메모이제이션을 활용하면 무거운 연산을 다시 수행하는 ㅓㄱㅅ을 막을 수 있다는 장점이 있다.
