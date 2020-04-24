import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './pages/routes';
import Navbar from "./components/Navbar/Navbar";
import {CurrentUserProvider} from './contexts/currentUser';
import CurrentUserChecker from "./hoc/currentUserChecker";

function App() {


    return (
        <CurrentUserProvider>
            <CurrentUserChecker>
                <Router>
                    <Navbar/>
                    <div className="uk-container">
                        <Routes/>
                    </div>
                </Router>
            </CurrentUserChecker>
        </CurrentUserProvider>
    )
}

export default App;
