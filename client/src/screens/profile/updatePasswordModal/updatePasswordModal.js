import React from "react";
import Modal from "../../../components/modal/modal";
import InputField from "../../../components/inputField/inputField";
import Button from "../../../components/button/button";

const UpdatePasswordModal = ({
    close, passwordData, setPasswordData, handlePasswordUpdate
}) => {
    return (
        <Modal close={close}>
            <h1>Password Change</h1>
            <InputField label="Password *" type="password" id="password"
                        name="password" value={passwordData?.password}
                        onChange={(e) => setPasswordData({
                            ...passwordData,
                            password: e.target.value
                        })} autoFocus />
            <InputField label=" Confirm Password *" type="password"
                        id="password2"
                        name="password2" value={passwordData?.password2}
                        onChange={(e) => setPasswordData({
                            ...passwordData,
                            password2: e.target.value
                        })} />
            <Button onClick={() => handlePasswordUpdate()}
                    className="submit" label="Submit"
                    style={{ width: "260px", marginTop: "16px" }}
                    disabled={!passwordData?.password ||
                    passwordData?.password === "" || !passwordData?.password2 ||
                    passwordData?.password2 === ""} />
        </Modal>
    );
};

export default UpdatePasswordModal;