import React from "react";

const Rsp_box = (props) => {
    return (
        <div>
            <div className="box">
                <h1>{props.name}</h1>
                <img src={props.img} alt={props.name} />
                <p>{props.result}</p>
            </div>
        </div>
    );
};

export default Rsp_box;
