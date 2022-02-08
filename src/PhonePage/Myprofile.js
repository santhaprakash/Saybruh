import {
  Avatar,
  Button,
  Card,
  Paper,
 TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { storage, tempcollect } from "../firebase";
import {
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { makeStyles } from "@mui/styles";
import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import Mytab from "../Phonecomponents/Mytab";
import Main from "./Main";
function Myprofile() {
  const [editopen, setEditopen] = useState(false);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const [profile, setProfile] = useState([]);

  const temp = query(tempcollect, where("userId", "==", user.uid));
  const [filedata, setFiledata] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `profile/${file.name}`);
    const userRef = doc(tempcollect, filedata);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((e) => {
        updateDoc(userRef, {
          userImage: e,
        });
        const myname = localStorage.getItem("username");
        const post = { userImage: e, userName: myname };
        localStorage.setItem("userimage", JSON.stringify(post));
      });
    });
  };

  useEffect(() => {
    onSnapshot(temp, (e) => {
      const posts = [];
      e.docs.map((s) => {
        posts.push({ ...s.data(), id: s.id });
        setFiledata(s.id);
      });
      setProfile(posts);
    });
  }, []);

  const submitHandl = (e) => {
    e.preventDefault();
  };

  const submitHandler = (e) => {
    setEditopen(!editopen);
    const submitRef = doc(tempcollect, e);
    updateDoc(submitRef, {
      about: bio,
      place: location,
    });
  };

  const getValuehandler = (e) => {
    setEditopen(!editopen);
    const docRef = doc(tempcollect, e);
    getDoc(docRef).then((e) => {
      setBio(e.data().about);
      setLocation(e.data().place);
    });
  };

  const handlePostsubmit = (e) => {
    e.preventDefault();
  };

  //mui tab
 
  const useStyles = makeStyles((theme) => ({
    editprofile: {
      width: "70vw",
    },
  }));

  const classes = useStyles();
  return (
    <>
    <Main />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
          marginTop:'20px'
        }}
      >
        {profile.map((e) => {
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
                  <Typography style={{ fontSize: "20px", marginLeft: "20px" }}>
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
                  <Typography style={{ fontSize: "20px", marginLeft: "20px" }}>
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
                    width: "70vw",
                    marginTop: "15px",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <form onSubmit={handlePostsubmit}>
                      <label htmlFor="upload-photo">
                        <input
                          style={{ display: "none" }}
                          id="upload-photo"
                          name="upload-photo"
                          type="file"
                          onChange={handleFile}
                        />
                        <LinkedCameraIcon
                          style={{
                            fontSize: "30px",
                            color: "white",
                            cursor: "pointer",
                          }}
                        />
                      </label>
                    </form>
                  </div>
                  <div>
                    <EditIcon
                      sx={{ fontSize: "31px" }}
                      style={{ color: "white", cursor: "pointer" }}
                      onClick={() => getValuehandler(e.id)}
                    />
                  </div>
                </Paper>

                {editopen ? (
                  <Paper
                    className={classes.editprofile}
                    style={{
                      backgroundColor: "black",
                      position: "absolute",
                      top: "110px",
                    }}
                  >
                    <form onSubmit={submitHandl}>
                      <TextField
                        variant="standard"
                        fullWidth
                        multiline
                        rows={2}
                        label="Bio"
                        value={bio}
                        onChange={(z) => setBio(z.target.value)}
                        color="secondary"
                        style={{
                          zIndex: "1000",
                          backgroundColor: "white",
                          marginBottom: "10px",
                        }}
                      ></TextField>
                      <TextField
                        variant="standard"
                        fullWidth
                        color="secondary"
                        value={location}
                        onChange={(z) => setLocation(z.target.value)}
                        style={{ zIndex: "1000", backgroundColor: "white" }}
                        label="location"
                      ></TextField>
                      <Button
                        onClick={() => submitHandler(e.id)}
                        style={{
                          color: "white",
                          zIndex: "1000",
                          marginLeft: "180px",
                          cursor: "pointer",
                          backgroundColor: "#EEC312",
                          marginTop: "10px",
                        }}
                      >
                        Update
                      </Button>
                    </form>
                  </Paper>
                ) : null}
                
                <hr
                  style={{
                    border: "1px solid #CBCCCE",
                    width: "250px",
                    marginTop: "18px",
                  }}
                />
              </Card>
            </>
          );
        })}
        <Paper style={{ backgroundColor: "black" }}>
          <Mytab />
        </Paper>
      </div>
    </>
  );
}

export default Myprofile;
