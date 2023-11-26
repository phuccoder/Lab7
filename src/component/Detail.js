import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardContent } from "@mui/material";
import { Card, Grid } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Box, Paper } from "@mui/material";
import axios from "axios";

export default function Detail() {
  const actor = useParams();

  const [APIData, setAPIData] = useState([]);
  const getStaffsUrl = `https://65360a16c620ba9358ece78a.mockapi.io/Lab7/${actor.id}`;

  // useEffect(() => {
  //   fetch(getStaffsUrl, { method: "GET" })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setAPIData(data);
  //     })
  //     .catch((error) => console.log(error.message));
  // }, [getStaffsUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getStaffsUrl);
        setAPIData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [getStaffsUrl]);

  return (
    <div style={{ padding: "10px" }}>
      <h1 className="detail-title">Detail</h1>
      <Grid container rowSpacing={2}>
        <Grid
          className="parent"
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Card className="child" sx={{ maxWidth: 570, flex: 1 }}>
            <CardMedia
              sx={{ height: 600 }}
              image={APIData.img}
              title="green iguana"
            />
          </Card>

          <Box
            component={Paper}
            width="50%"
            padding="2em"
            margin="1em auto"
            elevation={3}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <strong>Name:</strong> {APIData.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <strong>Birthplace:</strong> {APIData.address}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <strong>Age:</strong> {APIData.age}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <strong>Information:</strong> {APIData.info}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <br />
                <strong>Top 10 {APIData.name} Movies: </strong>
                <br />
                <iframe
                  width="660"
                  height="360"
                  src={APIData.clip}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
