// 로그인 또는 회원가입 폼 보여주기
function AuthForm({ isLogin }) {
  return (
    <div>
      {isLogin ? (
        <form action="">
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
          <button type="submit">로그인</button>
        </form>
      ) : (
        <form>
          <h2>회원가입</h2>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
          <input type="email" placeholder="이메일" />
          <button type="submit">회원가입</button>
        </form>
      )}
    </div>
  );
}

// 사용 예시
{
  /* <AuthForm isLogin={true} />
<AuthForm isLogin={false} /> */
}
