const helper = require('./helper.js');
const React = require('react');
const {createRoot} = require('react-dom/client');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const password = e.target.querySelector('#pass').value;

    if(!username || !password) {
        helper.handleError('Username and/or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, {username, password});
    return false;
};

const handleSignUp = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const password = e.target.querySelector('#pass').value;
    const password2 = e.target.querySelector('#pass2').value;

    if(!username || !password || !password2) {
        helper.handleError('All fields are required for sign up!');
        return false;
    }

    if(password !== password2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, password, password2});
    return false;
};

const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input type="text" id="user" name="username" placeholder="Enter Username"/>
            <label htmlFor="password">Password: </label>
            <input type="password" id="pass" name="password" placeholder="Enter Password"/>
            <input type="submit" className="formSubmit" value="Sign In"/>
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignUp}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input type="text" id="user" name="username" placeholder="Enter Username"/>
            <label htmlFor="password">Password: </label>
            <input type="password" id="pass" name="password" placeholder="Enter Password"/>
            <label htmlFor="password2">Password: </label>
            <input type="password" id="pass2" name="password2" placeholder="Retype Password"/>
            <input type="submit" className="formSubmit" value="Sign Up"/>
        </form>
    );
};

const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    const root = createRoot(document.getElementById('content'));

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <LoginWindow/> );
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <SignupWindow/> );
        return false;
    });

    root.render( <LoginWindow/> );
};

window.onload = init;
