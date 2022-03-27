import React from "react";
import InputField from "../../../components/inputField/inputField";

const UpdateDetails = ({ data, setData }) => {
    const style = { marginLeft: "10px", width: "70%" };

    return (
        <>
            <InputField label="First Name" type="text" id="firstName"
                        name="firstName" value={data?.firstName}
                        onChange={(e) => setData(
                            { ...data, firstName: e.target.value })}
                        style={style} />
            <InputField label="Last Name" type="text" id="lastName"
                        name="lastName" value={data?.lastName}
                        onChange={(e) => setData(
                            { ...data, lastName: e.target.value })}
                        style={style} />
            <InputField label="Email *" type="email" id="email"
                        name="email" value={data?.email}
                        onChange={(e) => setData(
                            { ...data, email: e.target.value })}
                        style={style} /></>
    );
};

export default UpdateDetails;