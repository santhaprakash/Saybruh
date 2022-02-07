
import { Button} from "@mui/material";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory, Link } from "react-router-dom";
import { tempcollect } from "../firebase";
import { addDoc, Timestamp } from "firebase/firestore";

function Phonesignup() {
  const auth = getAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("currentuser", JSON.stringify(res.user));
      await addDoc(tempcollect, {
        userId: res.user.uid,
        userName: username,
        email: email,
        date: Timestamp.now(),
        followers: [],
        folowing: [],
        stories: "",
        about: "",
        place: "India",
        userImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_sf-YpPF_UUVW8Mf6c4EZQTozu8jxLVTIPA&usqp=CAU",
      }).then((e) => {
        const post = {
          userImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_sf-YpPF_UUVW8Mf6c4EZQTozu8jxLVTIPA&usqp=CAU",
        };
        localStorage.setItem("userimage", JSON.stringify(post));
        localStorage.setItem("username", username);
        history.push("/loginpage");
      });
    } catch (error) {
      console.log(error);
    }
    setEmail(" ");
    setPassword(" ");
    setUsername("");
  };
  return (
    <div>
      <div>
        <div className="addpost-main">
          <div className="submain">
            <form className="login-addpost-form" onSubmit={submitHandler}>
              <h2 style={{ paddingBottom: "10px", color: "white" }}>
                Signup here
              </h2>
              <input
                type="text"
                className="login-input"
                size="small"
                label="give any userName"
                style={{ marginBottom: "18px" }}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username @soni"
              />
              <input
                className="login-input"
                placeholder="test1@gmail.com"
                size="small"
                label="Mail-id"
                style={{ marginBottom: "18px" }}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="password"
                className="login-input"
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
                  fontWeight:'600'
                }}
              >
                Sign up
              </Button>

              <Button
                variant="contained"
                size="medium"
                style={{
                  backgroundColor: "#EEC312",
                  color: "white",
                  marginBottom: "18px",
                  fontWeight:'600'
                }}
              >
                <Link
                  to="/loginpage"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Already have an account Login
                </Link>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Phonesignup;
