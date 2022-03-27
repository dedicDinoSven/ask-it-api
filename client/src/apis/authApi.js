import Request from "./index";

class AuthApi {
    static register(data) {
        return Request.post("/users", data);
    }

    static login(data) {
        return Request.post("/login", data);
    }
}

export default AuthApi;