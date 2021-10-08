import React from "react";
import {useLocation, Redirect} from "react-router-dom";
import app, { db } from "../base";

const ReferalPage = (props) => {
    const location = useLocation();
    const path = `${location.pathname}`;
    const [email, emailUpdater] = React.useState("");
    const [points, pointsUpdater] = React.useState(0);
    const [redirect, setRedirect] = React.useState(false);

    const getSender = () => {
        db.collection("users")
        .where("shareLink", "==", path)
        .get()
        .then((q) => {
            q.forEach((doc) => {
                console.log(doc)
                emailUpdater(doc.data().email)
                pointsUpdater(doc.data().points)
            });
        })
        .then(() => {
            db.collection("users").doc(email)
            .update({
                points: points+2
            })
            .then(()=> {
                setRedirect(true)
            })
        })
        .catch(err => console.log(err))
    }

    React.useEffect(() => {
        getSender()
    })

    return (
        <>
            Referal page...
            {redirect && <Redirect to="/signup" />}
        </>
    )
}

export default ReferalPage;