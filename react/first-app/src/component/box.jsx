import React from "react";

const Box = (props) => {
    console.log(props);
    return (
        <div>
            {/* 코드의 재활용 */}
            <div className="box">
                Box{props.num}
                <p>{props.name}</p>
            </div>
        </div>
    );
};

export default Box;
