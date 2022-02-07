import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { temp } from "../firebase";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    onSnapshot(temp, (e) => {
      const post = [];
      e.docs.map((s) => {
        post.push({ ...s.data(), id: s.id });
      });
      setGallery(post);
    });
  }, []);

  return (
    <>
      <div>
        <Typography
          style={{
            fontSize: "22px",
            marginTop: "-10px",
            fontFamily: "Playfair Display",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Mansory
        </Typography>
        <Box
          sx={{ width: "100vw", height: "100vh", overflowY: "scroll" }}
          style={{ marginLeft: "-24px", zIndex: "1000" }}
        >
          <ImageList variant="masonry" cols={2} gap={3.5}>
            {gallery.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}`}
                  srcSet={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </div>
    </>
  );
}

export default Gallery;
