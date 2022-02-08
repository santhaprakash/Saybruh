import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import moment from 'moment'
import { makeStyles } from "@mui/styles";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { tempcollect } from "../firebase";
import { useHistory } from "react-router-dom";
import { Avatar, Button, Card, Paper, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Otherpost from "../Phonecomponents/Otherpost";
import Main from "./Main";
function Friend() {
  const history = useHistory();
  const [friend, setFriend] = useState([]);
  const [newid, setNewid] = useState("");
  const { id } = useParams();
  const na = query(tempcollect, where("userId", "==", id));
  const user = JSON.parse(localStorage.getItem("currentuser"));

  const na2 = query(tempcollect, where("userId", "==", user.uid));
  useEffect(() => {
    onSnapshot(na2, tempcollect, (e) => {
      e.docs.map((s) => {
        setNewid(s.id);
      });
    });
  }, []);
  if (user) {
    if (user.uid === id) {
      history.push("/");
    }
  }
  useEffect(() => {
    onSnapshot(na, tempcollect, (e) => {
      const temp = [];
      e.docs.map((s) => {
        temp.push({ ...s.data(), id: s.id });
      });
      setFriend(temp);
    });
  }, []);

  const handleRemovefollower = (e) => {
    const removeRef = doc(tempcollect, e.id);
    updateDoc(removeRef, {
      followers: arrayRemove(user.uid),
    });
    const removeRef2 = doc(tempcollect, newid);
    updateDoc(removeRef2, {
      folowing: arrayRemove(e.userId),
    });
  };
  const handleAddfollower = (e) => {
    const addRef = doc(tempcollect, e.id);
    updateDoc(addRef, {
      followers: arrayUnion(user.uid),
    });
    const removeRef2 = doc(tempcollect, newid);
    updateDoc(removeRef2, {
      folowing: arrayUnion(e.userId),
    });
  };

  const useStyles = makeStyles((theme) => ({
    // description:{
    //   "@media (min-width:321px)":{
    //    fontSize:''
    //    },
    //    "@media (max-width:320px)":{
    //     fontSize:'58px !important'
    //    },
    //    "@media (min-width:350px)":{
    //    }
    //  }
  }));

  const classes = useStyles();

  return (
    <>
    <Main />
      {user ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "black",
              marginTop:'20px'
            }}
          >
            {friend.map((e) => {
              return (
                <>
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "black",
                    }}
                    key={e.id}
                  >
                    <Paper
                      style={{
                        marginRight: "20px",
                        marginTop: "14px",
                        color: "white",
                        backgroundColor: "black",
                      }}
                    >
                      <Typography
                        style={{ fontSize: "20px", marginLeft: "20px" }}
                      >
                        {e.followers.length}
                      </Typography>
                      <Typography style={{ fontSize: "12px" }}>
                        followers
                      </Typography>
                    </Paper>
                    <Avatar
                      sx={{ width: "70px", height: "80px" }}
                      src={e.userImage}
                    ></Avatar>
                    <Paper
                      style={{
                        marginLeft: "20px",
                        marginTop: "14px",
                        color: "white",
                        backgroundColor: "black",
                      }}
                    >
                      <Typography
                        style={{ fontSize: "20px", marginLeft: "20px" }}
                      >
                        {e.folowing.length}
                      </Typography>
                      <Typography style={{ fontSize: "12px" }}>
                        following
                      </Typography>
                    </Paper>
                  </Card>
                  <Card
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography style={{ fontSize: "20px" }}>
                      {e.userName}
                    </Typography>
                    <Typography
                      classNane={classes.description}
                      style={{
                        color: "#CBCCCE",
                        fontSize: "14px",
                        fontWeight: "lighter",
                      }}
                    >
                      {e.about}
                    </Typography>
                    <Paper
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "black",
                        color: "#CBCCCE",
                        marginTop: "6px",
                      }}
                    >
                      <LocationOnIcon />
                      <Typography>{e.place}</Typography>
                    </Paper>

                    <Paper
                      style={{
                        backgroundColor: "black",
                        display: "flex",
                        marginTop: "15px",
                      }}
                    >
                      {e.followers.includes(user.uid) ? (
                        <Button
                          size="small"
                          variant="contained"
                          style={{
                            marginRight: "10px",
                            backgroundColor: "#EEC312",
                            color: "black",
                            fontWeight: "600",
                          }}
                          onClick={() => handleRemovefollower(e)}
                        >
                          Following
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          style={{
                            backgroundColor: "#EEC312",
                            color: "black",
                            fontWeight: "600",
                          }}
                          onClick={() => handleAddfollower(e)}
                        >
                          Follow
                        </Button>
                      )}
                    </Paper>
                    <hr
                      style={{
                        border: "1px solid #CBCCCE",
                        width: "250px",
                        marginTop: "18px",
                      }}
                    />
                    <h3
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "-2px",
                        paddingBottom: "5px",
                        borderBottom: "2px solid #EEC312",
                        cursor: "pointer",
                      }}
                    >
                      Posts
                    </h3>
                    <Otherpost id={id} />
                  </Card>
                </>
              );
            })}
          </div>
        </>
      ) : (
        history.push("loginpage")
      )}
    </>
  );
}

export default Friend;
