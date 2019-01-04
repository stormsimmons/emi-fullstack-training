import * as http from 'axios';
export class AuthService {

    signin = async (username, password) => {
        return await http.default.post(`${process.env.apiUrl}/account/login`, { username: username, password: password })
    }

    register = async (user) => {
        return await http.default.post(`${process.env.apiUrl}/user`, user)
    }
}