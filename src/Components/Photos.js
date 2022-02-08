import { arrayRemove,arrayUnion,deleteDoc,doc, onSnapshot,orderBy,query,updateDoc} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { temp} from "../firebase";
import { Link } from "react-router-dom";
import "./Photos.css";
import { styled } from "@mui/material/styles";
import { Card,Collapse,CardMedia,CardContent,CardActions,Avatar,IconButton,Typography,Button,Grid,TextField,} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
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

function Photos() {
  const [com, setCom] = useState();
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = useState(false);
  const[commentopen,setCommentopen]=useState("")
  //mui
  const handleExpandClick = (e) => {
    setCommentopen(e)
    setExpanded(!expanded);
  };

 

        //localstorage
        const user = JSON.parse(localStorage.getItem("currentuser"));
        const username=localStorage.getItem("username")
  
        //query and geeting data
        const na=query(temp,orderBy('createdAt','desc'))
        useEffect(() => {
          onSnapshot(na,temp, (e) => {
            const post = [];
            e.docs.map((s) => {
              post.push({ ...s.data(), id: s.id });
            });
            setData(post);
          });
        },[]);
            
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
            comment: arrayUnion({ name:username, msg: com }),
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
    deleteDoc(tempc).then(() => {
      alert("deleted sucessfully");
    });
  };

  return (
    <>
      {data.map((e, index) => {
        return (
          <Card
            sx={{ maxWidth: 395 }}
            style={{
              paddingLeft: "4px",
              paddingRight: "4px",
              marginBottom: "12px",
              fontFamily: "'Lora', serif",
            }}
            key={index}
          >
        
              <Link
                to={`/${e.userId}`}
                style={{ textDecoration: "none" }}
              >
                <Grid style={{ display: "flex", flexDirection: "row" }}>
                  <Avatar
                    style={{ margin: "8px", width: "55px", height: "55px" }}
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
                        fontSize: "21px",
                        marginTop: "20px",
                        fontWeight: "bold",
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
                  sx={{ fontSize: "32px" }}
                  style={{ marginLeft: "340px", marginTop: "-95px" }}
                  onClick={() => deleteHandler(e.id)}
                />
              </IconButton>
            ) : null}

            <CardMedia component="img" height="254" image={e.img} alt="" />
            <CardContent>
              <Typography
                variant="body2"
                style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}
              >
                {e.description}
              </Typography>
            </CardContent>
            <CardActions style={{ marginTop: "-10px" }}>
              {e.likes.includes(user.uid) ? (
                <IconButton>
                  <FavoriteIcon
                    style={{ color: "red" }}
                    onClick={() => handleRemovelike(e.id)}
                  />
                </IconButton>
              ) : (
                <IconButton>
                  <FavoriteIcon onClick={() => handleAddlike(e.id)} />
                </IconButton>
              )}
              <br />
              {e.likes.length ? (
                <Typography style={{ fontFamily: "Lora" }}>
                  {e.likes.length} likes
                </Typography>
              ) : (
                <Typography style={{ fontFamily: "Lora" }}>
                  {e.likes.length} like
                </Typography>
              )}
             
              <ExpandMore
                expand={expanded}
                onClick={()=>handleExpandClick(e.id)}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <CommentIcon />
              </ExpandMore>
              
                  
            </CardActions>
            {
              commentopen === e.id?<>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="comment"
                    size="small"
                    key={index}
                    name={e.id}
                    value={com}
                    type="text"
                    onChange={handleCom}
                    style={{ paddingRight: "10px" }}
                  />
                  <Button variant="contained" onClick={() => handleClick(e)}>
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
                        <Typography
                          style={{ fontSize: "13px", fontFamily: "Lora" }}
                        >
                          {s.name}
                        </Typography>
                        <Typography
                          style={{ fontSize: "22px", fontFamily: "Lora" }}
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
              </>:null
            }
          
          </Card>
        );
      })}
    </>
  );
}

export default Photos;
