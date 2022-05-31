

import axios from "axios";
import { makeUseAxios, configure } from "axios-hooks";


export const instance = axios.create({
    baseURL: "https://ssp-backend-node.herokuapp.com/",
    // baseURL: "http://localhost:8000/",
    timeout: 120000, // 120 seconds

    headers: {
        "Content-Type": "application/json",
    },
});

const useAxios = makeUseAxios({
    axios: instance,
});

const defaultOptions = { useCache: false };
configure({ axios, defaultOptions });

export default useAxios;
