import React, { useState } from "react";
import "./button-group.css";

const ButtonGroup = ({ buttons, onButtonClick }) => {
    const [clickedId, setClickedId] = useState(0);

    const handleClick = (event, id) => {
        setClickedId(id);
        onButtonClick(id);
    };

    return (
        <>
            {
                buttons.map((buttonLabel, i) => (
                    <button 
                    key={i} 
                    name={buttonLabel} 
                    onClick={(event) => handleClick(event, i)}
                    className={i === clickedId ? "previousButton active" : "previousButton"}
                    >
                        {buttonLabel}
                    </button>
                ))
            }
        </>
    );
};

export default ButtonGroup;