import React, { useCallback } from "react";
import { Redirect } from "react-router";
import app, { db } from "../base";

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const CompleteRegistration = () => {
    const newUserRef = db.collection("users").doc(`${window.localStorage.getItem('email')}`);
    const [isNewValue, newValueHandler] = React.useState(false)
    // debugger
    React.useEffect(() => {
        fetch('https://geo.ipify.org/api/v2/country?apiKey=at_etmOEjkHehGi2BpHy84aGCSOfFa96')
            .then(function (data) {
                // debugger
                return data.json()
            })
            .then((data) => {
                newUserRef.set({
                    ip: data.ip,
                    email: window.localStorage.getItem('email'),
                    id: makeid(20),
                    points: 1,
                    shareLink: `/link/referal/${makeid(35)}`
                });
            })
            .then(() => {
                newValueHandler(true)
            })
            .catch(err => {
                console.log(err);
            })

    }, [])
    return (
        <>
            {isNewValue && <Redirect to="success" />}
        </>
    )
}

export default CompleteRegistration