import * as http from 'axios';
import { ApiUrl } from '../constants'
export class AuthService {

    signin = async (username, password) => {
        return await http.default.post(`${ApiUrl}/account/login`, { username: username, password: password })
    }

    register = async (user) => {
        return await http.default.post(`${ApiUrl}/user`, user)
    }
}