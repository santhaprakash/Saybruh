import React, { useEffect, useState } from "react";
import { Card, Modal } from "@mui/material";
import { storage, tempcollect } from "../firebase";
import LogoutIcon from "@mui/icons-material/Logout";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import "../Phonestyles/Feedstyles.css";
import Addfriend from "../PhonePage/Addfriend.js";
function Feed1() {
  const history = useHistory();

  const [filedata, setFiledata] = useState("");
  const [fileimage, setFileimage] = useState("");
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const temp1 = query(tempcollect, where("userId", "==", user.uid));
  useEffect(() => {
    onSnapshot(temp1, (e) => {
      e.docs.map((s) => {
        setFiledata(s.id);
        setFileimage(s.data().userImage);
      });
    });
  }, []);
  const handleStory = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `stories/${file.name}`);
    const userRef = doc(tempcollect, filedata);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((e) => {
        updateDoc(userRef, {
          stories: e,
        });
      });
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    console.log("hey");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("currentuser");
    history.push("/loginpage");
  };
  return (
    <>
      <Card
        style={{
          marginTop: "-15px",
          marginLeft: "-5px",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={handleStory}
            />
            <img className="phoneavatar" src={fileimage} alt="err"></img>
            <div
              style={{
                borderRadius: "50%",
                width: "15px",
                height: "19px",
                marginLeft: "33px",
                marginTop: "-23px",
              }}
            >
              <AddIcon style={{ color: "black", fontSize: "15px" }}></AddIcon>
            </div>
          </label>
          <LogoutIcon
            style={{
              color: "white",
              fontSize: "23px",
              marginTop: "13px",
              marginLeft: "20px",
            }}
            onClick={handleLogout}
          />
          <PersonAddIcon
            style={{ color: "#EEC312", fontSize: "30px", marginTop: "10px" }}
            onClick={handleOpen}
          />
          <Modal open={open} onClose={handleClose}>
            <Addfriend />
          </Modal>
        </div>
      </Card>
    </>
  );
}

export default Feed1;
