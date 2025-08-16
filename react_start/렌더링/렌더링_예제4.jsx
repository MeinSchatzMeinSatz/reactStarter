// 게시판에 글 목록을 리스트로 렌더링하려고 합니다. 아래 배열을 받아서 제목만 순서대로 태그로 렌더링하세요.

const posts = [
  { id: 101, title: "리액트 기초", content: "리액트는 JS 라이브러리입니다." },
  { id: 102, title: "컴포넌트", content: "컴포넌트는 UI 조각입니다." },
];

function postTitles() {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
