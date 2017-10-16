import {reactLocalStorage} from 'reactjs-localstorage';
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3005';

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/loginAction`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doSignup = (payload) =>
    fetch(`${api}/signUp`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const uploadFile = (payload,currentFolder) =>
    fetch(`${api}/files/upload/`+currentFolder+"/"+reactLocalStorage.get('userid'), {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.json();
    }).catch(error => {
            console.log("This is error");
            return error;
        });


export const getImages = () =>
    fetch(`${api}/files/`+reactLocalStorage.get('userid'))
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const starFile = (id) =>
    fetch(`${api}/starFile/` + id,{
        method: 'POST'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });
export const unstarFile = (id) =>
    fetch(`${api}/unstarFile/` + id,{
        method: 'POST'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const getUserInfo = (id) =>
    fetch(`${api}/userInformation/` + reactLocalStorage.get('userid'))
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const createFolder = (name, inFolder) =>
    fetch(`${api}/createFolder/` + name +"/" + inFolder +"/"+reactLocalStorage.get('userid') ,{
        method: 'POST'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });

export const getFolderData = (userfileid) =>
    fetch(`${api}/getFolderData/` + userfileid+"/"+reactLocalStorage.get('userid'))
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });

export const share = (userfileid,fileid, fileType) =>
    fetch(`${api}/share/` + userfileid+"/"+fileid+"/"+fileType,{
        method: 'POST'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });

export const deleteRes = (userfileid, type, fileid, filename) =>
    fetch(`${api}/delete/` + userfileid+"/"+reactLocalStorage.get('userid')+"/"+type+"/"+ fileid +"/"+filename,{
        method: 'POST'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });

//:userid

export const getuseractivity = () =>
    fetch(`${api}/getuseractivity/` +reactLocalStorage.get('userid'))
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });