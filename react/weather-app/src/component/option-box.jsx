import React from "react";

const OptionBox = ({ cities, setCity, getCurrentLocation }) => {
    console.log("cities", cities);

    return (
        <div className="btn_box">
            <button className="btn currentLocation" onClick={() => setCity("")}>
                현재 위치
            </button>

            {cities.map((item, index) => {
                return (
                    <button
                        key={index}
                        className="btn"
                        onClick={() => setCity(item)}
                    >
                        {item}
                    </button>
                );
            })}
        </div>
    );
};

export default OptionBox;
