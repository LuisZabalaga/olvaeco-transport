import axios from "axios";

// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = 'http://127.0.0.1:8000/api/';

//Obteniendo Token desde localStorage
function getAccessToken() {
    // const accessToken = window.localStorage.getItem("userCredentials") //Reactivar Linea
    const accessToken = window.localStorage.getItem("token")
    return accessToken;
}

const apiInstance = axios.create({
    baseURL,
    headers: {
        // "Content-Type": "multipart/form-data",
        // "Accept": "application/json"
        "Content-Type": "application/json"        
    },
});

apiInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            // config.headers.Authorization = `Bearer ${JSON.parse(token).token}` //Reactivar Linea
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

apiInstance.interceptors.response.use(
    (res) => {
        return res;
    }, 
    async (err) => {
        console.log("ERROR",err)
        const originalConfig = err.config;
        if(err.response) {

            //If Token was expired
            if(err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    // const rs = await getRefreshToken();
                    // const { accessToken } = rs;
                    // window.localStorage.setItem("userCredentials", accessToken);
                    // apiInstance.headers.Authorization = `Bearer ${JSON.parse("userCredentials").token}`
                    // return apiInstance(originalConfig);
                    
                    // window.localStorage.removeItem('userCredentials');

                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data)
                    }
                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }

);

export default apiInstance;
