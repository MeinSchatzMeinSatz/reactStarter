# useEffect

리액트 코드를 작성할 때 useState만큼이나 자주 쓰는 훅이 바로 useEffect이다. 대부분의 개발자에게 useEffect의 정의에 대해 물어본다면 다음과 답변을 들을 수 있을 것이다.

-   useEffect는 두 개의 인수를 받는데, 첫 번째는 콜백, 두 번쨰는 의존성 배열이다. 이 두 번쨰 의존성 배열의 값이 변경되면 첫 번째 인수인 콜백을 실행한다.
-   클래스 컴포넌트의 생명주기 메서드와 비슷한 작동을 구현할 수 있다. 두 번째 의존성 배열에 빈 배열을 넣으면 컴포넌트가 마운트될 때만 실행된다.
-   useEffect는 클린업 함수를 반환할 수 있는데, 이 클린업 함수는 컴포넌트가 언마운트될 때 실행된다.

이러한 useEffect에 대한 정의는 어느 정도 옳지만 완전히 정확하지는 않다. 그리고 useEffect는 자주 쓰지만 생각보다 사용하기 쉬운 훅이 아니다. 그리고 알려진 것처럼 생명주기 메서드를 대체하기 위해 만들어진 훅도 아니다.

useEffect의 정의를 정확하게 내리자면 useEffect는 애플리케이션 내 컴포넌트의 여러 값들을 활용해 동기적으로 부수 효과를 만드는 메커니즘이다. 그리고 이 부수 효과가 '언제' 일어나는지보다 어떤 상태값과 함께 실행되는지 살펴보는 것이 중요하다.

지금부터 그것이 무엇을 의미하는지, 또 어떤 식으로 작성하고 주의해야 하는지 살펴보자.

## useEffect란?

먼저 useEffect의 일반적인 형태를 살펴보자.

```javascript
function Component() {
    // ...
    useEffect(() => {
        // do Something
    }, [props, state]);
    // ...
}
```

첫 번째 인수로는 실행할 부수 효과가 포함된 함수를, 두 번째 인수로는 의존성 배열을 전달한다.

이 의존성 배열은

-   어느 정도 길이를 가진 배열일 수도,
-   아무런 값이 없는 빈 배열일 수도 있고,
-   배열자체를 넣지 않고 생략할 수도 있다.
    각각의 차이점은 잠시 후에 소개한다.

의존성 배열이 변경될 때마다 useEffect의 첫 번째 인수인 콜백을 실행한다는 것은 널리 알려진 사실이다. 하지만 useEffect는 어떻게 의존성 배열이 변경된 것을 알고 실행될까?

여기서 한 가지 기억해야 할 사실은 바로 함수 컴포넌트는 매번 함수를 실행해 렌더링을 수행한다는 것이다. 다음 예제 코드를 살펴보자.

```javascript
function Component() {
    const [counter, setCounter] = useState(0);

    function handleClick() {
        setConter((prev) => prev + 1);
    }

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </>
    );
}
```

버튼을 클릭하면 counter에 값을 1씩 올리는 평범한 컴포넌트다. 버튼을 클릭하면 이 함수 컴포넌트는 useState의 원리에 따라 다음과 같이 작동한다고 볼 수 있다.

```javascript
function Component() {
    const counter = 1;
    // ...
    return (
        <>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </>
    );
}
```

즉, 함수 컴포넌트는 렌더링 시마다 고유의 state와 props 값을 갖고 있다. 여기에 useEffect가 추가된다면 다음과 같은 형태가 된다.

```javascript
function Component() {
    const counter = 1;

    useEffect(() => {
        console.log(counter); // 1, 2, 3, 4...
    });

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </>
    );
}
```

useEffect는 자바스크립트의 proxy나 데이터 바인딩, 옵저버 같은 특별한 기능을 통해 값의 변화를 관찰하는 것이 아니고 `렌더링할 때마다 의존성에 있는 값을 보면서 이 의존성의 값이 이전과 다른 게 하나라도 있으면 부수 효과를 실행하는 평범한 함수라 볼 수 있다.` 따라서 useEffect는 state와 props의 변화 속에서 일어나는 렌더링 과정에서 실행되는 부수 효과 함수라고 볼 수 있다.

## 의존성 배열

의존성 배열은 보통 빈 배열을 두거나, 아예 아무런 값도 넘기지 않거나, 혹은 사용자가 직접 원하는 값을 넣어줄 수 있다. 만약 빈 배열을 둔다면 리액트가 이 useEffect는 비교할 의존성이 없다고 판단해 최초 렌더링 직후에 실행된 다음부터는 더 이상 실행되지 않는다. 아무런 값도 넘겨주지 않는다면 이때는 의존성을 비교할 필요 없이 렌더링 때마다 실행이 필요하다고 판단해 렌더링이 발생할 때마다 실행된다. 이는 보통 컴포넌트가 렌더링됐는지 확인하기 위한 방법으로 사용된다.

```javascript
useEffect(() => {
    console.log("컴포넌트 렌더링됨");
});
```

위 코드처럼 구현해 둔다면 컴포넌트가 렌더링될 때마다 useEffect가 실행될 것이다. 만약 컴포넌트가 랜더링되는지 확인하고 싶다면 위와 같이 useEffect를 선언해 두면 된다.

그렇다면 한 가지 의문점이 든다. 의존성 배열이 없는 useEffect가 매 렌더링마다 실행된다면 그냥 useEffect 없이 써도 되는 게 아닐까?

useEffect가 있는 코드와 없는 코드는 명백히 리액트에서 차이점을 지닌다. 차이점은 다음과 같다.

1. 이후에 소개할 서버 사이드 렌더링 관점에서 useEffect는 클라이언트 사이드에서 실행되는 것을 보정해 준다. useEffect 내부에서는 window 객체의 접근에 의존하는 코드를 사용해도 된다.
2. useEffect는 컴포넌트 렌더링의 부수 효과, 즉 컴포넌트의 렌더링이 완료된 이후에 실행된다. 반면 1번과 같이 함수 내부에서의 직접 실행은 컴포넌트가 렌더링되는 도중에 실행된다. 따라서 2번과는 달리 렌더링의 경우에 서버에서도 실행된다. 그리고 이 작업은 함수 컴포넌트의 반환을 지연시키는 행위다. 즉, 무거운 작업일 경우 렌더링을 방해하므로 성능에 악영향을 미칠 수 있다.

useEffect의 effect는 컴포넌트의 사이드 이펙트, 즉 부수 효과를 의미한다는 것을 명심하자. useEffect는 컴포넌트가 렌더링된 후에 어떠한 부수 효과를 일으키고 싶을 때 사용하는 훅이다.

## useEffect의 구현

그렇다면 useEffect는 어떻게 구현돼 있을까? useState와 마찬가지로 리액트 코드를 직접 구현할 수는 없지만 대략적인 모습은 다음과 같이 상상해 볼 수 있다.

```javascript
const MyReact - (function () {
    const global = {}
    let index = 0

    function useEffect(callback, dependencies) {
        const hooks = global.hooks

        // 이전 훅 정보가 있는지 확인한다.
        let previousDependencies = hooks[index]

        // 변경됐는지 확인
        // 이전 값이 있다면 이전 값을 얕은 비교로 비교해 변경이 일어났는지 확인한다.
        // 이전 값이 없다면 최초 실행이므로 변경이 일어난 것으로 간주해 실행을 유도한다.
        let isDependenciesChanged = previousDependcies ? dependencies.some(
            (value, idx) => !Object.is(value, previousDependencies[idx])
        )
        :true

        // 변경이 일어났다면 첫 번째 인수인 콜백 함수를 실행한다.
        if (isDependenciesChanged) {
            callback()

            // 다음 훅이 일어날 때를 대비하기 위해 index를 추가한다.
            index++

            // 현재 의존성을 훅에 다시 저장한다.
            hooks[index] = dependencies
        }
    }

    return {useEffect}
})
```

핵심은 의존성 배열의 이전 값과 현재 값의 얕은 비교다. 1.1.4절에서 언급한 것처럼 리액트는 값을 비교할 때 Object.is를 기반으로 하는 얕은 비교를 수행한다. 이전 의존성 배열과 현재 의존성 배열의 값에 하나라도 변경 사항이 있다면 callback으로 선언한 부수 효과를 실행한다. 이것이 useEffect의 본질이다.

## useEffect를 사용할 때 주의할 점

useEffect는 리액트 코드를 작성할 때 가장 많이 사용하는 훅이면서 가장 주의해야 할 훅이기도 하다.

useEffect를 잘못 사용하면 예기치 못한 버그가 발생할 수 있으며, 심한 경우 무한 루프에 빠지기도 한다.

useEffect를 사용할 때 주의할 점은 무엇이 있는지 살펴보자.

-   eslint-disable-line react-hooks/exhaustive-deps 주석은 최대한 자제하라
-   useEffect의 첫 번째 인수에 함수명을 부여하라
-   거대한 useEffect를 만들지 마라
-   불필요한 외부 함수를 만들지 마라
