import React, {useContext, Fragment} from 'react';
import {NavLink, Link} from "react-router-dom";

import {CurrentUserContext} from "../../contexts/currentUser";

function Navbar() {
    const [currentUserState, setCurrentUser] = useContext(CurrentUserContext);

    return (
        <nav className="uk-navbar-container" data-uk-navbar>
            <div className="uk-navbar-left">
                <Link className="uk-margin-medium-left" to="/"><i className="fas fa-laptop-code"/>denfedweb</Link>
            </div>
            <div className="uk-navbar-right">
                <ul className="uk-navbar-nav">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    {/* !currentUser.isLoggedIn = very low */}
                    {currentUserState.isLoggedIn === false && (
                        <Fragment>
                            <li><NavLink to="/login">Sign in</NavLink></li>
                            <li><NavLink to="/register">Sign up</NavLink></li>
                        </Fragment>
                    )}
                    {/* показывать только когда пользователь залогинен (переменная будет уже существовать) */}
                    {currentUserState.isLoggedIn && (
                        <Fragment>
                            <li><NavLink to="/articles/new"><i className="fas fa-file-alt"/>&nbsp; New Article</NavLink></li>
                            <li><NavLink to={`/profiles/${currentUserState.currentUser.username}`}><i className="fas fa-user"/>&nbsp; {currentUserState.currentUser.username}</NavLink></li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
