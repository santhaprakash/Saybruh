import { addDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { temp } from "../firebase";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "../Phonestyles/Addpoststyles.css";
import { Box, Button } from "@mui/material";
import Main from "./Main";
function Addpost() {
  const [desc, setDesc] = useState("");
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const username = localStorage.getItem("username");
  const userimage = JSON.parse(localStorage.getItem("userimage"));
  //posts
  const handlePostsubmit = (e) => {
    e.preventDefault();
    console.log("done");
    setDesc(" ");
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    //   console.log(file.name)

    const storageRef = ref(storage, `images/${file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((e) => {
        addDoc(temp, {
          img: e,
          userId: user.uid,
          description: desc,
          comment: [],
          likes: [],
          createdAt: Timestamp.now(),
          userName: username,
          userImage: userimage.userImage,
        });
        alert("Post added successfully")
      });
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
    <Main />
      <Box sx={style}>
        <div className="addpost-main" style={{ marginTop: "-10px" }}>
          <form onSubmit={handlePostsubmit} className="phone-addpost-form">
            <h3 style={{ paddingBottom: "10px", color: "white" }}>
              Let's Post something..
            </h3>
            <input
              className="phone-input"
              placeholder="Caption..!"
              size="small"
              label="Caption"
              style={{ display: "none" }}
              style={{ marginBottom: "18px" }}
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={handleFile}
              />
              <AddPhotoAlternateIcon style={{ fontSize: "30px" }} />
            </label>

            <Button
              variant="contained"
              size="medium"
              onClick={handlePostsubmit}
              style={{
                backgroundColor: "#EEC312",
                color: "black",
                marginTop: "18px",
                marginBottom: "18px",
              }}
            >
              ADD POST
            </Button>
          </form>
        </div>
      </Box>
    </>
  );
}

export default Addpost;
