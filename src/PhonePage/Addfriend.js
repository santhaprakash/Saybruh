import React, { useState, useEffect } from "react";
import {
  doc,
  query,
  where,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { tempcollect } from "../firebase";
import { Button, Grid, Typography, Card, Avatar, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../Phonestyles/Addpoststyles.css";
function Addfriend() {
  const [suggested, setSuggested] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const [search, setSearch] = useState("");
  const na = query(tempcollect, where("userId", "!=", user.uid));
  const temp = query(tempcollect, where("userId", "==", user.uid));
  const [editid, setEditid] = useState(0);

  // getting data

  useEffect(() => {
    onSnapshot(na, tempcollect, (e) => {
      const data = [];
      e.docs.map((s) => {
        data.push({ ...s.data(), id: s.id });
      });
      setSuggested(data);
    });
  }, []);

  // follow handler
  onSnapshot(temp, tempcollect, (e) => {
    e.docs.map((s) => {
      setEditid(s.id);
    });
  });
  const followHandler = (e) => {
    console.log(editid);
    const docRef = doc(tempcollect, e.id);
    updateDoc(docRef, {
      followers: arrayUnion(user.uid),
    });
    const docRef2 = doc(tempcollect, editid);
    updateDoc(docRef2, {
      folowing: arrayUnion(e.userId),
    });
  };
  const useStyles = makeStyles((theme) => ({
    "@media (max-width:325px)": {
      typo: {
        fontSize: "20px !important",
      },
    },
  }));
  const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };
  const classes = useStyles();
  return (
    <>
      <Box sx={style}>
        <div>
          <Typography
            className={classes.typo}
            style={{
              color: "white",
              fontFamily: "Lora",
              fontSize: "21px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Let's Connect to the world...
          </Typography>
          <input
            className="friend-search"
            type="text"
            value={search}
            style={{ marginBottom: "10px" }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search friends"
          />
          {suggested
            .filter((z) => z.userName.toLowerCase().includes(search))
            .map((e, i) => {
              var flag = 0;
              return (
                <Grid
                  key={i}
                  style={{
                    marginBottom: "10px",
                    overflowY: "scroll",
                  }}
                >
                  {e.followers.length
                    ? e.followers.map((follow) => {
                        if (follow === user.uid) {
                          flag = 1;
                        }
                      })
                    : null}

                  {!flag ? (
                    <Card
                      style={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        backgroundColor: "black",
                      }}
                      spacing={3}
                    >
                      <Avatar
                        style={{ width: "37px", height: "37px" }}
                        src={e.userImage}
                      ></Avatar>

                      <Typography
                        style={{
                          color: "#CBCCCE",
                          fontFamily: "Lora",
                          fontSize: "20px",
                        }}
                      >
                        {e.userName}
                      </Typography>

                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => followHandler(e)}
                        style={{
                          fontFamily: "'Lora', serif",
                          width: "30px",
                          height: "30px",
                          padding: "13px",
                        }}
                      >
                        follow
                      </Button>
                    </Card>
                  ) : null}
                </Grid>
              );
            })}
        </div>
      </Box>
    </>
  );
}

export default Addfriend;
