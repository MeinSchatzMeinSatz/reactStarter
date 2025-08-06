import React from "react";

const OptionBox = ({ imgs, setImg, cities, setCity, getCurrentLocation }) => {
    console.log("cities", cities);
    console.log("imgs", imgs);

    return (
        <div className="btn_box">
            <button
                className="btn currentLocation"
                onClick={() => {
                    setCity("");
                    setImg("");
                }}
            >
                현재 위치
            </button>

            {cities.map((item, index) => {
                return (
                    <button
                        key={index}
                        className="btn"
                        onClick={() => {
                            console.log("버튼 속 이미지", imgs[index]);
                            setCity(item);
                            setImg(`${imgs[index]}`);
                        }}
                    >
                        {item}
                    </button>
                );
            })}
        </div>
    );
};

export default OptionBox;
