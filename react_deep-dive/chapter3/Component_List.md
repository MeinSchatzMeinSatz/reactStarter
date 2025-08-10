# 컴포넌트 리스트의 필요성

```javascript
function App() {
    return <Hello name="licat" />;
}

function Hello(props) {
    const name = props.name;
    return (
        <div>
            <h1>안녕, {name} 1호</h1>
        </div>
    );
}

export default App;
```

한 번에 수 많은 데이터가 존재한다면 어떨까요? 만약 10호까지 있다면 아래와 같이 코드를 작성할 수 있습니다. 하지만 이런 방식은 같은 코드를 반복하여 작성해야 합니다.

```javascript
function App() {
    return <Hello name="licat" />;
}

function Hello(props) {
    const name = props.name;

    return (
        <div>
            <h1>안녕, {name} 1호</h1>
            <h1>안녕, {name} 2호</h1>
            <h1>안녕, {name} 3호</h1>
            <h1>안녕, {name} 4호</h1>
            <h1>안녕, {name} 5호</h1>
            <h1>안녕, {name} 6호</h1>
            <h1>안녕, {name} 7호</h1>
            <h1>안녕, {name} 8호</h1>
            <h1>안녕, {name} 9호</h1>
            <h1>안녕, {name} 10호</h1>
        </div>
    );
}

export default App;
```

## 컴포넌트 리스트 만들기

스타일을 반영하지 않고 단순히 1호에서 10호까지의 결과를 나타낸 컴포넌트 리스트를 만들어 보도록 하겠습니다. map함수를 이용해 봅시다!

-   map() 메서드는 리스트 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다. [리스트].map((i)=> {return 로직})

```javascript
function App() {
    return (
        <Hello name='licat'/>
    );
}

function Hello(props) {
    const name = props.name;
    const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 1~10호를 만들 것입니다.

    // list map을 이용하여 h1 태그들의 리스트를 만듭니다.
    const numComponentsArray = num.map((i) => <h1>안녕, {name} {i}호</h1);

    return (
        <div>
        {numComponentsArray}
        </div>
    )
}

export default App
```

코드를 실행하면 아래와 같이 우리가 원하던 결과를 얻을 수 있습니다.

하지만 개발자 도구를 보면 경고가 뜬 모습을 확인할 수 있습니다. "리스트 각 요소가 고유한 key값을 가지지 않았다."라는 경고 메세지입니다. key값을 넣어주지 않았기 때문에 에러가 발생한 것입니다. 컴포넌트 안에서 리스트를 렌더링할 떄는 꼭 key값을 넣어줘야 합니다.

키값을 넣어주는 이유는 리엑트에서 랜더링 작업을 진행했을 때 어떤 요소에 변동이 있다면 그 요소만 새로 그려주기 위함입니다. key가 없다면 하나의 요소가 변경이 되어도 array에 담긴 요소를 모두 다시 그려줍니다.

key 값은 일반적으로 배열의 id 값을 넣어줍니다. 고유의 값을 찾을 수 없다면 인덱스를 key로 사용하면 되지만 단순히 에러를 제거하기 위한 미봉책일 뿐 권장하지 않습니다.
