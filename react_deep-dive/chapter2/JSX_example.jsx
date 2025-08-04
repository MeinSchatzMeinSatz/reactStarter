// 하나의 요소로 구성된 가장 단순한 형태
const ComponentA = <A>안녕하세요</A>;

// 자식이 없이 SelfClosingTag로 닫혀 있는 형태도 가능하다.
const ComponentB = <A />;

// 옵션을 { }와 전개 연산자로 넣을 수 있다.
const ComponentC = <A {...{ required: true }} />;

// 속성만 넣어도 가능하다.
const ComponentD = <A required />;

// 속성과 속성값을 넣을 수도 있다.
const ComponentE = <A required={false} />;

const ComponentF = (
    <A>
        {/* 문자열은 큰따옴표 및 작은따옴표 모두 가능하다. */}
        <B text="리액트" />
    </A>
);

const ComponentG = (
    <A>
        {/* 옵션의 값으로 JSXElement를 넣는 것 또한 올바른 문법이다. */}
        <B optionalChildren={<>안녕하세요.</>} />
    </A>
);

const ComponentH = (
    <A>
        {/* 여러 개의 자식도 포함할 수 있다. */}
        안녕하세요.
        <B text="리액트" />
    </A>
);
