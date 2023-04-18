import React from "react";
import "./App.css";
import { Input, Button } from "antd";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";

function ScreenHome(props) {
  const [isLogged, setIsLogged] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInMessage, setSigninMessage] = useState("");

  async function handleSubmitSignUp() {
    await fetch("/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "userName=" +
        signUpUsername +
        "&email=" +
        signUpEmail +
        "&password=" +
        signUpPassword,
    })
      .then((data) => data.json())
      .then((reponse) => {
        setSubmitMessage(reponse.message);
        if (reponse.result) {
          setSubmitMessage(reponse.message);
          setSignUpUsername("");
          setSignUpEmail("");
          setSignUpPassword("");
        }
      });
  }

  async function handleSubmitSignIn() {
    await fetch("/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "email=" + signInEmail + "&password=" + signInPassword,
    })
      .then((data) => data.json())
      .then((reponse) => {
        if (reponse.result) {
          setIsLogged(true);
          props.signin(reponse.data.user.token);
          props.addArticles(reponse.data.user.articles);
        } else {
          setSigninMessage(reponse.message);
        }
      });
  }

  if (isLogged) {
    return <Redirect to="/screenSource" />;
  }

  return (
    <div className="Login-page">
      {/* SIGN-IN */}

      <div className="Sign">
        <Input
          className="Login-input"
          placeholder="email@email.com"
          onChange={(e) => setSignInEmail(e.target.value)}
          value={signInEmail}
        />

        <Input.Password
          className="Login-input"
          placeholder="password"
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword}
        />

        <Button
          style={{ width: "80px" }}
          type="primary"
          onClick={() => handleSubmitSignIn()}
        >
          Sign-in
        </Button>
        <div>{signInMessage}</div>
      </div>

      {/* SIGN-UP */}

      <div className="Sign">
        <Input
          className="Login-input"
          placeholder="Login"
          onChange={(e) => setSignUpUsername(e.target.value)}
          value={signUpUsername}
        />
        <Input
          className="Login-input"
          placeholder="Email"
          onChange={(e) => setSignUpEmail(e.target.value)}
          value={signUpEmail}
        />

        <Input.Password
          className="Login-input"
          placeholder="password"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword}
        />

        <Button
          style={{ width: "80px" }}
          type="primary"
          onClick={() => handleSubmitSignUp()}
        >
          Sign-up
        </Button>
        <div>{submitMessage}</div>
      </div>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    signin: function (token) {
      dispatch({ type: "signin", token });
    },
    addArticle: function (article) {
      dispatch({ type: "addArticle", article });
    },
    addArticles: function (articles) {
      dispatch({ type: "addArticles", articles });
    },
  };
}

export default connect(null, mapDispatchToProps)(ScreenHome);
