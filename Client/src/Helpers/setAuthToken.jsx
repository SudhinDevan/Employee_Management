import axios from 'axios';

const setAuthToken = token => {
    if(token){
        axios.defaults.header.common["Authorization"]=`Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setAuthToken

