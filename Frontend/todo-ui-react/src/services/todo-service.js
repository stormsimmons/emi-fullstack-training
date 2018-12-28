import * as http from 'axios';
import { ApiUrl } from '../constants'
export class TodoService {


    getAll = async () => {
        return await http.default.get(`${ApiUrl}/todo`, this.getOptions())
    }

    delete = async (id) => {
        return await http.default.delete(`${ApiUrl}/todo/${id}`, this.getOptions())
    }

    update = async (todo) => {
        return await http.default.put(`${ApiUrl}/todo`, todo ,this.getOptions())
    }

    add = async (todo) => {
        return await http.default.post(`${ApiUrl}/todo`, todo ,this.getOptions())
    }

    getAllByUser = async (username) => {
        return await http.default.get(`${ApiUrl}/todo/user/${username}`, this.getOptions())
    }

    getOptions() {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
    }

}