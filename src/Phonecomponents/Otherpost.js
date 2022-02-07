import { onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { temp } from "../firebase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import "../Phonestyles/Otherpoststyles.css";
function Otherpost({ id }) {
  const na = query(temp, where("userId", "==", id));
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
        className="otherroot"
      >
        {mypost.length ? (
          mypost.map((e) => {
            return (
              <div className="othercontainer">
                <img
                alt=""
                  src={e.img}
                  style={{
                    width: "130px",
                    height: "135px",
                    borderRadius: "5px",
                  }}
                ></img>
                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  className="otheroverlay otheroverlay-left "
                >
                  <FavoriteIcon
                    style={{ color: "white", fontSize: "25px" }}
                    className="otheroverlay-text"
                  />
                  <h2
                    style={{
                      color: "white",
                      fontSize: "25px",
                      marginTop: "-8px",
                    }}
                    className="otheroverlay-text2"
                  >
                    {e.likes.length}
                  </h2>
                  <ModeCommentIcon
                    style={{ color: "white", fontSize: "25px" }}
                    className="otheroverlay-text3"
                  />
                  <h2
                    style={{
                      color: "white",
                      fontSize: "25px",
                      marginTop: "-8px",
                    }}
                    className="otheroverlay-text4"
                  >
                    {e.comment.length}
                  </h2>
                </div>
              </div>
            );
          })
        ) : (
          <h2 style={{ color: "white", marginLeft: "170px" }}>
            No posts yet..!
          </h2>
        )}
      </div>
    </>
  );
}

export default Otherpost;
