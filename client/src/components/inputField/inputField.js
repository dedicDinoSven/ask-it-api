import React, { useState } from "react";

const InputField = (props) => {
    const [focus, setFocus] = useState({
        textarea: false, input: false
    });

    return (
        <div className="input-field-wrapper" style={props?.style}>
            <label htmlFor={`${props?.id}`}
                   className={focus ? "focused" : ""}>
                {props?.label}
            </label>
            {props?.type === "textarea" ?
                <textarea rows={props?.rows} cols={props?.cols} id={props?.id}
                          name={props?.name} value={props?.value}
                          onChange={props?.onChange}
                          disabled={props?.disabled ?? false}
                          autoFocus={props?.autoFocus ?? false}
                          onFocus={() => setFocus({ ...focus, textarea: true })}
                          onBlur={(e) => {
                              !e.target.value &&
                              setFocus({ ...focus, textarea: false });
                          }} /> :
                <input type={props?.type} id={props?.id} name={props?.name}
                       value={props?.value} onChange={props?.onChange}
                       disabled={props?.disabled ?? false}
                       autoFocus={props?.autoFocus ?? false}
                       onFocus={() => setFocus({ ...focus, input: true })}
                       onBlur={(e) => {
                           !e.target.value &&
                           setFocus({ ...focus, input: false });
                       }}
                      />
            }
        </div>
    );
};

export default InputField;