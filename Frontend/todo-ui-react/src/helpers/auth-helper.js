import jwtDecode from "jwt-decode";
import {AppSettings} from '../appsettings'
export class AuthHelper {
    
     authenticate(){
        let token = localStorage.getItem("accessToken");

        if (!token) {
          return false;
        }
    
        var decoded = jwtDecode(token);
        AppSettings.username = decoded.user_name

        if (decoded.exp > Math.round((new Date()).getTime() / 1000)) {
          return true;
        }

        localStorage.removeItem("accessToken");
        return false;
    }

}