# React Event

리액트에서 이벤트 처리하는 방식에 대해서 알아보겠습니다. React 엘리먼트에서 이벤트 처리하는 방식은 DOM엘리먼트에서의 이벤트 처리하는 방식과 비슷하지만 다른점도 있습니다.

## 차이점

1. React의 이벤트는 카멜케이스를 사용합니다. / DOM의 이벤트는 소문자를 사용합니다.
2. JSX를 사용하여 함수로 이벤트 핸들러를 전달합니다. / DOM은 문자열로 이벤트 핸들러를 전달합니다.

```html
// DOM 엘리먼트 이벤트 처리
<body>
    <button onclick="addNumber()">Click me!</button>
    <script>
        function addNumber() {
            console.log("I'm button");
        }
    </script>
</body>
```

```javascript
// React 엘리먼트 이벤트 처리
function Resume(props) {
  const [like, setLike] = useState(0);

  function clickLike() {
    setLike(like + 1);
  }

  return (
    <button onClick={clickLike}>like</button> <span>{like}</span>
  );
}

export default Resume;
```

## 리액트에서 지원하는 이벤트 종류

-   onClick
-   onChange
-   onInput
-   onFocus
-   onMouseEnter
-   onMouseLeave

기타 (아래 첨부한 링크에서 더 많은 이벤트를 확인할 수 있습니다.)
https://ko.legacy.reactjs.org/docs/events.html#other-events
