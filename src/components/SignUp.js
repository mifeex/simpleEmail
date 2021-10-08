import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../base";

const emailVer = {
  handleCodeInApp: true,
  url: `https://simpleproject-f43d9.web.app/goto?user=ub1947`
}

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, "qs351!")
        .then((userCredential) => {
          // Signed in 
          // debugger
          const user = userCredential.user;
        })
        window.localStorage.setItem('email', email.value);
      await app
        .auth()
        .sendSignInLinkToEmail(email.value,emailVer)
        .then(function() {
          console.log("success")
          history.push("/");
          // Verification email sent.
        })
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
