# useRef

useRef는 순수 자바스크립트 객체를 생성합니다. 값의 접근은 refContainer.current로 할 수 있습니다.

```javascript
const refContainer = useRef(initialValue);
```

useRef는 크게 2가지로 사용이 됩니다.

1. 렌더링과 상관없이 값을 변경하고 싶을 때 useRef를 사용합니다. 다시 렌더링 되어도 그 값은 변하지 않습니다.
2. 또한 컴포넌트 태그(tag)에 직접 접근하고 싶을 떄 useRef를 사용합니다. 자바스크립트에서 DOM element를 가지고 올 때 querySelector나 getElementById를 사용하지만 React에서는 useRef를 사용합니다.

이때 useRef를 사용하여 useRef가 접근한 태그 요소의 값을 바꿀 때는 리렌더링을 발생시키지 않는다는 것을 기억해야합니다. 데이터, state와 상관없이(리렌더링 하지 않고) component에 DOM을 제어하고 싶을 때 ref를 사용합니다.

Ref는 남용하지 않습니다. 먼저 ref를 사용하지 않고도 다른 기능을 사용하여서 구현할 수 있는지 고려한 후 사용하세요.

React에서도 return 문에 있는 요소들에게 id값을 주고 선택자 함수를 사용해도 좋지만(기존 자바스크립트 방식), React에 가장 큰 장점인 재사용성을 생각한다면 사용을 권장하지 않습니다.

컴포넌트를 재사용할 경우 동일한 id 값을 가진 요소가 생기기 때문입니다. 재사용 안한다 하더라도 직접 id를 사용하는 경우 중복의 경우가 생길 수 있습니다.

`그래서 id를 사용하는 대신 ref를 사용합니다.` ref는 전역으로 작동하지 않고 컴포넌트 내부에서만 작동하기 떄문입니다.(재사용할 때 컴포넌트지만 다르게 작동합니다.) 만약 id를 사용하고자 한다면 컴포넌트를 만들 때마다 id 뒷부분에 id name을 추가하여 유니크한 id로 만들어줘야 합니다.

## useRef와 다른 변수들의 차이

```javascript
import React, { useState, useEffect, useRef } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const [countTwo, setCountTwo] = useState(0);
    let countThree = useRef(0);
    let coutFour = 0;
    console.log(countThree);

    // 랜더링 됨
    const handleCountUp = (e) => {
        setCount(count + 1);
        console.log(count); // 비동기 -> useEffect로 추적하면 동기 가능
    };

    // 랜더링 됨
    const handleCountUpTwo = (e) => {
        setCountTwo(countTwo + 1);
        console.log(countTwo); // 비동기 -> useEffect로 추적하면 동기 가능
    };
    // 클릭하면 변수의 값은 증가하지만 랜더링은 되지 않음
    const handleCountUpThree = (e) => {
        countThree.current = countThree.current + 1;
        console.log(countThree.current);
    };
    // 렌더링 안되고 다른 state가 변해서 재랜더링 되어도 0으로 초기화
    const handleCountUpFour = (e) => {
        countFour = countFour + 1;
        console.log(countFour);
    };

    useEffect(() => {
        console.log("count가 감시되고 있습니다.");
        console.log(`감시된 변수 : ${count}`);
    }, [count]); // count가 변경되는 것을 감시

    return (
        <>
            <div>{count}</div>
            <button onClick={handleCountUp}>up!</button>
            <div>{countTwo}</div>
            <button onClick={handleCountUpTwo}>up!</button>
            <div>{countThree}</div>
            <button onClick={handleCountUpThree}>up!</button>
            <div>{countFour}</div>
            <button onClick={handleCountUpFour}>up!</button>
        </>
    );
}

function App() {
    return (
        <div>
            <Counter />
        </div>
    );
}

export default App;
```

-> 클릭하면 변수의 값은 증가하지만 렌더링은 되지 않음

## useRef를 사용하지 않은 방식

여러가지 시도를 해보세요. 아래 주석된 것을 풀고 진행해보시면 error가 나오는데요. 경고메시지도 한 번 확인해보시길 권해드립니다. 영상에서는 경고가 없는 완성된 코드만을 설명합니다.

```javascript
import React, { useState } from "react";

const App = () => {
    const [emailValue, setEmailValue] = useState(""); // email state 값
    const [pwValue, setPwValue] = useState(""); // pw state 값

    const inputCheck = (e) => {
        e.preventDefault();
    };

    return (
        <form style={{ display: "flex", flexDirection: "column" }}>
            <label>
                이메일 : <input type="email" />
            </label>
            <label>
                비밀번호 : <input type="password" />
            </label>

            <button
                type="submit"
                style={{ width: "100px" }}
                onClick={inputCheck}
            >
                로그인
            </button>
            <span>입력한 이메일 : {emailValue}</span>
            <span>입력한 비밀번호 : {pwValue}</span>
        </form>
    );
};

export default App;
```

## useRef 사용해 봅시다!

1. 이메일 input과 비밀번호 input의 입력이 완료된 후 로그인 버튼을 누르면 span 부분에 입력했던 이메일과 비밀번호를 보여주려고 합니다.

button에서 이벤트가 발생하면 inputCheck에서 비밀번호와 이메일의 값을 받아와서 setEmailValue, setPwValue를 실행해줘서 상태값을 변경해주면 됩니다.

```javascript
import React, { useState } from "react";

const App = () => {
    const [emailValue, setEmailValue] = useState("") // email state 값
    const [pwValue, setPwValue] =useState(""); // pw state 값

    const inputCheck = (e) => {
        e.preventDefault();
    };

    return (
        <form style={{display: "flex", flexDirection: "column"}}>
            <label>
            이메일: <input type="email">
            </label>
            <label>
            비밀번호: <input type="password">
            </label>

            <button type="submit" style={{width: "100px"}} onClick={inputCheck}>
            로그인
            </button>
            <span>입력한 이메일 : {emailValue}</span>
            <span>입력한 비밀번호 : {pwValue}</span>
        </form>
    )
}

export default App;
```

이때 input의 값을 가져올 때 useRef를 사용합니다. useRef를 사용하기 위해 아래 코드를 추가해 봅시다.

```javascript
import React, { useState, useRef } from "react";
```

App 컴포넌트 안에 useRef를 생성해줍니다.

```javascript
const emailInput = useRef(null); // email input
const pwInput = useRef(null); // pw input에 대한 useRef
```

생성한 useRef 값을 받아오고 싶은 태그에게 ref props로 전달해줍니다.

```javascript
<label>
    이메일 : <input type="email" ref={emailInput}>
</label>
<label>
    비밀번호 : <input type="password" ref={pwInput}>
</label>
```

로그인 버튼을 클릭했을 때 실행할 inputCheck에서 emailInput과 pwInput을 출력해 봅시다.

이제 useRef.current.value를 사용하면 input태그들의 값들을 가져올 수 있습니다. email와 pw값을 useState를 사용해서 상태 값을 바꿔줍니다.

```javascript
const inputCheck = (e) => {
    e.preventDefault();
    console.log(emailInput);
    console.log(pwInput);
    setEmailValue(emailInput.current.value);
    setPwValue(pwInput.current.value);
};
```

```javascript
import React, { useRef, useState } from "react";

const App = () => {
    const emailInput = useRef(null); // email input에 대한 useRef
    const pwInput = useRef(null); // pw Input에 대한 useRef

    const [emailValue, setEmailValue] = useState(""); // email state값
    const [pwValue, setPwValue] = useState(""); // pw state 값

    const inputCheck = (e) => {
        e.preventDefault();
        setEmailValue(emailInput.current.value);
        setPwValue(pwInput.current.value);
    };

    return (
        <form style={{ display: "flex", flexDirection: "column" }}>
            <label>
                이메일 : <input type="email" ref={emailInput} />
            </label>
            <label>
                비밀번호 : <input type="password" ref={pwInput} />
            </label>

            <button
                type="submit"
                style={{ width: "100px" }}
                onClick={inputCheck}
            >
                회원가입
            </button>
            <span>{emailValue}</span>
            <span>{pwValue}</span>
        </form>
    );
};

export default App;
```

2. 이메일 input이나 비밀번호 input의 입력이 완료되지 않은 채 로그인 버튼을 누르면 입력되지 않은 input 태그에 focus해보록 합시다.

useRef가 가리키는 태그에 이벤트를 줄 때는 current 다음에 이벤트를 작성해주면 됩니다. inputCheck 함수 안에서 작성해 주세요.

```javascript
if (emailInput.current.value === "") {
    alert("이메일을 입력해주세요");
    emailInput.current.focus();
    return; // if, else 문에 들어오게 되면 setState 실행 없이 바로 return
} else if (pwInput.current.value === "") {
    alert("비밀번호를 입력해주세요");
    pwInput.current.focus();
    return;
}
```

```javascript
import React, { useRef, useState } from "react";

const App = () => {
    const emailInput = useRef(null); // email input에 대한 useRef
    const pwInput = useRef(null); // pw input에 대한 useRef

    const [emailValue, setEmailValue] = useState(""); // email state 값
    const [pwValue, setPwValue] = useState(""); // pw state 값

    const inputCheck = (e) => {
        e.preventDefault();
        if (emailInput.current.value === "") {
            alert("이메일을 입력해주세요");
            emailInput.current.focus();
            return;
        } else if (pwInput.current.value === "") {
            alert("비밀번호를 입력해주세요");
            pwInput.current.focus();
            return;
        }
        setEmailValue(emailInput.current.value);
        setPwValue(pwInput.current.value);
    };

    return (
        <form style={{ display: "flex", flexDirection: "column" }}>
            <label>
                이메일 : <input type="email" ref={emailInput} />
            </label>
            <label>
                비밀번호 : <input type="password" ref={pwInput} />
            </label>

            <button
                type="submit"
                style={{ width: "100px" }}
                onClick={inputCheck}
            >
                회원가입
            </button>
            <span>{emailValue}</span>
            <span>{pwValue}</span>
        </form>
    );
};

export default App;
```

그렇지만 모든 결과를 다 저장하면 메모리 낭비가 되기 때문에 주의해주시기 바랍니다.
