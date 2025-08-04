import React from "react";

const Rsp_box = (props) => {
    console.log("props", props);
    return (
        <div>
            <div className="box">
                <h1>{props.name}</h1>
                <img
                    className="box-img"
                    src={props.item && props.item.img}
                    alt={props.item && props.item.name}
                />
                <p>{props.result}</p>
            </div>
        </div>
    );
};

export default Rsp_box;
