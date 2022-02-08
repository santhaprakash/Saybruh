import { onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { temp } from "../firebase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import "../Phonestyles/Addpoststyles.css";
function Mypost() {
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const na = query(temp, where("userId", "==", user.uid));
  const [mypost, setMypost] = useState([]);
  useEffect(() => {
    onSnapshot(na, (e) => {
      const posts = [];
      e.docs.map((s) => {
        posts.push({ ...s.data(), id: s.id });
      });
      setMypost(posts);
    });
  }, []);
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,0.2fr)",
          gridGap: "10px",
        }}
        className="Phoneroot"
      >
        {mypost.length ? (
          mypost.map((e) => {
            return (
              <div className="phonecontainer">
                <img
                  src={e.img}
                  alt=""
                  style={{
                    width: "130px",
                    height: "135px",
                    borderRadius: "5px",
                  }}
                ></img>
                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  className="phoneoverlay phoneoverlay-left "
                >
                  <FavoriteIcon
                    style={{ color: "white", fontSize: "25px" }}
                    className="phoneoverlay-text"
                  />
                  <h2
                    style={{
                      color: "white",
                      fontSize: "25px",
                      marginTop: "-8px",
                    }}
                    className="phoneoverlay-text2"
                  >
                    {e.likes.length}
                  </h2>
                  <ModeCommentIcon
                    style={{ color: "white", fontSize: "25px" }}
                    className="phoneoverlay-text3"
                  />
                  <h2
                    style={{
                      color: "white",
                      fontSize: "25px",
                      marginTop: "-8px",
                    }}
                    className="phoneoverlay-text4"
                  >
                    {e.comment.length}
                  </h2>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{width:'350px',display: "flex",
          flexDirection:'row',alignItems: 'center',justifyContent: 'center'}} className="mypost-edit">
          <h2 style={{ color: "white"}}>
            No posts yet..!
          </h2>
          </div>
        )}
      </div>
    </>
  );
}

export default Mypost;
