import Request from "./index";

class UsersApi {
    static getUsers() {
        return Request.get("/users");
    }

    static getUserById(id) {
        return Request.get(`/users/${id}`);
    }

    static updateUser(id, data) {
        return Request.patch(`/users/${id}`, data);
    }

    static updatePassword(id, data) {
        console.log(data);
        return Request.patch(`/users/password/${id}`, data);
    }

    static deleteUser(id) {
        return Request.delete(`/users/${id}`);
    }
}

export default UsersApi;