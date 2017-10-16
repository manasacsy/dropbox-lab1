import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

class Login extends React.Component {
        constructor(props) {
            super(props);
            this.login = this.login.bind(this);
        }
        login(){
            axios.get('http://localhost:3000/loginAction/' + document.getElementById("emailid").value + "/" + document.getElementById("password").value)
                      .then(function (response) {
                console.log("in login function success")
                ReactDOM.render(<App />, document.getElementById('app'));
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
            }
        render() {
             return (
                <div>
                <p><span>Email id:</span><input type="text" id="emailid" name="emailid"></input></p>
                <p><span>Password:</span><input type="text" id="password" name="password"></input></p> 
                <p><button onClick={this.login.bind(this)}>LOGIN</button></p>
                </div>
                 );
            }    
}


export default Login;
