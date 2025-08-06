## Component props 전달하기

One 컴포넌트에 props를 전달해보자.

```javascript
<Route path="/one" element={<One name="licat" />} />;

function One({ name }) {
    return <h1>{name} world1</h1>;
}
```

## Link

Link- preventDefault()와 같은 기능
React Router에서 제공하는 컴포넌트 중 하나로, 클릭하면 애플리케이션 내에서 새로운 경로로 이동하는 링크를 생성하는 컴포넌트다.

-   link는 주소만 바꿀 뿐, 페이지를 새로 불러오진 않는다.

### to

to 속성에는 접근할 경로가 들어간다. 문자열이나 객체의 형태로 경로를 넣어줄 수 있다.
문자열의 경우 html 태그의 <a>의 속성 href에 넣어주는 값처럼 절대 경로 또는 상대 경로를 문자열의 형태로 작성해주면 된다.

### 객체처럼 넣어줄 수도 있다.

-   pathname
-   search
-   state
-   hash

search 속성과 state 속성은 모두 정보를 전달하는 데 사용되지만, 그 방식과 용도에 중요한 차이가 있다.

1. 가시성
    - search: URL에 직접 표시된다.
    - state:: URL에 표시되지 않는다.
2. 데이터 크기
    - search: URL 길이 제한으로 인해 작은 양의 데이터만 전달가능하다.
    - state: 비교적 큰 객체도 전달할 수 있다.
3. 보안
    - search: URL에 노출되므로 민감한 정보를 포함해서는 안된다.
    - state: URL에 노축되지 않아 상대적으로 더 안전하다.
4. SEO
    - search: 검색 엔진이 인식할 수 있어 SEO에 영향을 줄 수 있다.
    - state: 검색 엔진에 의해 인식되지 않는다.
5. 사용 사례:
    - search: 필터링, 정렬, 페이지네이션 등 페이지 상태를 표현할 때 주로 사용.
    - state: 페이지 간 전환 시 복잡한 객체나 일시적인 데이터를 전달할 때 사용한다.

#### a 태그를 사용하지 않고 link 를 사용하는 이유?

a태그는 클릭했을 경우, href에서 설정해준 경로 이동과 동시에 페이지를 '새로' 불러오기 때문에 페이지가 새로고침이 된다.

반면, react-router-dom이 제공하는 link의 경우 HTML5 History API를 사용해서 브라우저의 주소를 바꿔주는 것이기 때문에 페이지를 불러오지 않고 dom만 조작해서 페이지를 보여준다.

## 파라미터 설정

/:id 는 동적 라우팅을 위해 사용되는 URL 패턴이다.

useLocation 혹은 현재 애플리케이션의 경로(location) 정보를 가져오는 데 사용된다. 이 훅을 사용하면 현재 URL의 경로, 쿼리 파라미터, 해시 등을 포함하는 객체를 반환하여 관련된 정보를 파악할 수 있게 된다.

이 두 가지 정보를 결합하여 같은 컴포넌트를 불러와도 다른 모습으로 변경하는 것이 가능하다. 마치 컴포넌트에 props를 전달하여 변화를 주는 것과 같다고 보면 된다.

```javascript
function Blog() {
    const location = useLocation();
    console.log(location);
    return <h1>hello Blog</h1>;
}
```

아래와 같이 파라미터만 잘라내주는 훅을 사용해도 된다.

```javascript
// 파라미터 사용 예1
const location = useLocation();
const path = location.pathname.split("/")[2];

// 파라미터 사용 예2
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
const { id } = useParams();
```

## 중첩된 Router

중첩된 URL 구조를 아래와 같이 구현할 수 있다. 아래 URL 주소로 접속할 수 있다.

...

중첩된 라우트는 부모 라우트와 자식 라우트로 나뉘며, <Outlet /> 컴포넌트를 통해 부모 라우트 내에서 자식 라우트의 컴포넌트가 렌더링될 위치를 지정한다.

index 속성은 /three 경로에 정확히 일치할 때 default로 렌더링 될 컴포넌트를 지정한다.

### 결론

조건을 통한 렌더링 => URL 주소의 데이터를 통해 대체

결론적으로 React Router를 이용하는 이유는, 조건을 통한 컴포넌트의 렌더링을 URL 주소의 데이터를 통해 대체하는데 있다.

#### React Router를 사용하는 주요 이유.

1. URL 기반 렌더링
   URL 주소를 기반으로 컴포넌트를 렌더링함으로써, 복잡한 조건문 없이도 애플리케이션의 다양한 '페이지'나 상태를 표현할 수 있다.
2. 딥 링킹 지원
   애플리케이션의 특정 상태나 '페이지'에 직접 링크할 수 있게 해준다. 이는 웹 애플리케이션을 더 공유하기 쉽고 검색 엔진에 친화적으로 만든다.
3. 중첩 라우팅
   복잡한 UI 구조를 URL 구조와 일치시켜 표현할 수 있다.
