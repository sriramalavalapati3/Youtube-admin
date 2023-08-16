import React, { Component } from "react";
import "./Cards.css";

import { LuEdit } from "react-icons/lu";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CryptoJS from "crypto-js";
// import { shadows } from '@mui/system';

const styles = (theme) => ({
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 450,
    height: 300,
    gap: 15,
  },
  delteBox: {
    width: 400,
    height: 250,
  },
  buttonBox: {
    display: "flex",
    justifyContent: "space-between",
  },
});



class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFulltitle: false,
      showFullDescription: false,
      showDeleteConfirmation: false,
      showEditConfirm: false,
      videoUrl: "",
      videoTitle: "",
      videoDesc: "",
    };
    this.toggleTitle = this.toggleTitle.bind(this);
    this.showMore = this.showMore.bind(this);
    this.closeBox = this.closeBox.bind(this);
    this.openBox = this.openBox.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.videoDescChange = this.videoDescChange.bind(this);
    this.videoTitleChange = this.videoTitleChange.bind(this);
    this.videoUrlChange = this.videoUrlChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.generateEncryptedId = this.generateEncryptedId.bind(this);
  }

  generateEncryptedId(originalVideoId) {
    const encryptedVideoId = CryptoJS.AES.encrypt(
      originalVideoId,
      "BBB_secretD_key"
    ).toString();
    const encodedVideoId = encodeURIComponent(encryptedVideoId); // Encode the encrypted video ID
    return encodedVideoId;
  }

  ondeletebyid(element) {
    const { _id } = element;
    const { page } = this.props;

    const token = sessionStorage.getItem("token");
    console.log(element);
    this.props.deleteVideo({ _id, token, page });
    this.setState({
      showDeleteConfirmation: false,
    });
  }

  toggleTitle() {
    this.setState((prevState) => ({
      showFulltitle: !prevState.showFulltitle,
    }));
  }

  showMore() {
    this.setState((prevState) => ({
      showFullDescription: !prevState.showFullDescription,
    }));
  }

  closeBox() {
    this.setState({
      showDeleteConfirmation: false,
    });
  }

  openBox() {
    this.setState({
      showDeleteConfirmation: true,
    });
  }

  openForm(element) {
    this.setState({
      showEditConfirm: true,
      videoUrl: element.video,
      videoTitle: element.Title,
      videoDesc: element.description,
    });
  }

  closeForm() {
    this.setState({
      showEditConfirm: false,
    });
  }

  videoUrlChange(e) {
    this.setState({
      videoUrl: e.target.value,
    });
  }

  videoTitleChange(e) {
    this.setState({
      videoTitle: e.target.value,
    });
  }

  videoDescChange(e) {
    this.setState({
      videoDesc: e.target.value,
    });
  }

  saveChanges(element) {
    const { videoUrl, videoTitle, videoDesc } = this.state;
    const { page } = this.props;
    const token = sessionStorage.getItem("token");
    const { _id } = element;
    const obj = { videoUrl, videoTitle, videoDesc, _id, token, page };

    this.props.editVideo(obj);
    this.setState({
      showEditConfirm: false,
    });
  }

  render() {
    const { classes } = this.props;
    const { element } = this.props;
    const encryptedVideoId = this.generateEncryptedId(element._id);
    const {
      showFulltitle,
      showFullDescription,
      showDeleteConfirmation,
      showEditConfirm,
      videoUrl,
      videoTitle,
      videoDesc,
    } = this.state;
    const displayTitle = showFulltitle
      ? element.Title
      : element.Title.substring(0, 8);
    const showDescription = showFullDescription
      ? element.description
      : element.description.substring(0, 15);
    console.log("encrypted");

    return (
      <div>
        <div className="card">
          <div className="video-container">
            <iframe
              src={element.video}
              frameborder="0"
              allowfullscreen
              title={"cardVideo"}
            ></iframe>
          </div>
          <div className="d-cnt">
            <h3 onClick={this.toggleTitle}>
              {displayTitle}
              <span id="show">
                {showFulltitle ? "Show Less" : "Show More..."}
              </span>
            </h3>
            <div className="scrollable-paragraph">
              <p>{showDescription}</p>
            </div>
            {element.description.length > 10 && (
              <button onClick={this.showMore} className="show-more">
                {showFullDescription ? "Show Less" : "Show More"}
              </button>
            )}
            <Link to={`/overview/${encryptedVideoId}`} className="card-link">
              <p>overview</p>
            </Link>
            <div id="DAE">
              <button
                className="edit"
                onClick={() => {
                  this.openForm(element);
                }}
              >
                <LuEdit />
                EDIT
              </button>
              <button
                className="Delete"
                onClick={() => {
                  this.openBox();
                }}
              >
                <MdOutlineDeleteOutline />
                DELETE
              </button>
            </div>
          </div>
        </div>

        {/* Delete dialog box */}

        <Dialog
          open={showDeleteConfirmation}
          onClose={this.closeBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete confirmation</DialogTitle>
          <DialogContent className={classes.deleteBox}>
            <DialogContentText id="alert-dialog-description">
              Are You sure, You want to Delete
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeBox}>close</Button>
            <Button onClick={() => this.ondeletebyid(element)}>Delete</Button>
          </DialogActions>
        </Dialog>

        {/* Dailogue box for edit */}

        <Dialog
          className="Editbox"
          open={showEditConfirm}
          onClose={this.closeForm}
          style={{ margin: "auto" }}
          sx={{ boxShadow: 3 }}
        >
          <DialogTitle style={{ margin: "auto" }}>Edit Video</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <TextField
              label="video URL"
              name="videoUrl"
              value={videoUrl}
              onChange={this.videoUrlChange}
              fullWidth
              required
              InputLabelProps={{
                style: { color: "blue" }, // Apply inline style to change label color to blue
              }}
            />
            <TextField
              label="Video Title"
              name="videoTitle"
              value={videoTitle}
              inputProps={{
                maxLength: 20,
              }}
              onChange={this.videoTitleChange}
              fullWidth
              required
              InputLabelProps={{
                style: { color: "blue" }, // Apply inline style to change label color to blue
              }}
            />
            <TextField
              label="Video Description"
              name="videoDesc"
              value={videoDesc}
              onChange={this.videoDescChange}
              fullWidth
              required
              InputLabelProps={{
                style: { color: "blue" }, // Apply inline style to change label color to blue
              }}
            />
          </DialogContent>
          <DialogActions style={{ justifyContent: "space-between" }}>
            <Button onClick={this.closeForm} style={{ color: "red" }}>
              Cancel
            </Button>
            <Button onClick={() => this.saveChanges(element)}>Edit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}



export default(withStyles(styles)(Card));
