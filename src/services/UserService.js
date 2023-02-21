import axios from 'axios';

const USERS_ENDPOINT = 'http://localhost:8080/user/users';

class UserService {
    getUsers() {
        return axios.get(USERS_ENDPOINT);
    }

    createNewUser(user) {
        return axios.post(USERS_ENDPOINT, user);
    }
}

export default new UserService();