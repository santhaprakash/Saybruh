import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { temp } from "../firebase";
import { Link } from "react-router-dom";
import {
  Card,
  Collapse,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
// mui theme
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Feed3() {
  const [com, setCom] = useState();
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [commentopen, setCommentopen] = useState("");
  //mui
  const handleExpandClick = (e) => {
    setCommentopen(e);
    setExpanded(!expanded);
  };

  //localstorage
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const username = localStorage.getItem("username");
  const userimage = JSON.parse(localStorage.getItem("userimage"));
  //query and geeting data
  const na = query(temp, orderBy("createdAt", "desc"));
  useEffect(() => {
    onSnapshot(na, temp, (e) => {
      const post = [];
      e.docs.map((s) => {
        post.push({ ...s.data(), id: s.id });
      });
      setData(post);
    });
  });

  // comment
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleClick = (e) => {
    if (com === "") {
      alert("comment should not be empty");
    } else {
      console.log(com);
      const docRef = doc(temp, e.id);
      updateDoc(docRef, {
        comment: arrayUnion({
          name: username,
          msg: com,
          avatar: userimage.userImage,
        }),
      });
      setCom("");
    }
  };
  const handleCom = (e) => {
    setCom(e.target.value);
  };

  //handlelike events

  //add like
  const handleAddlike = (e) => {
    const likeRef = doc(temp, e);

    updateDoc(likeRef, {
      likes: arrayUnion(user.uid),
    });
  };
  //remove like

  const handleRemovelike = (e) => {
    const likeRef = doc(temp, e);

    updateDoc(likeRef, {
      likes: arrayRemove(user.uid),
    });
  };

  //delete handler
  const deleteHandler = (e) => {
    const tempc = doc(temp, e);
    deleteDoc(tempc).then(() => {});
  };

  const useStyles = makeStyles((theme) => ({
    "@media (min-width:300px) and (max-width:320px)": {
      delete: {
        position: "absolute !important",
        top: "-48px !important",
        left: "250px !important",
      },
    },
    "@media (min-width:320px) and (max-width:330px)": {
      delete: {
        position: "absolute !important",
        top: "-48px !important",
        left: "255px !important",
      },
    },
    "@media (min-width:330px) and (max-width:339px)": {
      delete: {
        position: "absolute !important",
        top: "-48px !important",
        left: "262px !important",
      },
    },
    "@media (min-width:340px) and (max-width:349px)": {
      delete: {
        position: "absolute !important",
        top: "-48px !important",
        left: "270px !important",
      },
    },
    "@media (min-width:350px)": {
      delete: {
        position: "absolute !important",
        top: "-48px !important",
        left: "280px !important",
      },
    },
    "@media (min-width:420px)": {
     card:{
       marginLeft:'0px !important',
 marginRight: '0px !important'
     }
    },
  }));

  const classes = useStyles();
  return (
    <>
      {data.map((e, index) => {
        return (
          <Card
            sx={{ maxWidth: 395 }}
            className={classes.card}
            style={{
              paddingLeft: "4px",
              paddingRight: "4px",
              marginBottom: "12px",
              fontFamily: "'Lora', serif",
              backgroundColor: "#000000",
              padding: "5px",
              marginLeft: "-15px",
              marginRight: "-15px",
            }}
            key={index}
          >
            
              <Link to={`/${e.userId}`} style={{ textDecoration: "none" }}>
                <Grid style={{ display: "flex", flexDirection: "row" }}>
                  <Avatar
                    style={{ margin: "8px", width: "35px", height: "35px" }}
                    src={e.userImage}
                  >
                  </Avatar>
                  <Grid
                    style={{
                      dipslay: "flex",
                      flexDirection: "column",
                      color: "black",
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "Lora",
                        fontSize: "17px",
                        margin: "6px",

                        color: "white",
                        marginTop: "12px",
                      }}
                    >
                      {e.userName}
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
            {e.userId === user.uid ? (
              <IconButton>
                <DeleteIcon
                  className={classes.delete}
                  sx={{ fontSize: "30px" }}
                  style={{ color: "white" }}
                  onClick={() => deleteHandler(e.id)}
                />
              </IconButton>
            ) : null}

            <CardMedia
              component="img"
              height="264"
              image={e.img}
              alt=""
              style={{ borderRadius: "5px", marginTop: "6px" }}
            />
            <CardContent>
              <Typography
                variant="body2"
                style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
              >
                {e.description}
              </Typography>
            </CardContent>
            <CardActions style={{ marginTop: "-10px" }}>
              {e.likes.includes(user.uid) ? (
                <IconButton>
                  <FavoriteIcon
                    style={{ color: "#EEC312" }}
                    onClick={() => handleRemovelike(e.id)}
                  />
                </IconButton>
              ) : (
                <IconButton>
                  <FavoriteIcon
                    onClick={() => handleAddlike(e.id)}
                    style={{ color: "white" }}
                  />
                </IconButton>
              )}
              <br />
              {e.likes.length ? (
                <Typography style={{ fontFamily: "Lora", color: "#CBCCCE" }}>
                  {e.likes.length} likes
                </Typography>
              ) : (
                <Typography style={{ fontFamily: "Lora", color: "#CBCCCE" }}>
                  {e.likes.length} like
                </Typography>
              )}

              <ExpandMore
                expand={expanded}
                onClick={() => handleExpandClick(e.id)}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <CommentIcon style={{ color: "#EEC312" }} />
              </ExpandMore>

              {e.comment.length ? (
                <Typography
                  style={{
                    fontFamily: "Lora",
                    color: "#CBCCCE",
                    marginLeft: "-2px",
                  }}
                >
                  {e.comment.length} Comments
                </Typography>
              ) : (
                <Typography
                  style={{
                    fontFamily: "Lora",
                    color: "#CBCCCE",
                    marginLeft: "-2px",
                  }}
                >
                  {e.comment.length} Comment
                </Typography>
              )}
            </CardActions>
            {commentopen === e.id ? (
              <>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <input
                        className="comment-input"
                        label="comment"
                        size="small"
                        key={index}
                        name={e.id}
                        color="secondary"
                        value={com}
                        type="text"
                        onChange={handleCom}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleClick(e)}
                      >
                        Add
                      </Button>
                    </form>
                    {e.comment ? (
                      e.comment.map((s, i) => {
                        return (
                          <Grid
                            key={i}
                            style={{ marginTop: "20px", paddingLeft: "10px" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: "10px",
                              }}
                            >
                              <Avatar
                                src={s.avatar}
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  marginRight: "8px",
                                }}
                              ></Avatar>
                              <Typography
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Lora",
                                  color: "white",
                                  marginTop: "2px",
                                }}
                              >
                                {s.name}
                              </Typography>
                            </div>
                            <Typography
                              style={{
                                fontSize: "19px",
                                fontFamily: "Lora",
                                color: "white",
                                marginLeft: "30px",
                              }}
                            >
                              {s.msg}
                            </Typography>
                          </Grid>
                        );
                      })
                    ) : (
                      <div />
                    )}
                  </CardContent>
                </Collapse>
              </>
            ) : null}
          </Card>
        );
      })}
    </>
  );
}

export default Feed3;
