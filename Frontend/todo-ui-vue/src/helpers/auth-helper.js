import jwtDecode from "jwt-decode";
import AppContext from "../app-context"
export class AuthHelper {
    
    static authenticate(to ,from, next ){
        let token = localStorage.getItem("accessToken");

        if (!token) {
          return next("/login");
        }
    
        var decoded = jwtDecode(token);
        AppContext.userName = decoded.user_name

        if (decoded.exp > Math.round((new Date()).getTime() / 1000)) {
          return next(true);
        }

        localStorage.removeItem("accessToken");
        return next("/login");
    }

}