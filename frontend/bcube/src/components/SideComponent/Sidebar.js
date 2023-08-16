import React, { Component } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import "./Sidebar.css";
import { Link } from "react-router-dom";




class Sidebar extends Component {
  render() {
    const token = sessionStorage.getItem("token"); // Example: You need to replace this with your actual token check

    const { login } = this.props;

    return (
      <div className="s-cont">
        {token || login ? (
          <Link to="/Dashboard">
            <div id="Dashboard">
              <LuLayoutDashboard />
              Dashboard
            </div>
          </Link>
        ) : null}
        {token || login ? (
          <Link to="/upload">
            <div id="upload">
              <AiOutlineCloudUpload />
              upload
            </div>
          </Link>
        ) : null}
      </div>
    );
  }
}
export default (Sidebar);
