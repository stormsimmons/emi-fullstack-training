import * as http from 'axios';
export class TodoService {

    getAll = async () => {
        return await http.default.get(`${process.env.apiUrl}/todo`, this.getOptions())
    }

    delete = async (id) => {
        return await http.default.delete(`${process.env.apiUrl}/todo/${id}`, this.getOptions())
    }

    update = async (todo) => {
        return await http.default.put(`${process.env.apiUrl}/todo`, todo ,this.getOptions())
    }

    add = async (todo) => {
        return await http.default.post(`${process.env.apiUrl}/todo`, todo ,this.getOptions())
    }

    getAllByUser = async (username) => {
        return await http.default.get(`${process.env.apiUrl}/todo/user/${username}`, this.getOptions())
    }

    getOptions() {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        };
    }

}