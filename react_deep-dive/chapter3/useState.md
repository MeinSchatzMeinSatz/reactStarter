# useState

리액트에서 훅을 언급할 때 가장 먼저 떠올리는 것이 useState다. useState는 함수 컴포넌트 내부에서 상태를 정의하고, 이 상태를 관리할 수 있게 해주는 훅이다.

# useState 구현 살펴보기

먼저 useState훅의 기본적인 사용법을 살펴보자.

```javascript
import { useState } from "react";

const [state, setState] = useState(initialState);
```

useState의 인수로는 사용할 state의 초깃값을 넘겨준다. 아무런 값을 넘겨주지 않으면 초깃값은 undefined다. useState 훅의 반환 값은 배열이며, 배열의 첫 번째 원소로 state 값 자체를 사용할 수 있고, 두 번째 원소인 setState 함수를 사용해 해당 state의 값을 변경할 수 있다. 이제 이 훅이 어떻게 작동하는지를 본격적으로 알아보자.

만약 useState를 사용하지 않고 함수 내부에서 자체적으로 변수를 사용해 상태값을 관리한다고 가정해 보자.

```javascript
function Component() {
    let state = "hello";

    function handleButtonClick() {
        state = "hi";
    }

    return (
        <>
            <h1>{state}</h1>
            <button onClick={handleButtonClick}>hi</button>
        </>
    );
}
```

위 코드가 동작하지 않는 이유는 뭘까?

리액트에서 렌더링은 함수 컴포넌트의 return과 클래스 컴포넌트의 render 함수를 실행한 다음. 이 실행 결과를 이전의 리액트 트리와 비교해 리렌더링이 필요한 부분만 업데이트해 이뤄진다.

위 코드에서는 리렌더링을 발생시키기 위한 조건을 전혀 충족하지 못하고 있다. 그렇다면 다음과 같이 하면 어떨까?

```javascript
function Component() {
    const [, triggerRender] = useState();
    let state = "hello";

    function handleButtonClick() {
        state = "hi";
        triggerRender();
    }

    return (
        <>
            <h1>{state}</h1>
            <button onClick={handleButtonClick}>hi</button>
        </>
    );
}
```

useState 반환값의 두 번째 원소를 실행해 리액트에서 렌더링이 일어나게끔 변경했다. 그럼에도 여전히 버튼 클릭 시 state의 변경된 값이 렌더링되고 있지 않다. state가 업데이트되고 있는데 왜 렌더링이 되지 않을까?

그 이유는 리액트의 렌더링은 함수 컴포넌트에서 반환한 결과물인 return의 값을 비교해 실행되기 때문이다. 즉, 매번 렌더링이 발생될 때마다 함수는 다시 새롭게 실행되고, 새롭게 실행되는 함수에서 state는 매번 hello로 초기화되므로 아무리 state를 변경해도 다시 hello로 초기화되는 것이다.

지금까지는 이해할 수 있는 과정으로 보인다. 함수 컴포넌트는 매번 함수를 실행해 렌더링이 일어나고, 함수 내부의 값은 함수가 실행될 때마다 다시 초기화된다.

그렇다면 useState 훅의 결괏값은 어떻게 ㅎㅁ수가 실행돼도 그 값을 유지하고있을까?

리액트의 내부 구현을 하나도 모른다고 가정하고 useState가 어떤 구조를 가지고 있을지 상상해 보자.

```javascript
function useState(initialValue) {
    let internalState = initialValue;

    function setState(newValue) {
        internalState = newValue;
    }

    return [internalState, setState];
}
```

그러나 이는 우리가 원하는 대로 작동하지 않는다.

```javascript
const [value, setValue] = useState(0);
setValue(1);
console.log(value); // 0
```

이러한 결과가 발생하는 이유는 setValue로 값을 변경했음에도 이미 구조 분해 할당으로 state의 값, 즉 value를 이미 할당해 놓은 상태이기 때문에 훅 내부의 setState를 호출하더라도 변경된 새로운 값을 반환하지는 못한 것이다.

이를 해결하려면 먼저 state를 함수로 바꿔서 state의 값을 호출할 때마다 현재 state를 반환하게 하면 된다.

```javascript
function useState(initialValue) {
    let internalState = initialValue;

    function state() {
        return internalState;
    }

    function setState(newValue) {
        internalState = newValue;
    }

    return [state, setState];
}

const [value, setValue] = useState(0);
setValue(1);
console.log(value()); // 1
```

-> 결국은 클로저구만,,,

물론 이것은 우리가 사용하는 useState 훅의 모습과는 많이 동떨어져 있다. 우리는 state를 함수가 아닌 상수처럼 사용하고 있기 때문이다.

이를 해결하기 위해 리액트는 클로저를 이용했다. 여기서 클로저는 어떤 함수(useState) 내부에 선언된 함수(setState)가 함수의 실행이 종료된 이후에도(useState가 호출된 이후에도) 지역변수인 state를 계속 참조할 수 있다는 것을 의미한다.

그렇다면 실제로 useState는 어떤 형태로 구현되어 있을까?

다음 코드는 실제 리액트의 useState 코드가 아니라 작동 방식을 대략적으로 흉내 낸 코드다.

```javascript
const MyReact = (function () {
    const global = {};
    let index = 0;

    function useState(initialState) {
        if (!global.states) {
            // 애플리케이션 전체의 states 배열을 초기화 한다.
            // 최초 접근이라면 빈 배열로 초기화한다.
            global.states = [];
        }

        // states 정보를 조회해서 현재 상태값이 있는지 확인하고,
        // 없다면 초깃값으로 설정한다.
        const currentState = global.state[index] || initialState;
        // states의 값을 위에서 조회한 현재 값으로 업데이트 한다.
        global.states[index] = currentState;

        // 즉시 실행 함수로 setter를 만든다.
        const setState = (function () {
            // 현재 index를 클로저로 가둬놔서 이후에도 계속해서 동일한 index에
            // 접근할 수 있도록 한다.
            let currentIndex = index;
            return function (value) {
                global.states[currentIndex] = value;
                // 컴포넌트를 렌더링한다. 실제로 컴포넌트를 렌더링하는 코드는 생략했다.
            };
        })();
        // useState를 쓸 때마다 index를 하나씩 추가한다. 이 index는 setState에서 사용된다.
        // 즉, 하나의 state마다 index가 할당돼 있어 그 index가 배열의 값(global.states)을
        // 가리키고 필요할 때마다 그 값을 가져오게 한다.
        index = index + 1;

        return [currentState, setState];
    }

    function Component() {
        const [value, setValue] = useState(0);
        // ...
    }
})();
```

작동 자체만 구현했을 뿐, 실제 구현체와는 차이가 있다. 실제 리액트 코드에서는 useReducer를 이용해 구현돼 있다. useReducer와 useState는 크게 다르지 않은데 이후에 설명한다.

여기서 함수의 실행이 끝났음에도 함수가 선언된 환경을 기억할 수 있는 방법은 바로 1장에서 소개한 [클로저]다.

매번 실행되는 함수 컴포넌트 환경에서 state의 값을 유지하고 사용하기 위해서 리액트는 클로저를 활용하고 있다. 에제의 경우 MyReact라고 불리는 클로저 내부에 useState와 관련된 정보를 저장해 두고, 이를 필요할 떄마다 꺼내놓는 형식으로 구성돼 있다.

-   실제 리액트 내부에서 훅은 어떻게 구성돼 있을까요?
    이에 대한 정보를 알려면 리액트 깃허브 저장소를 참고해야 하는데, 훅에 대한 구현체를 타고 올라가다 보면 \_\_SELECT_INTERNALS_DO_NOT_OR_YOU_WILL_BE_FIRED라는 문구를 마주하게 된다.

이렇게 변수명을 무섭게 지은 이유는 일반 사용자의 접근을 차단하고, 나아가 실제 프로덕션 코드에서 사용하지 못하게 하기 위함으로 보인다. 실제로 여기에 접근하는 것을 리액트 팀에서도 권장하지 않는다. 이 변수에는 ReactSharedInternals라 불리는 내부 객체가 저장돼 있는 것으로 추정된다.

## \_\_SELECT_INTERNALS_DO_NOT_OR_YOU_WILL_BE_FIRED는 리액트의 버전 관리 대상에서도 제외돼 있고, 앞서 언급한 것처럼 외부 사용자가 사용하거나 참고하는 것을 권장하지 않아 정확한 구현은 알기 어렵다. 대신 이번 장에서 훅에 대한 예제는 Preact의 구현을 기준으로 한다. Preact는 리액트의 경량화 버전으로, 대부분의 API를 지원하고 있으며 리액트보다 가볍다는 장점이 있으며 무엇보다 모든 코드를 명확하게볼 수 있다.

이렇듯 useState는 자바스크립트의 특징 중 하나인 클로저에 의존해 구현돼 있을 것이라는 사실을 짐작해 볼 수 있다. 클로저를 사용함으로써 외부에 해당 값을 노출시키지 않고 오직 리액트에서만 쓸 수 있었고, 함수 컴포넌트가 매번 실행되더라도 useState에서 이전의 값을 정확하게 꺼내 쓸 수 있게 되었다.

## 게으른 초기화
