# state 업데이트 시키는 두 가지 방식 비교!

count라는 state를 업데이트 시키는 두 가지 방식을 비교해보자.

## setCount(count + 1); (현재 상태값 사용)

-   현재 count 값을 기반으로 1 증가 시킴
-   하지만! setCount는 비동기적으로 실행되므로 여러 번 호출하면 예상과 다른 결과가 나올 수도 있음

*   왜 state를 업데이트시키는게 비동기적으로 실행디 될까?
    왜냐하면 state를 업데이트하면 UI도 같이 업데이트가 되기 때문에 아주비싼 작업이다.

그래서 모아놨다가 setState를 호출하는 함수가 끝나면 한번에 업데이트를 한다.

(예제3) 버튼 클릭 시 3번 증가시키기

```javascript
const [count, setCount] = useState(0);

const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
};

return (
    <div>
        <p>Count: {count}</p>
        <button onClick={handleClick}>+3 증가</button>
    </div>
);
```

버튼을 클릭해도 count는 1만 증가할 수 있다.
이유는?

-   setCount(count + 1); 실행될 때, count 값이 아직 바뀌지 않았음!
-   setCount(count + 1); 이 같은 count 값을 사용하기 때문에 같은 연산이 반복됨.

## setCount(prev => prev + 1); (이전 상태값 사용)

```javascript
setCount((prev) => prev + 1);
```

이전 상태(prev)를 안전하게 받아와서 1 증가시킴
setCount가 여러 번 호출되더라도 정확한 값을 유지할 수 있음

```javascript
const [count, setCount] = useState(0);

const handleClick = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
};
```

이제 버튼을 클릭하면 count가 3씩 증가한다.

이유는?
prev는 이전 상태를 가져오기 때문에 매번 최신 값으로 연산된다.
첫 번째 호출 : prev = 0 -> 1;
두 번째 호출 : prev = 1 -> 2;
세 번째 호출 : prev = 2 -> 3;

## 정리

`언제 어떤 방법을 써야 할까?`

✅ 한 번만 업데이트할 때 → setCount(count + 1);
✅ 이전 상태를 기반으로 여러 번 변경할 때 → setCount(prev => prev + 1); (이게 더 안전함!)
