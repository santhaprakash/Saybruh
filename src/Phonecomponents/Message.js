import { useHistory, useParams } from "react-router-dom";
import { tempcollect } from "../firebase";
import {
  Button,
  Container,
  Grid,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { Avatar } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../Phonestyles/Otherpoststyles.css";
function Message() {
  const history = useHistory();
  const { id } = useParams();
  const [newid, setNewid] = useState("");
  const [newname, setNewname] = useState("");
  const [newphoto, setNewphoto] = useState(" ");
  useEffect(() => {
    const tRef = doc(tempcollect, id);
    getDoc(tRef).then((e) => {
      setNewid(e.data().userId);
      setNewname(e.data().userName);
      setNewphoto(e.data().userImage);
    });
  }, []);

  const scrollRef = useRef();
  const [text, setText] = useState("");
  //userName
  const user1 = JSON.parse(localStorage.getItem("currentuser"));

  const user2 = newid;
  //userImage
  const photo1 = JSON.parse(localStorage.getItem("userimage"));
  const photo2 = newphoto;

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const submitHandler = async () => {
    if (text === "" || text === " ") {
      return;
    } else {
      const id =
        user1.uid > user2 ? `${user1.uid + user2}` : `${user2 + user1.uid}`;
      const docRef = collection(db, "messages", id, "chat");
      await addDoc(docRef, {
        from: user1.uid,
        to: user2,
        msg: text,
        createdAt: Timestamp.fromDate(new Date()),
      });
      const addRef = doc(db, "lastmessage", id);
      await setDoc(addRef, {
        from: user1.uid,
        to: user2,
        msg: text,
        createdAt: Timestamp.fromDate(new Date()),
        read: false,
      });
      console.log("added");
      setText("");
    }
  };

  const [msgdata, setMsgdata] = useState([]);

  const ids =
    user1.uid > user2 ? `${user1.uid + user2}` : `${user2 + user1.uid}`;
  const msgRef = collection(db, "messages", ids, "chat");
  const na2 = query(msgRef, orderBy("createdAt", "asc"));

  useEffect(() => {
    onSnapshot(na2, (e) => {
      const post = [];
      e.docs.map((z) => {
        post.push({ ...z.data() });
      });
      setMsgdata(post);
    });
  }, [ids]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgdata]);

  const backHandler = () => {
    history.goBack();
  };
  return (
    <>
      {user1 ? (
        <>
          <Grid
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              backgroundColor: "#333333",
              zIndex: "1000",
              height: "60px",
              width: "100vw",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              onClick={backHandler}
            >
              <ArrowBackIosNewIcon
                style={{ marginRight: "7px", fontSize: "22px" }}
              />
              <h4>back</h4>
            </div>
            <div>
              <h2
                style={{
                  color: "#EEC312",
                  position: "fixed",
                  top: "0px",
                  left: "120px",
                }}
              >
                {newname}
              </h2>
            </div>
          </Grid>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Container style={{ marginBottom: "50px", marginTop: "70px" }}>
              {msgdata.map((h) => {
                return (
                  <>
                    {h.from === user1.uid ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                          ref={scrollRef}
                        >
                          <div
                            style={{ marginRight: "8px", marginTop: "-19px" }}
                          >
                            <h3
                              style={{
                                color: "white",
                                fontFamily: "EB Garamond",
                              }}
                            >
                              {h.msg}
                            </h3>
                            {/* <h6 style={{fontSize:'8px',marginTop:'-9px'}}><Moment fromNow>{h.createdAt.toDate()}</Moment></h6> */}
                          </div>
                          <Avatar
                            style={{ width: "27px", height: "27px" }}
                            src={photo1.userImage}
                          ></Avatar>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                          ref={scrollRef}
                        >
                          <Avatar
                            style={{ width: "27px", height: "27px" }}
                            src={photo2}
                          ></Avatar>
                          <div style={{ marginLeft: "10px" }}>
                            <h3
                              style={{
                                color: "white",
                                fontFamily: "EB Garamond",
                                marginTop: "-1px",
                              }}
                            >
                              {h.msg}
                            </h3>
                            {/* <h6 style={{fontSize:'8px',marginTop:'-9px'}}><Moment fromNow>{h.createdAt.toDate()}</Moment></h6> */}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                );
              })}
            </Container>
            <div style={{ position: "fixed", bottom: "3px", left: "0px" }}>
              <form onSubmit={handleSubmit}>
                <input
                  value={text}
                  onChange={(z) => setText(z.target.value)}
                  className="phonechat-input"
                ></input>
                <Button
                  variant="contained"
                  onClick={submitHandler}
                  style={{
                    borderRadius: "18px",
                    backgroundColor: "#EEC312",
                    color: "black",
                  }}
                  disabled={!text}
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </>
      ) : (
        history.push("loginpage")
      )}
    </>
  );
}

export default Message;
