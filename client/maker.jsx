const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handlePasswordChange = (e) => {
    e.preventDefault();
    helper.hideError();

    const oldPass = e.target.querySelector('#oldPass').value;
    const newPass = e.target.querySelector('#newPass').value;
    const newPass2 = e.target.querySelector('#newPass2').value;

    if(!oldPass || !newPass || !newPass2) {
        helper.handleError('All fields are required for password change!');
        return false;
    }

    if(newPass !== newPass2) {
        helper.handleError('New passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {oldPass, newPass, newPass2});
    return false;
};

const PasswordChangeForm = (props) => {
    return (
        <form id="passChangeForm"
            name="passChangeForm"
            onSubmit={handlePasswordChange}
            action="/changePassword"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="oldPass">Old Password: </label>
            <input type="text" id="oldPass" name="oldPass" placeholder="Enter Old Password"/>
            <label htmlFor="newPass">New Password: </label>
            <input type="password" id="newPass" name="newPass" placeholder="Enter New Password"/>
            <label htmlFor="newPass2">Retype New Password: </label>
            <input type="password" id="newPass2" name="newPass2" placeholder="Retype New Password"/>
            <input type="submit" className="formSubmit" value="Change Password"/>
        </form>
    );
};

const handleDomo = (e, onDomoAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const personality = e.target.querySelector('#domoPersonality').value;

    if (!name || !age || !personality) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, age, personality}, onDomoAdded);
    return false;
};

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            onSubmit={(e) => handleDomo(e, props.triggerReload)}
            name="domoForm"
            action="/maker"
            method="POST"
            className='domoForm' 
        >
            <label htmlFor="name">Name: </label>
            <input type="text" id="domoName" name="name" placeholder="Enter Domo Name"/>
            <label htmlFor="personality">Personality: </label>
            <input type="text" id="domoPersonality" name="personality" placeholder="Enter Domo Personality"/>
            <label htmlFor="age">Age: </label>
            <input type="number" id="domoAge" min="0" name="age"/>
            <input type="submit" className="makeDomoSubmit" value="Make Domo"/>
        </form>
    );
};

const DomoList = (props) => {
    const [domos, setDomos] = useState(props.domos);
    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch('/getDomos');
            const data = await response.json();
            setDomos(data.domos);
        };

        loadDomosFromServer();
    }, [props.reloadDomos]);

    if(domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = domos.map(domo => {
        return (
            <div className="domo" key={domo.id}>
                <img src="./assets/img/domoface.jpeg" alt="Domo Face" className="domoFace"/>
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
                <h3 className="domoPersonality">Personality: {domo.personality}</h3>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const App = () => {
    const [reloadDomos, setReloadDomos] = useState(false);

    return (
        <div>
            <div id="makeDomo">
                <DomoForm triggerReload={() => setReloadDomos(!reloadDomos)}/>
            </div>
            <div id="domos">
                <DomoList domos={[]} reloadDomos={reloadDomos}/>
            </div>
        </div>
    );
};

const init = () => {
    const displayDomos = document.getElementById('displayDomos');
    const changePassword = document.getElementById('changePass');

    const root = createRoot(document.getElementById('app'));
    displayDomos.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <App/> );
        return false;
    });

    changePassword.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <PasswordChangeForm/> );
        return false;
    });

    root.render( <App/> );
};

window.onload = init;