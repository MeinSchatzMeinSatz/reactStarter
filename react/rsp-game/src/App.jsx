import { useState } from "react";
import "./App.css";
import Rsp_box from "./component/rsp_box.jsx";
import Result_box from "./component/button_box.jsx";

// 1. box 2개(타이틀, 사진, 결과)
// 2. 가위 바위 보 버튼이 있다.
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3, 4 의 결과를 가지고 누가 이겼는지 승패를 따진다.
// 6. 승패결과에 따라 테두리 색이 바뀐다.

function App() {
    return (
        <div>
            <Rsp_box name="player" img="" />
            <Rsp_box name="computer" img="" />

            <Result_box tool="✊🏻" />
            <Result_box tool="✌🏻" />
            <Result_box tool="🖐🏻" />
        </div>
    );
}

export default App;
