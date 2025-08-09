# useReducer

useReducer는 useState의 심화 버전으로 볼 수 있다. useState와 비슷한 형태를 띠지만 좀 더 복잡한 상태값을 미리 정의해 놓은 시나리오에 따라 관리할 수 있다. useReducer에서 사용되는 용어를 먼저 살펴보자.

-   반환값은 useState와 동일하게 길이가 2인 배열이다.

    -   state: 현재 useReducer가 갖고 있는 값을 의미한다. useState와 마찬가지로 배열을 반환하는데, 동일하게 첫 번째 요소가 이 값이다.
    -   dispatcher: state를 업데이트하는 함수, useReducer가 반환하는 배열의 두 번쨰 요소다. setState는 단순히 값을 넘겨주지만 여기서는 action을 넘겨준다는 점이 다르다. 이 action은 state를 변경할 수 있는 액션을 의미한다.

-   useState의 인수는 달리 2개에서 3개의 인수를 필요로 한다.
    -   reducer: useReducer의 기본 action 을 정의하는 함수다. 이 reducer는 useReducer의 첫 번째 인수로 넘겨주어야 한다.
    -   initialState: 두 번째 인수로, useReducer의 초깃값을 의미한다.
    -   init: useState의 인수로 함수를 넘겨줄 때처럼 초깃값을 지연해서 생성시키고 싶을 때 사용하는 함수다. 이 함수는 필수값이 아니며, 만약 여기에 인수로 넘겨주는 함수가 존재한다면 useState와 동일하게 게으른 초기화가 일어나며 initialState를 인수로 init함수가 실행된다.

useReducer에 대해 간단히 살펴봤으니 본격적으로 사용법에 대해 알아보자.

```javascript
// useReducer가 사용할 state를 정의
type State = {
    count: number
}

// state의 변화를 발생시킬 action의 타입과 넘겨줄 값(payload)을 정의
// 꼭 type과 playload라는 네이밍을 지킬 필요도 없으며, 굳이 객체일 필요도 없다.
// 다만 이러한 네이밍이 가장 널리 쓰인다.
type Action = { type: 'up' | 'down' | 'reset' ; payload? : State}

// 무거운 연산이 포함된 게으른 초기화 함수
function init(count: State): State {
    // count: State를 받아서 초깃값을 어떻게 정의할지 연산하면 된다.
    return count
}

// 초깃값
const initialState: State = { Count: 0 }

// 앞서 선언한 state와 action을 기반으로 state가 어떻게 변경될지 정의
function reducer(state: State, action: Action): State {
    switch (action, type) {
        case 'up':
            return { count: state.count + 1 }
        case 'down':
            return { count: state.count -1 > 0 ? state.count -1 : 0}
        case 'reset':
            return init(action.payload || { count -1 : 0 })
        default:
            throw new Error(`Unexpected action type ${action.type}`)
    }
}

export default function App() {
    const [state, dispatcher] = useReducer(reducer, initialState, init)

    function handleUpButtonClick() {
        dispatcher({type:'up'})
    }

    function handleUpButtonClick() {
        dispatcher({type:'down'})
    }

    function handleUpButtonClick() {
        dispatcher({type:'reset', payload: {count: 1}})
    }

    return (
        <div className='App'>
            <h1>{state.count}</h1>
            <button onClick={handleUpButtonClick}>+</button>
            <button onClick={handleDownButtonClick}>-</button>
            <button onClick={handleResetButtonClick}>reset</button>
        </div>
    )
}
```
