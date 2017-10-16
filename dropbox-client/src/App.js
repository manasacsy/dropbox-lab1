import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import LoginPage from "./components/LoginPage";


// import HomePage from "./components/HomePage";

    class App extends Component {
        render() {
            return (
                <div className="App">
                    <BrowserRouter>
                        <LoginPage/>
                    </BrowserRouter>
                </div>
            );
        }
    }

    export default App;
