import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
} from "@mui/material";
import "../Phonestyles/Login.css";
function Phonelogin() {
  const user = localStorage.getItem("currentuser");
  useEffect(() => {}, [user]);

  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  // login functionality

  const submitHandler = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((e) => {
        localStorage.setItem("currentuser", JSON.stringify(e.user));
        history.push("/");
      })
      .catch((e) => {
        alert(e);
      });
    setEmail("");
    setPassword("");
  };
  return (
    <>
      {!user ? (
        <div className="addpost-main">
          <div className="submain">
            <form
              className="form"
              onSubmit={submitHandler}
              className="login-addpost-form"
            >
              <h2 style={{ paddingBottom: "10px", color: "white" }}>
                Login Here
              </h2>
              <input
                placeholder="test1@gmail.com"
                size="small"
                label="Mail-id"
                className="login-input"
                style={{ marginBottom: "18px" }}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="login-input"
                placeholder="password"
                label="Password"
                size="small"
                style={{ marginBottom: "18px" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                size="medium"
                onClick={submitHandler}
                style={{
                  backgroundColor: "#EEC312",
                  color: "black",
                  marginBottom: "18px",
                  fontWeight: "800",
                }}
              >
                Login
              </Button>

              <Button
                variant="contained"
                size="medium"
                style={{
                  backgroundColor: "#EEC312",
                  color: "white",
                  marginBottom: "18px",
                }}
              >
                <Link
                  to="/signuppage"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "800",
                  }}
                >
                  Don't have an account Signup
                </Link>
              </Button>
            </form>
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </>
  );
}

export default Phonelogin;
