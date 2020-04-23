import React, {useContext} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUser";

function FeedToggler({tagName}) {
    let location = useLocation();
    const [currentUserState] = useContext(CurrentUserContext);
    return (
        <ul className="uk-tab">
            {currentUserState.isLoggedIn && (
                <li className={location.pathname === "/feed" ? "uk-active" : ""}><NavLink to="/feed">Your feed</NavLink></li>
            )}
            <li className={location.pathname === "/" ? "uk-active" : ""}><NavLink to="/" exact>Global feed</NavLink></li>
            {tagName && (
                <li className={location.pathname === `/tags/${tagName}` ? "uk-active" : ""}>
                    <NavLink to={`/tags/${tagName}`} exact><i className="fas fa-hashtag"/>{tagName}</NavLink>
                </li>
            )}
        </ul>
    );
}

export default FeedToggler;
