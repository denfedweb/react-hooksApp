import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import GlobalFeed from './globalFeed/GlobalFeed';
import Article from './article/Article';
import Auth from "./auth/Auth";
import TagFeed from "./tagFeed/TagFeed";
import YourFeed from "./yourFeed/YourFeed";
import CreateArticle from "./createArticle/CreateArticle";
import EditArticle from "./editArticle/EditArticle";


function Routes(){
    return (
        <Switch>
            <Route path="/" exact component={GlobalFeed}/>
            <Route path="/tags/:slug" component={TagFeed}/>
            <Route path="/article/:slug/edit" component={EditArticle}/>
            <Route path="/article/:slug" component={Article}/>
            <Route path="/articles/new" component={CreateArticle}/>
            <Route path="/feed" component={YourFeed}/>
            <Route path="/login">
                <Auth type={{
                    isReg: false,
                    title: "Login",
                    type: "login",
                    buttonTitle: "Sign in",
                    api: "api/users/login"
                }} />
            </Route>
            <Route path="/register">
                <Auth type={{
                    isReg: true,
                    title: "Registration",
                    type: "register",
                    buttonTitle: "Sign up",
                    api: "api/users"
                }}/>
            </Route>
            <Redirect to="/" />
        </Switch>
    )

}

export default Routes
