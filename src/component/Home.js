import { CardMedia } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export default function Home() {
  const [APIData, setAPIData] = useState([]);
  const getActorsUrl = "https://65360a16c620ba9358ece78a.mockapi.io/Lab7";
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userName = params.get("name");

  useEffect(() => {
    fetch(getActorsUrl)
      .then((response) => response.json())
      .then((data) => {
        setAPIData(
          data.sort((a, b) => {
            return a.age - b.age;
          })
        );
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h4"
        style={{ marginTop: "60px", zIndex: 1, color: "GrayText" }}
      >
        Home
      </Typography>
      {userName && (
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Welcome, {userName}!
        </Typography>
      )}
      <Typography variant="body1" style={{ marginBottom: "20px" }}>
        This is the Home page. It displays a list of the best actor members.
      </Typography>
      <Grid container spacing={3}>
        {APIData.map((actor) => (
          <Grid item xs={12} sm={6} md={4} key={actor.id}>
            <Card style={{ height: "100%" }}>
              <CardMedia
                style={{ height: "450px" }}
                image={actor.img}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <Link to={`detail/${actor.id}`}>
                    <a style={{ textDecoration: "none", color: "#000" }}>
                      {actor.name}
                    </a>
                  </Link>
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {actor.address}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {actor.age}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`detail/${actor.id}`}>
                  <Button variant="contained" color="primary">
                    Detail
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
