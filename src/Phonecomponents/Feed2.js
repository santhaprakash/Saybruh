import { Avatar, Modal, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { tempcollect } from "../firebase";
import "../Phonestyles/Feedstyles.css";
import LinearProgress from "@mui/material/LinearProgress";
import { doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
function Feed2() {
  const user = JSON.parse(localStorage.getItem("currentuser"));

  const temp1 = query(tempcollect, where("userId", "==", user.uid));
  const [filedata, setFiledata] = useState("");
  const [mydata, setMydata] = useState({});
  const temp3 = query(tempcollect, where("userId", "!=", user.uid));

  const [fileimage, setFileimage] = useState("");
  const [value, setValue] = useState("");


  useEffect(() => {
    onSnapshot(temp1, (e) => {
      e.docs.map((s) => {
        setMydata(s.data());
        setFiledata(s.id);
        setFileimage(s.data().userImage);
      });
    });
  }, []);
  const [otherdata, setOtherdata] = useState([]);

  useEffect(() => {
    onSnapshot(temp3, (e) => {
      const post = [];
      e.docs.map((s) => {
        post.push({ ...s.data(), id: s.id });
      });
      setOtherdata(post);
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      var intreval = setInterval(() => {
        setValue((prev) => prev + 10);
      }, 1000);

      var tm = setTimeout(() => {
        setOpen(false);
      }, 11000);
    }

    return () => {
      clearTimeout(tm);
      clearInterval(intreval);
      setValue(0);
    };
  }, [open]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: "100vw",
    height: "100vh",
  };
  const [story, setStory] = useState({
    url: "",
    username: "",
    avatar: "",
    userid: " ",
  });
  const username = localStorage.getItem("username");

  const storyDelete = () => {
    const storyRef = doc(tempcollect, filedata);
    updateDoc(storyRef, {
      stories: "",
    });
    setOpen(false);
  };
  return (
    <>
      <div className="phoneroot" style={{ marginTop: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {mydata.stories !== "" ? (
            <>
              <div
                className="phoneborder"
                onClick={() => {
                  setStory({
                    url: mydata.stories,
                    username: mydata.userName,
                    avatar: mydata.userImage,
                  });
                  setOpen(true);
                }}
              >
                <img className="phoneavatar" alt="" src={fileimage}></img>
              </div>
              <h5 style={{ marginTop: "-1px", marginLeft: "8px" }}>My Story</h5>
            </>
          ) : null}
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {otherdata.map((p, index) => {
              return (
                <div>
                  {p.stories !== "" ? (
                    <>
                      <div
                        className="phoneborder"
                        onClick={() => {
                          setStory({
                            url: p.stories,
                            username: p.userName,
                            avatar: p.userImage,
                          });
                          setOpen(true);
                        }}
                        key={index}
                      >
                        <img className="phoneavatar" alt="" src={p.userImage}></img>
                        <h5 style={{ marginTop: "0px", marginLeft: "10px" }}>
                          {p.userName}
                        </h5>
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
          {open ? (
            <>
              <Modal keepMounted open={open} onClose={handleClose}>
                <Paper sx={style}>
                  <LinearProgress
                    variant="determinate"
                    value={value}
                    color="secondary"
                    style={{ backgroundColor: "black" }}
                  />

                  <img
                  alt=""
                    src={story.url}
                    style={{ width: "100%", height: "100%" }}
                  ></img>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "10px",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      zIndex: "1000",
                      marginLeft: "10px",
                    }}
                  >
                    <Avatar
                      src={story.avatar}
                      style={{
                        marginRight: "11px",
                        width: "42px",
                        height: "42px",
                        marginTop: "13px",
                      }}
                    ></Avatar>
                    <h3
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      {story.username}
                    </h3>
                  </div>
                  {username === story.username ? (
                    <AutoDeleteIcon
                      onClick={storyDelete}
                      style={{
                        color: "white",
                        fontSize: "35px",
                        position: "absolute",
                        top: "25px",
                        right: "10px",
                      }}
                    />
                  ) : null}
                </Paper>
              </Modal>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Feed2;
