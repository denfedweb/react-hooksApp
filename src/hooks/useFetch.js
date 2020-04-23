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
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const requestOptions = {
            ...{...options, cancelToken: source.token}, ...{
                headers:{
                    authorization: token ? `Token ${token}` : ''
                }
            }
        }

        if(!isLoading){
            return
        }

        const loadData = () => {
            try {
                axios(url, requestOptions
                ).then(res=>{
                    setIsLoading(false);
                    setResponse(res.data);
                }).catch(error => {
                    console.error(error);
                })
            } catch (e) {
                setIsLoading(false);
                setError(e);
                console.error(e);
            }
        }

        // axios(url, requestOptions
        // ).then(res=>{
        //     setIsLoading(false);
        //     setResponse(res.data);
        // }).catch(err=>{
        //     setIsLoading(false);
        //     setError(err);
        //     if (axios.isCancel(err)) {
        //         console.log("cancelled");
        //     } else {
        //         throw err;
        //     }
        // });

        loadData();
        return () => {
            source.cancel();
        };

    }, [isLoading, options, url, token]);

    return [{isLoading, response, error, setError}, doFetch]
}
