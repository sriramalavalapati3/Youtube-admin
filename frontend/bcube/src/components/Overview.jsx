import React, { Component } from "react";
import { connect } from "react-redux";
import { overviewVideo } from "../Redux/overviewReducer/action";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import "./styles/Overview.css";
const mapStateToProps = (state) => {
  return {
    Video: state.overviewReducer.video,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    overviewVideo: (obj) => dispatch(overviewVideo(obj)),
  };
};



class Overview extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem("token");
    let { encryptedVideoId } = this.props.params;
    const originalVideoId = CryptoJS.AES.decrypt(
      encryptedVideoId,
      "BBB_secretD_key"
    ).toString(CryptoJS.enc.Utf8);

    this.props.overviewVideo({ originalVideoId, token });
  }

  render() {
    const { Video } = this.props;
    var strDate = `${Video.createdAt}`;
    var date = strDate.substring(0, 10);

    return (
      <div id="overview">
        <iframe
          src={Video.video}
          frameborder="0"
          width="100%"
          height="400px"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          title={"overviewVideo"}
        ></iframe>
        <h2>
          Title: <span>{Video.Title}</span>
        </h2>
        <h3>Description:{Video.description}</h3>
        <h5>uploadedAt:{date}</h5>
      </div>
    );
  }
}

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Overview));
