# UI 표현하기

이 장에서는 React 컴포넌트를 만들고, 사용자화하며, 조건부로 표시하는 방법에 대해서 알아봅시다.

## 첫 컴포넌트

React 애플리케이션은 컴포넌트라고 불리는 독립된 UI 조각들로 이뤄져있다. React 컴포넌트는 마크업을 얹을 수 있는 JS 함수이다.

컴포넌트는 버튼과 같이 값이 작을 수도 있고, 전체 페이지와 같이 큰 경우도 있다. 다음의 Gallery 컴포넌트는 세 개의 Profile 컴포넌트를 렌더링하고 있다.

```jsx
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

## 컴포넌트 Import 및 Export하기

하나의 파일에 많은 컴포넌트를 선언할 수 있지만, 파일이 커지면 탐색하기 어려워진다. 이를 해결하기 위해 컴포넌트를 별도의 파일로 만들어 export하고 다른 파일에서 해당 컴포넌트를 import할 수 있다.

## JSX로 마크업 작성하기

React 컴포넌트는 React가 브라우저에 렌더링하는 마크업을 포함할 수 있는 JS 함수이다. React 컴포넌트는 그 마크업을 표현하기 위해 JSX라는 확장된 문법을 사용한다. JSX는 HTML과 매우 유사하지만 조금 더 엄격하며 동적인 정보를 표시할 수 있다.

기존의 HTML 마크업을 React 컴포넌트에 그대로 붙여넣으면 동작하지 않을 수도 있다.

예시 에러
`Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? `

만약 만들어진 HTML 마크업이 있다면 converter를 사용하여 변환할 수 있다.

## JSX에서 중괄호를 이용하여 JavaScript 사용하기

JSX를 사용하면 JavaScript 파일에 HTML과 비슷한 마크업을 작성할 수 있어 렌더링 로직과 콘텐츠를 같은 곳에 둘 수 있다. 때로는 마크업 내부에 JavaScript 로직을 추가하거나 동적인 프로퍼티를 참조해야 하는 경우가 있다.

그럴떄! JSX에서 중괄호를 사용하여 JavaScript와 연결된 `창문을 열 수` 있다.

## 컴포넌트에 Props 전달하기

React 컴포넌트는 서로 통신하기 위해 props를 사용한다. 모든 부모 컴포넌트는 자식 컴포넌트에 props를 제공하여 정보를 전달할 수 있다. Props는 HTML 어트리뷰트와 유사해 보이지만 객체, 배열, 함수를 포함한 모든 JS값이 전달될 수 있다. 심지어 JSX도 가능하다.

```jsx
import { getImageUrl } from './utils.js'

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'Yfe0qp2'
        }}
      >
    </ Card>
  )
}

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}

function Card ({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  )
}
```
