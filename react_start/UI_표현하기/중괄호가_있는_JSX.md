# 중괄호가 있는 JSX 안에서 자바스크립트 사용하기

JSX를 사용하면 JavaScript 파일에 HTML과 비슷한 마크업을 작성하여 렌더링 로직과 콘텐츠를 같은 곳에 놓을 수 있다.

때로는 JavaScript 로직을 추가하거나 해당 마크업 내부의 동적인 프로퍼티를 참조하고 싶을 수 있다. 이 상황에서는 JSX에서 중괄호를 사용하여 JavaScript를 사용할 수 있다.

[학습목표]

1. 따옴표로 문자열을 전달하는 방법
2. 중괄호가 있는 JSX 안에서 JavaScript 변수를 참조하는 법
3. 함수를 호출하는 법
4. 객체를 사용하는 법

## 따옴표로 문자열 전달하기

문자열 어트리뷰트를 JSX에 전달하려면 작은따옴표나 큰따옴표로 묶어야 한다.

```jsx
export defualt function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y.Zara"
      >
  )
}
```

여기에서는 "https://i.imgur.com/7vQD0fPs.jpg"와 "Gregorio Y. Zara"가 문자열로 전달되고 있다.

그러나 src 또는 alt를 동적으로 지정하려면 어떻게 해야 할까?

"" => {}로 바꾸기

이 방법을 통해 JavaScript의 값을 사용할 수 있다.

```jsx
export default function Avatar() {
  const avatar = "https://i.imgur.com/7vQD0fPs.jpg";
  const description = "Gregorio Y. Zara";
  return <img className="avatar" src={avatar} alt={description} />;
}
```

이미지를 둥글게 만드는 avatar CSS 클래스 이름을 지정하는 className="avatar" 와 avatar라는 변수의 값을 읽는 src={avatar} 의 차이점에 주목해야 한다. JavaScript를 사용할 수 있기 때문이다.

## 중괄호 사용하기: JavaScript 세계로 연결하는 창

JSX는 JavaScript를 작성하는 특별한 방법이다. 중괄호 { } 안에서 JavaScript를 사용할 수 있다. 아래 예시는 name을 선언한 다음 <h1> 내부에 중괄호로 포함한다.

```jsx
export default function TodoList() {
  const name = "Gregorio Y. Zara";
  return <h1>{name}'s To Do List</h1>;
}
```

### 중괄호를 사용하는 곳

JSX 안에서 중괄호는 두 가지 방법으로만 사용할 수 있다.

1. JSX 태그 안의 문자: <h1>{name}'s To Do List</h1>는 작동하지만, <{tag}>Gregorio Y. Zara's To Do List</{tag}>는 작동하지 않습니다.
2. = 바로 뒤에 오는 어트리뷰트: src={avatar}는 `avatar` 변수를 읽지만, `"{avatar}"`는 문자열을 전달한다.

## "이중 중괄호" 사용하기: JSX의 CSS와 다른 객체

- 객체를 전달할떄
- 인라인 스타일을 적용할 때(css를 객체로 전달하는 건가?)

JSX에는 문자열, 숫자 및 기타 JavaScript 표현식 뿐만 아니라 `객체`를 전달할 수도 있다. 또한 객체는 `{ name: "Hedy Lamarr", invention: 5 }`처럼 중괄호로 표시된다. 따라서 JSX에서 객체를 전달하려면 `person={{ name: "Hedy Lamarr", inventions: 5 }}`와 같이 중괄호 쌍으로 객체를 감싸야 한다.

JSX의 인라인 CSS스타일에서도 볼 수 있다. React에서 인라인 스타일을 사용할 필요가 없다. (CSS class는 대부분 잘 작동한다.) 그러나 인라인 스타일이 필요할 때 style 어트리뷰트에 객체를 전달해야 한다.

```jsx
export default function TodoList() {
  return (
    <ul
      style={{
        backgroundColor: "black",
        color: "pink",
      }}
    >
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

`JSX에서 {{ 와 }} 를 본다면 JSX 중괄호 안의 객체에 불과하다는 것을 알아야 합니다.`

주의!
인라인 style 프로퍼티는 캐멀 케이스로 작성된다. 예를 들어,
background-color -> backgroundColor

## JavaScript 객체와 중괄호에 대해서 '더' 알아보기

여러 표현식을 하나의 객체로 옮기고 중괄호 안의 JSX에서 참조할 수 있다.

```jsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return
    <div style={person.theme}>
      <hi>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
}
```

이 예시에서 person 객체는 name 문자열과 theme 객체를 포함합니다.

컴포넌트는 person 값을 아래와 같이 사용할 수 있다.

```jsx
<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
```

## 요약

이제 JSX 에 대한 거의 모든 것을 알게 되었다.

- 따옴표 안의 JSX 어트리뷰트는 문자열로 전달된다.
- 중괄호를 사용하면 JavaScript 논리와 변수를 마크업으로 가져올 수 있다.
- JSX 태그 내부 또는 어트리뷰트의 = 뒤에서 작동한다.
- {{ 및 }} 는 특별한 문법이 아니다. JSX 중괄호 안에 들어있는 JavaScript 객체이다.
