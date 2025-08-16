// 댓글 목록 보여주기

const comments = [
    { id: 1, user: "alice", comment: "좋은 글 감사합니다!" },
    { id: 1, user: "bob", comment: "도움이 많이 되었어요." },
];

function CommentList() {
    return (
        <ul>
            {comment.map((c) => (
                <li key={c.id}>
                    <strong>{c.user}:</strong> {c.comment}
                </li>
            ))}
        </ul>
    );
}
