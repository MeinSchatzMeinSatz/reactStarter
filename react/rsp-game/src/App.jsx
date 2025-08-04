import { useState } from "react";
import "./App.css";
import Rsp_box from "./component/rsp_box.jsx";

// 1. box 2개(타이틀, 사진, 결과)
// 2. 가위 바위 보 버튼이 있다.
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3, 4 의 결과를 가지고 누가 이겼는지 승패를 따진다.
// 6. 승패결과에 따라 테두리 색이 바뀐다.

const choice = {
    rock: {
        name: "Rock",
        img: "http://www.moklimart.com/files/2015/06/28.jpg",
    },
    scissors: {
        name: "Scissors",
        img: "https://cafe24.poxo.com/ec01/bibon1/jy78sT5iv9X+V5IHQBaKwrjoUZw7/nGXjx58SNFF4bK6NrHp9v6yW73e7/DyTNtncYBJmFI45IbmtzNo91A3rQ==/_/web/product/big/202101/833fa88eae073a583699cc737f0b8a91.jpg",
    },
    paper: {
        name: "Paper",
        img: "https://media.istockphoto.com/id/610580068/ko/%EB%B2%A1%ED%84%B0/%ED%88%AC%EB%AA%85-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B7%B8%EB%A6%BC%EC%9E%90%EA%B0%80-%EC%9E%88%EB%8A%94-%EB%B2%A1%ED%84%B0-a4-%ED%98%95%EC%8B%9D-%EC%9A%A9%EC%A7%80%EC%9E%85%EB%8B%88%EB%8B%A4.jpg?s=612x612&w=0&k=20&c=XC98lVXTd0k2pGQc9Mtuk2qVMAWddwxgd4dsubou_iY=",
    },
};

function App() {
    const [userSelect, setUserSelect] = useState(null);
    const [computerSelect, setComputerSelect] = useState(null);
    const [result, setResult] = useState(null);
    const [computerResult, setComputerResult] = useState(null);

    const play = (userChoice) => {
        setUserSelect(choice[userChoice]);
        let computerSelect = randomChoice();
        setComputerSelect(computerSelect);
        setResult(judgement(choice[userChoice], computerSelect));
        setComputerResult(judgement(computerSelect, choice[userChoice]));
    };

    const judgement = (user, computer) => {
        console.log("user", user, "computer", computer);

        // user == computer -> 비김
        // user == rock, computer == "scissors" user 이깄다.
        // user == "rock" computer == "paper" user 졌다.
        // user == scissors computer == paper user 이겼다.
        // user == scissors computer rock user 졌다.
        // user == paper computer rock user 이겼다.
        // user == paper computer scissors 졌다.

        if (user.name == computer.name) {
            return "비깄다.";
        } else if (user.name == "Rock")
            return computer.name == "Scissors" ? "이깄다." : "졌다.";
        else if (user.name == "Scissors")
            return computer.name == "Paper" ? "이깄다" : "졌다.";
        else if (user.name == "Paper")
            return computer.name == "Rock" ? "이깄다" : "졌다.";
    };

    const randomChoice = () => {
        let itemArray = Object.keys(choice);
        console.log("itemArray", itemArray);
        let randomItem = Math.floor(Math.random() * itemArray.length);
        console.log("randomValue", randomItem);
        let final = itemArray[randomItem];
        console.log("final", final);

        return choice[final];
    };

    return (
        <div className="total">
            <div className="main">
                <Rsp_box name="player" item={userSelect} result={result} />
                <Rsp_box
                    name="computer"
                    item={computerSelect}
                    result={computerResult}
                />
            </div>

            <div className="main">
                <button onClick={() => play("rock")}>✊🏻</button>
                <button onClick={() => play("scissors")}>✌🏻</button>
                <button onClick={() => play("paper")}>🖐🏻</button>
            </div>
        </div>
    );
}

export default App;
