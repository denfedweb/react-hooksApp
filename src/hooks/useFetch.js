import {useEffect, useState, useCallback} from 'react';
import axios from "axios";

import useLocalStorage from "./useLocalStorage";


export default function useFetch(url){
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});
    const [token] = useLocalStorage('token');

    const doFetch = useCallback((options = {})=>{
        setOptions(options);
        setIsLoading(true);
    }, [])

    useEffect(() => {
        const requestOptions = {
            ...options, ...{
                headers:{
                    authorization: token ? `Token ${token}` : ''
                }
            }
        }
        if(!isLoading){
            return
        }
        axios(url, requestOptions
        ).then(res=>{
            setIsLoading(false);
            setResponse(res.data);
        }).catch(err=>{
            setIsLoading(false);
            setError(err);
        });
    }, [isLoading, options, url, token]);

    return [{isLoading, response, error, setError}, doFetch]
}