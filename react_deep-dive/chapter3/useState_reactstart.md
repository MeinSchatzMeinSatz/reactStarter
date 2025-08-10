# useState

1. 컴포넌트에 데이터의 '상태'를 반영해 봅시다.

```javascript
function Resume(props) {
    let like = 0;

    function clickLike() {
        like += 1;
        console.log(like);
    }

    const myColor = props.color;
    const styleColor = {color.myColor};

    return(
        <div style={{border:"solid 1px", width: "500px"}}>
            <h1>{props.name} 자기소개서</h1>
            <h1>{props.hello}</h1>
            <h2>취미: {props.hobby}</h2>
            <h2>좋아하는 음식: {props.food}</h2>
            <h2>좋아하는 색 : <span style={styleColor}>{myColor}</span></h2>
            <button onClick={clickLike}>like <span>{like}</span></button>
            </div>
    )
}

export default Resume;
```

like 버튼을 누를 때마다 만들어둔 변수가 변하는 것을 개발자 도구를 켜보시면 볼 수 있습니다. 하지만 like의 숫자는 변하지 않는 것을 알 수 있습니다.

변수의 값이 바뀌어도 페이지는 랜더링하지 않기 때문인데요. `모든 변수가 변할때마다 컴포넌트를 업데이트 한다면 많은 리소스가 낭비`될 것입니다.

그래서 `특정 변수를 지정하여 그 변수가 변할 때마다 컴포넌트를 업데이트하라는 명령`을 내려주어야 합니다.

useState를 통해 상태를 변경하면, 리액트는 해당 컴포넌트의 재랜더링을 예약합니다. 재랜더링을 하게 될때 리액트는 useState 이전과 이후의 모습을 서로 비교합니다.

이를 `재조정(reconciliation)`을 거친다고 표현합니다.

reconciliation은 양자를 서로 비교 대조해서 차이를 없애고 같은 값이 되도록 하는 과정을 의미하는 회계용어 입니다. 혹은 종교에서 고해성사를 의미하기도 합니다.

React의 재조정은 Virtual DOM을 사용하여 React 컴포넌트 트리를 비교하고 최적화하는 프로세스입니다. React는 컴포넌트가 업데이트될 때마다 Virtual DOM을 사용하여 이전 버전의 컴포넌트 트리와 새 버전의 컴포넌트 트리를 비교합니다.

reconciliation 프로세스는 이전 버전의 컴포넌트 트리와 새 버전의 컴포넌트 트리를 비교하여 다음과 같은 작업을 수행합니다.

1. 컴포넌트의 타입이 같은지 비교합니다.
2. 컴포넌트의 속성(props)이 변경되었는지 비교합니다.
3. 컴포넌트의 자식 요소가 변경되었는지 비교합니다.

이러한 비교 작업을 통해 React는 변경된 부분만 업데이트하고, 나머지 부분은 그대로 유지합니다. 이렇게 하면 React는 DOM 조작을 최소화하고 더 빠르고 효율적인 애플리케이션을 만들 수 있습니다.

정리하자면, reconciliation 프로세스를 통해 React는 컴포넌트를 업데이트하여 즉각적으로 반응하는 사용자 인터페이스를 만들 수 있습니다. 이것이 바로 React가 다른 프론트엔드 라이브러리와 차별화되는 중요한 기능 중 하나입니다.

2. useState 사용해보기

변수의 값이 변경될 때마다 페이지를 업데이트 하도록 만들어주는 것이 useState입니다.

```javascript
import React, { useState } from "react";

function Resume(props) {
    const [like, setLike] = useState(0);
    // console.log(useState(0));

    const myColor = props.color;
    const styleColor = { color: myColor };
    return (
        <div style={{ border: "solid 1px", width: "500px" }}>
            <h1>{props.name} 자기소개서</h1>
            <h1>{props.hello}</h1>
            <h2>취미 : {props.hobby}</h2>
            <h2>좋아하는 음식 : {props.food}</h2>
            <h2>
                좋아하는 색 : <span style={styleColor}>{myColor}</span>
            </h2>
            <button onClick={clickLike}>
                like <span>{like}</span>
            </button>
        </div>
    );
}
export default Resume;
```

먼저 useState를 React에서 import 하기 위해 import 구문에 `{useState}`를 추가합니다.

useState를 실행하면 state 변수와 state변수의 상태를 바꿔줄 수 있는 함수가 반환됩니다. 그러면 구조 분해 할당 문법을 이용해 like와 setLike에 변수와 함수를 할당하게 됩니다. 꼭 구조분해할당을 사용할 필요는 없지만 관습으로 사용합니다.

useState의 괄호 안에는 초기값을 넣을 수 있습니다. 0을 넣게 되면 like의 초기값은 0이고, ""를 넣게 되면 like의 초기값은 ""가 됩니다.

아래 코드를 보면 like는 0으로 초기화되어 있는 값이고, setLike는 like값을 변경하기 위한 함수임을 알 수 있습니다.

```javascript
const [like, setLike] = useState(0);
```

useState를 사용하게 되면 setState를 통해 값이 변경될 때 리액트는 자동으로 해당 컴포넌트를 다시 랜더링해줍니다.

리액트는 어떤 상태(state)가 변경되면 그 부분을 다시 렌더링하는 특징이 있기 때문에 화면에서 계속 바뀌는 부분은 대부분 state를 사용합니다. 또한 다시 랜더링 할 필요가 없는 데이터는 useState를 사용하지 않음으로 자원을 아낄 수 있습니다.

예시- 클릭 이벤트가 일어날 때마다 좋아요 숫자가 바뀌는 것, 데이터가 바뀔 때마다 바뀐 데이터를 보여주는 것.

```javascript
import React, { useState } from "react";

function Resume(props) {
    const [like, setLike] = useState(0);

    function clickLike() {
        // +1 은 기존의 like 값과 1을 더해 새로운 값을 반환하는것이고
        // ++ 변수의 값 자체를 직접적으로 변경하려는 시도입니다.
        setLike(like + 1);
    }

    const myColor = props.color;
    const styleColor = { color: myColor };

    return (
        <div style={{ border: "solid 1px", width: "500px" }}>
            <h1>{props.name} 자기소개서</h1>
            <h1>{props.hello}</h1>
            <h2>취미 : {props.hobby}</h2>
            <h2>좋아하는 음식 : {props.food}</h2>
            <h2>
                좋아하는 색 : <span style={styleColor}>{myColor}</span>
            </h2>
            <button onClick={clickLike}>like</button> <span>{like}</span>
        </div>
    );
}

export default Resume;
```
