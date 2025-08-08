# useMemo

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
}
```
