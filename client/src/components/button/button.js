import React from "react";

const Button = (props) => {
    return (
        <button onClick={props?.onClick} type={props?.type ?? "button"}
                className={`button-wrapper ${props?.className}`}
                style={props?.style} disabled={props?.disabled ?? false}>
            {props?.label}
        </button>
    );
};

export default Button;