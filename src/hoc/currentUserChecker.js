import {useContext, useEffect} from 'react';
import useFetch from "../hooks/useFetch";
import {CurrentUserContext} from "../contexts/currentUser";
import useLocalStorage from "../hooks/useLocalStorage";

function CurrentUserChecker({children}) {
    const [{response}, doFetch] = useFetch("https://conduit.productionready.io/api/user");
    const [, setCurrentUser] = useContext(CurrentUserContext);
    const [token] = useLocalStorage("token");

    useEffect((() => {
        if (!token) {
            setCurrentUser(state=>({
                ...state,
                isLoggedIn: false
            }));
            return
        }
        doFetch();
        setCurrentUser(state=>({
            ...state,
            isLoading: true
        }));
    }), [token, setCurrentUser, doFetch]);

    useEffect((() => {
        if(!response){
            return
        }
        setCurrentUser(state=>({
            ...state,
            isLoading: false,
            isLoggedIn: true,
            currentUser: response.user
        }));
    }), [response, setCurrentUser]);

    return children;
}

export default CurrentUserChecker;
