import axios from "axios";
import { API } from "./utils/constants";
import { showAlert } from "./utils/alert";

const axiosClient = axios.create({
    baseURL: `${API}`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            if (response.status === 401) { // Incorrect or expired credentialsncorrect or expired credentials
                // for security ==> i delete the acces_token
                localStorage.removeItem("ACCESS_TOKEN");
                localStorage.removeItem("ACCESS_TOKEN_EXPIRE");
            }
        } catch (err) {
            console.error(error);
            // check if API REST is avalaible
            if (error.toJSON().message === 'Network Error') {
                const msg = `Impossible de se connecter avec le REST API.`;
                console.log(msg);
                // for security ==> i delete the acces_token
                localStorage.removeItem("ACCESS_TOKEN");
                localStorage.removeItem("ACCESS_TOKEN_EXPIRE");

                showAlert('error', msg, '', 'static')
            }
        }
        throw error;
    }
);

export default axiosClient;