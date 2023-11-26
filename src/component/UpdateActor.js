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
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Update() {
  const actor = useParams();

  const [open, setOpen] = useState(false);

  const [APIData, setAPIData] = useState([]);
  const getActorsUrl = `https://65360a16c620ba9358ece78a.mockapi.io/Lab7/${actor.id}`;

  useEffect(() => {
    fetch(getActorsUrl)
      .then((response) => response.json())
      .then((data) => setAPIData(data))
      .catch((error) => console.log(error.message));
  }, [getActorsUrl]);

  const handleClose = () => {
    setOpen(false);
  };
  const putActorUrl = "https://65360a16c620ba9358ece78a.mockapi.io/Lab7";

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: APIData,

    // values : {APIData},

    // onSubmit: (values) => {
    //   values.createdAt = new Date(values.createdAt);
    //   fetch(`${putActorUrl}/${actor.id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => setOpen(true))
    //     .catch((error) => console.log(error.message));
    // },
    onSubmit: async (values) => {
      values.createdAt = new Date(values.createdAt);
      try {
        await axios.put(`${putActorUrl}/${actor.id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setOpen(true);
      } catch (error) {
        console.log(error.message);
      }
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
      clip: Yup.string()
        .url(
          "Please enter a valid url have format: https://www.youtube.com/embed/(your_youTube_video_id)"
        )
        .required("Required.")
        .typeError("Please enter a valid url "),
    }),
  });

  return (
    <div>
      <h1 className="font-pages">Update Actor Information</h1>

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
          {formik.errors.avatar && (
            <Typography variant="caption" color="red">
              {formik.errors.img}
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

        <Button variant="contained" size="small" type="submit">
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
              <AlertTitle>Update successful!</AlertTitle>
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
