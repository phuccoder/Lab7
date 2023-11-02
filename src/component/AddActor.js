import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";

export default function Add() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const postActorUrl = "https://65360a16c620ba9358ece78a.mockapi.io/Lab7";
  const currDate = new Date();

  const formik = useFormik({
    initialValues: {
      img: "",
      name: "",
      age: "",
      address: "",
      info: "",
      createdAt: currDate,
      clip: "",
    },

    onSubmit: (values) => {
      values.createdAt = new Date(values.createdAt);
      fetch(postActorUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => setOpen(true))
        .catch((error) => console.log(error.message));
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(3, "Must be more 2 characters"),
      address: Yup.string()
        .required("Required.")
        .typeError("Please enter a address"),
      age: Yup.number()
        .integer()
        .required("Required.")
        .typeError("Please enter a valid number"),
      img: Yup.string()
        .url()
        .required("Required.")
        .typeError("Please enter a valid url"),
      createdAt: Yup.string()
        .required("Required.")
        .typeError("Please enter date"),
      info: Yup.string()
        .required("Required.")
        .min(10, "Must be more 10 characters"),
      clip: Yup.string()
        .url(
          "Please enter a valid url have format: https://www.youtube.com/embed/(your_youTube_video_id)"
        )
        .required("Required.")
        .typeError("Please enter a valid url"),
    }),
  });

  return (
    <div className="add-page">
      <h1 className="font-pages">Add New Actor</h1>
      <p className="font-pages-para">
        If you dont know any actor. Dont worry, here is a website that will help
        you :{" "}
        <a
          href="https://www.ranker.com/crowdranked-list/best-actors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Best Actors
        </a>
      </p>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <Typography variant="caption" color="red">
              {formik.errors.name}
            </Typography>
          )}
          <TextField
            label="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          {formik.errors.address && (
            <Typography variant="caption" color="red">
              {formik.errors.address}
            </Typography>
          )}
          <TextField
            label="age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
          />
          {formik.errors.age && (
            <Typography variant="caption" color="red">
              {formik.errors.age}
            </Typography>
          )}

          <TextField
            label="img"
            name="img"
            value={formik.values.img}
            onChange={formik.handleChange}
          />
          {formik.errors.img && (
            <Typography variant="caption" color="red">
              {formik.errors.img}
            </Typography>
          )}

          <TextField
            label="info"
            name="info"
            value={formik.values.info}
            onChange={formik.handleChange}
          />
          {formik.errors.info && (
            <Typography variant="caption" color="red">
              {formik.errors.info}
            </Typography>
          )}

          <TextField
            label="createdAt"
            name="createdAt"
            disabled
            value={formik.values.createdAt}
            onChange={formik.handleChange}
          />

          <TextField
            label="clip"
            name="clip"
            value={formik.values.clip}
            onChange={formik.handleChange}
          />
          {formik.errors.clip && (
            <Typography variant="caption" color="red">
              {formik.errors.clip}
            </Typography>
          )}
        </Stack>

        <Button
          variant="contained"
          size="small"
          type="submit"
          sx={{ margin: "5px 0" }}
        >
          Save
        </Button>
      </form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Congraturation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle>Adding successful!</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              Dashboard
            </Link>
          </Button>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
