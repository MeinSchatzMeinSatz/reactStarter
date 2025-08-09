# useRef

useRef는 useState와 동일하게 컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장한다는 공통점이 있다. 그러나 useState와 구별되는 큰 차이점 두 가지를 가지고 있다.

-   useRef는 반환값인 객체 내부에 있는 current로 값에 접근 또는 병경할 수 있다.
-   useRef는 그 값이 변하더라도 렌더링을 발생시키지 않는다.

useRef로 useState를 흉내 내도 렌더링되지 않는다는 것을 알 수 있다. 다음 코드를 통해 렌더링이 되지 않는지 살펴보자.

```javascript
function RefCmponent() {
    const count = useRef(0);

    function handleClick() {
        count.current += 1;
    }

    // 버튼을 아무리 눌러도 변경된 count 값이 렌더링되지 않는다.
    return <button onClick={handleClick}>{count.current}</button>;
}
```

useRef에 대해 본격적으로 알아보기 전에 useRef가 왜 필요한지 먼저 고민해보자. 렌더링에 영향을 미치지 않는 고정된 값을 관리하기 위해서 useRef를 사용하지 않고 그냥 함수 외부에서 값을 선언해서 관리하는 것도 동일한 기능을 수행할 수도 있지 않을까? 다음 예제를 보자.

```javascript
let value = 0;

function Component() {
    function handleClick() {
        value += 1;
    }

    // ...
}
```

결론부터 이야기하자면 이 방식은 몇 가지 단점이 있다. 먼저 컴포넌트가 실행되어 렌더링되지 않았음에도 value라는 값이 기본적으로 존재하게 된다. 이는 메모리에 불필요한 값을 갖게 하는 악영향을 미친다.

그리고 만약 Component, 즉 컴포넌트가 여러 번 생성된다면 각 컴포넌트에서 가리키는 값이 모두 value로 동일하다. 컴포넌트가 초기화되는 지점이 다르더라도 하나의 값을 봐야 하는 경우라면 유효할 수도 있지만 대부분의 경우에는 컴포넌트 인스턴스 하나당 하나의 값을 필요로 하는 것이 일반적이다.

useRef는 앞서 언급한 두 가지 문제를 모두 극복할 수 있는 리액트식 접근법이다. 컴포넌트가 렌더링될 때만 생성되며, 컴포넌트 인스턴스가 여러 개라도 각각 별개의 값을 바라본다.

useRef의 가장 일반적인 사용 예는 바로 DOM에 접근하고 싶을 때일 것이다. 다음 코드를 보자.

```javascript
function RefComponent() {
    const inputRef = useRef();

    // 이때는 미처 렌더링이 실행되기 전(반환되기 전) 이므로 undefined를 반환한다.
    console.log(inputRef.current); // undefined

    useEffect(() => {
        console.log(inputRef.current); // <input type = "text"></input>
    }, [inputRef]);

    return <input ref={inputRef} type="text" />;
}
```

useRef는 최초에 넘겨받은 기본값을 가지고 있다.

한 가지 명심할 것은 useRef의 최초 기본값은 return 문에 정의해 둔 DOM이 아니고 useRef()로 넘겨받은 인수라는 것이다. useRef가 선언된 당시에는 아직 컴포넌트가 렌더링되기 전이라 return으로 컴포넌트의 DOM이 반환되기 전이므로 undefined다.

useRef를 사용할 수 있는 유용한 경우는 렌더링을 발생시키지 않고 원하는 상태값을 저장할 수 있다는 특징을 활용해 useEffect의 이전 값을 저장하는 usePrevious() 같은 훅을 구현할 때다. 다음 코드를 보자.

```javascript
function usePrevious(value) {
    const ref = useRef()
    useEffect(() => => {
        ref.current = value
    }, [value]) // value가 변경되면 그 값을 ref에 넣어둔다.
    return ref.current
}

function SomeComponent() {
    const [counter, setCounter] = useState(0)
    const previousCounter = usePrevious(counter)

    function handleClick() {
        setCounter((prev) => prev + 1)
    }

    // 0
    // 1, 0
    // 2, 1
    // 3, 2
    return (
        <button onClick={handleClick}>
        {counter} {previousCounter}
        </button>
    )
}
```

이렇게 개발자가 원하는 시점의 값을 렌더링에 영향을 미치지 않고 보관해 두고 싶다면 useRef를 사용하는 것이 좋다.

그렇다면 useRef는 어떻게 구현돼 있을까? 리액트에서의 구현은 다르지만 Preact에서 구현에 대한 힌트를 얻을 수 있다. 의외로 구현은 매우 간단하다.

```javascript
exprot function useRef(initialValue) {
    currentHook = 5
    return useMemo(() => ({current: initialValue}) [])
}
```

-   값이 변경돼도 렌더링되면 안 된다는 점.
-   실제 값은 {current: value}와 같은 객체 형태로 있다는 점
    을 떠올려보자.

렌더링에 영향을 미치면 안되기 때문에 useMemo에 의도적으로 선언해 뒀고, 이는 각 렌더링마다 동일한 객체를 가리키는 결과를 낳을 것이다. 자바스크립트의 특징, 객체의 값을 변경해도 객체를 가리키는 주소가 변경되지 않는다는 것을 떠올리면 useMemo로 useRef를 구현할 수 있다.
