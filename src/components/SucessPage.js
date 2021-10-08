import React from 'react';
import s from "./style.module.css"
import {NavLink} from "react-router-dom";
import {Form,InputGroup} from "react-bootstrap";
import {AuthContext} from "./Auth"
import app, { db } from "../base";

const SucessPage = (props) => {
    const copyText = e => {
        e.select();
        e.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(e.value);
    }
    let [user, updateUser] = React.useState({})
    let [number, plus] = React.useState(0)
    let [usersLength, setUsers] = React.useState(0)

    const { currentUser } = React.useContext(AuthContext);
        const getUser = () =>{
            db.collection("users")
            .orderBy("points", "desc")
            .get()
            .then((q) => {
                let counter = 0
                setUsers(q.size)
                q.forEach(function (doc){
                    counter++
                    if(currentUser.email == doc.data().email) {
                        // plus(number -= 1)
                        return plus(counter)
                    };
                });
            })
            .then(() => {
                db.collection("users").doc(`${currentUser.email}`)
                .get()
                .then((doc) => {
                    if (doc.exists){
                      // Convert to City object
                      updateUser(doc.data());
                      // Use a City instance method
                      console.log(user);
                    }
                    else {
                        console.log("No such document!");
                      }
                })
            })
        .catch(err => {
            console.log(err)
        })
    }

    const countPercent = (rate) => {
        let sum = rate*100/usersLength;
        if(sum < 10) return 10;
        if(sum < 50) return 50;
        return sum.toFixed(0)
    }

    React.useEffect(() => {
        getUser()
    }, [])

    return (
        <div className={s.centerPosition}>
            <h2>You are all signed up!</h2>
            <div className={s.content}>
                <h3>Your rank is</h3>
                <h3>{number}</h3>
                <p>Your points = {user.points} point(s)</p>
                <p>Top {countPercent(number)}%</p>
            </div>
            <div>
                <h4>Want to increase your rank? See below</h4>
                <p>Get 2 points per person when you refer with your unique link below:</p>
                <InputGroup className={s.input} >
                    <InputGroup.Text>Copy</InputGroup.Text>
                    <Form.Control 
                        onClick={e => copyText(e.target)} 
                        type="text" 
                        value={`https://simpleproject-f43d9.web.app` + user.shareLink} 
                        readOnly 
                    />
                </InputGroup>
            </div>
            <NavLink to="/">Return to home page</NavLink>
        </div>
    )
}

export default SucessPage