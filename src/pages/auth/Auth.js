import React, {useState, useEffect, useContext, Fragment} from 'react';
import style from './Auth.module.sass';
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import {Redirect} from 'react-router-dom';
import {CurrentUserContext} from "../../contexts/currentUser";

function Auth(props) {
    const {isReg, title, buttonTitle, type, api} = props.type;
    const [form, setForm] = useState({username: "", email: "", password: ""});
    const [{response, error, isLoading, setError}, doFetch] = useFetch(`https://conduit.productionready.io/${api}`);
    const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
    const [, setToken] = useLocalStorage("token");
    const [, dispatch] = useContext(CurrentUserContext);

    function changeInput(event) {
        setForm({
           ...form, [event.target.name]: event.target.value
        });
    }

    useEffect(()=>{
        setForm({username: "", email: "", password: ""});
        setError(null);
    }, [type, setError]);

    useEffect(()=>{
        if (!response){
            return
        }
        setToken(response.user.token);
        setIsSuccessSubmit(true);
        dispatch({type: "SET_AUTHORIZED", payload: response.user});

    }, [response, setToken, dispatch]);

    function submitForm() {
        setError(null);
        doFetch({
            method: 'POST', data:{user: form}
        });
    }

    if (isSuccessSubmit){
        return <Redirect to="/" />
    }

    return (
        <div className={style.AuthBlokc}>
            <div className={`uk-text-center ${style.AuthForm}`}>
                <h1>{title}</h1>
                {isReg ?
                <div>
                    <div className="uk-margin">
                        <div className="uk-form-controls">
                            <input onChange={changeInput} className="uk-input" name="username" type="text" value={form.name} placeholder="Name..."/>
                        </div>
                    </div>
                </div> : null }
                <div>
                    <div className="uk-margin">
                        <div className="uk-form-controls">
                            <input onChange={changeInput} className="uk-input" name="email" type="email" value={form.email} placeholder="Email..."/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="uk-margin">
                        <div className="uk-form-controls">
                            <input onChange={changeInput} className="uk-input" name="password" type="password" value={form.password} placeholder="Password..."/>
                        </div>
                    </div>
                </div>
                {error ? <Fragment><span className="uk-label uk-label-danger"><i className="fas fa-exclamation-circle"/>Valid data entered or user exists</span> <br/></Fragment> : null }

                <button disabled={isLoading} onClick={submitForm} className="uk-button uk-button-default">{buttonTitle}</button>
            </div>
        </div>
    );
}

export default Auth;
