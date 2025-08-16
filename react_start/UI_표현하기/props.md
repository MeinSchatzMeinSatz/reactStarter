# 컴포넌트에 props 전달하기

React 컴포넌트는 props를 이용해 서로 통신한다. 모든 부모 컴포넌트는 props를 줌으로써 몇몇의 정보를 자식 컴포넌트에게 전달할 수 있다. props는 HTML 어트리뷰트를 생각나게 할 수도 있지만, 객체 배열, 함수를 포함한 모든 JavaScript 값을 전달할 수 있다.

[학습목표]

1. 컴포넌트에 props 전달하는 법
2. 컴포넌트에서 props를 읽는 방법
3. props의 기본값을 지정하는 법
4. 컴포넌트에 따라 JSX를 전달하는 방법
5. 시간에 따라 props가 변하는 방식

## 친숙한 props

`props`는 `JSX 태그에 전달하는 정보`이다. 예를 들어, className, src, alt, width, height는 <img> 태그에 전달할 수 있다.

```jsx
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return <Avatar />;
}
```

<img> 태그에 전달할 수 있는 props는 미리 정의되어 있다. (ReactDOM은 HTML 표준을 준수한다.) 자신이 생성한 <Avatar>와 같은 어떤 컴포넌트든 props를 전달할 수 있다. 방법은 다음과 같다.

## 컴포넌트에 props 전달하기

아래 코드에서 Profile 컴포넌트는 자식 컴포넌트인 Avatar에 어떠한 props도 전달하지 않는다.

```jsx
export default function Profile() {
  return <Avatar />;
}
```

다음 두 단계에 걸쳐 Avatar 에 props를 전달할 수 있다.

### 1단계: 자식 컴포넌트에 props 전달하기

먼저, Avatar에 몇몇 props를 전달한다.

```jsx
export default function Profile() {
  return (
    <Avatar person={{ name: "Lin Lanying", imageid: "1bX5QH6" }} size={100} />
  );
}
```

### 2단계: 자식 컴포넌트 내부에서 props 읽기

이러한 props는 function Avatar 바로 뒤에 있는 ({ 와 }) 안에 그들의 이름인 person, size 등을 쉼표로 구분함으로써 읽을 수 있다. 이렇게 하면 Avatar 코드 내에서 변수를 사용하는 것처럼 사용할 수 있다.

```jsx
import { getImageUrl } from "./utils.js";

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
      <Avatar
        size={80}
        person={{
          name: "Aklilu Lemma",
          imageId: "OKS67lh",
        }}
      />
      <Avatar
        size={50}
        person={{
          name: "Lin Lanying",
          imageId: "1bX5QH6",
        }}
      />
    </div>
  );
}
```

props를 사용하면 부모 컴포넌트와 자식 컴포넌트를 독립적으로 생각할 수 있다. 에를 들어, Avatar가 props를 어떻게 사용하는지 생각할 필요 없이 Propfile의 person 또는 size props를 수정할 수 있다. 마찬가지로 Profile을 보지 않고도 Avatar가 props를 사용하는 방식을 바꿀 수 있다.

`props는 조절할 수 있는 손잡이`다. props는 함수의 인수와 동일한 역할을 한다. 사실 props는 컴포넌트에 대한 유일한 인자다. React 컴포넌트 함수는 `인자`, 즉 `props` 객체를 받는다.

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

(?)
보통은 전체 props 자체를 필요로 하지는 않기에, 개별 props로 구조 분해 할당한다.

### 주의

props를 선언할 때 ( 및 ) 안에 { 및 } 쌍을 놓치지 말라.

```jsx
function Avatar({ person, size }) {
  // ...
}
```

이 문법을 "구조 분해 할당"이라고 부르며 함수 매개변수의 속성과 동등하다.

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

## prop의 기본값 지정하기

값이 지정되지 않았을 떄, prop에 기본값을 주길 원한다면, 변수 바로 뒤에 = 과 함께 기본값을 넣어 구조 분해 할당을 해 줄 수 있다.

```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

이제 <Avatar person={...} />가 size prop이 없이 렌더링 된다면, size는 100으로 설정된다.

이 `기본값`은 size prop이 없거나 size={undefined}로 전달될 때 사용된다. 그러나 size={null} 또는 size={0}으로 전달된다면, 기본값은 사용되지 않는다.

## JSX spread 문법으로 props 전달하기

때때로 전달되는 props는 반복적이다.

```jsx
function Profile({ person, size, inSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      >
    </div>
  )
}
```

반복적인 코드는 가독성을 높일 수 있다는 점에서 잘못된 것은 아니다. 하지만 때로는 간결함이 중요할 때도 있다. Profile이 Avatar에서 하는 것처럼, 일부 컴포넌트는 그들의 모든 props를 자식 컴포넌트에 전달한다.

props를 직접 사용하지 않기 때문에 보다 간결한 "spread" 문법을 사용하는 것이 합리적일 수 있다.

```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

이렇게 하면 Profile의 모든 props를 각각의 이름을 나열하지 않고 Avatar로 전달한다.

`spread 문법은 제한적으로 사용하라`
다른 모든 컴포넌트에서 이 구문을 사용한다면 문제가 있는 것이다. 이는 종종 컴포넌트들을 분할하여 자식을 JSX로 전달해야 함을 나타낸다.

더 자세히 알아보자.

## 자식을 JSX로 전달하기

내장된 브라우저 태그는 중첩하는 것이 일반적이다.

```jsx
<div>
  <img />
</div>
```

때로는 같은 방식으로 자체 컴포넌트를 중첩하고 싶을 때가 있다.

```jsx
<Card>
  <Avatar />
</Card>
```

JSX 태그 내에 콘텐츠를 중첩하면, 부모 컴포넌트는 해당 콘텐츠를 children 이라는 prop으로 받을 것이다. 예를 들어, 아래의 Card 컴포넌트는 <Avatar />로 설정된 children prop을 받아 이를 래퍼 div에 렌더링 할 것이다.
