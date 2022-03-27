import React, { useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";

const Modal = (props) => {

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                props.close();
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [props]);

    const onWrapperClick = (e) => {
        if (props.close) props.close();

        e.stopPropagation();
    };

    return (
        <div className="modal-wrapper" onClick={onWrapperClick}
             style={props?.style}>
            <div className={"modal fadeIn " + props?.className}
                 onClick={(e) => e.stopPropagation()}>
                <FaTimesCircle className="close" onClick={() => {
                    props.close && props.close();
                }} />
                {props?.children}
            </div>
        </div>
    );
};
export default Modal;