import React, { Component } from 'react'

import { connect } from 'react-redux';
import Card from './Card'

import { getVideo } from '../Redux/videoReducer/action'
import './styles/Container2.css'
const mapStateToProps = (state) => {
  return {
    videos: state.videoReducer.videos,
    isLoading: state.videoReducer.isLoading,
    deleteStatus: state.deleteReducer.status,
    editStatus: state.updateReducer.status,
    isLogin: state.loginReducer.isLogin,
    isSuccess: state.videoReducer.isSuccess
  };
};




class Container2 extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       page:0,
    }

    this.handlePreviousPage=this.handlePreviousPage.bind(this)
    this.handleNextPage=this.handleNextPage.bind(this)
  }

  componentDidMount() {
    const token = sessionStorage.getItem("token")
    
    if (token) {
      this.props.getVideo({ token });
    }
  }

  componentDidUpdate(prevProps) {
    const token = sessionStorage.getItem("token")
    if (token && prevProps.isLogin !== this.props.isLogin) {
      console.log("hi")
      this.props.getVideo({ token });
    }
    if (token && prevProps.deleteStatus !== this.props.deleteStatus) {
      this.props.getVideo({ token });
    }
    if (token && prevProps.editStatus !== this.props.editStatus) {
      this.props.getVideo({ token })
    }

  }

  handlePreviousPage(){
    this.setState((prevState) => ({
      page: prevState.page - 1,
    }));
  }

  handleNextPage(){
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  }

  render() {
    const { videos, isLogin, loginForm, isSuccess } = this.props
    const token = sessionStorage.getItem("token");
    const {page}=this.state
    const totalPages=videos.length
    if (!token) {
      if (!loginForm) {
        return <div className="centered-message"><h1>Please Login to Your Account</h1></div>
      }

    }
 
    if (!token) {
      return null;
    }

    if (videos.length === 0 && isLogin && isSuccess) {
      // Display a message when there are no videos available
      return <div className="centered-message"><h1>Sorry, there is no longer data available</h1></div>;
    }

    return (


      <div className='cnt-2'>
         {videos[page]&&videos[page].data.map((video) => (
          <Card key={video._id} element={video}/>
        ))}
         <div className="pagination-controls">
          <button onClick={this.handlePreviousPage} disabled={page === 0}>
            Previous
          </button>
          <span>Page {page + 1} of {totalPages}</span>
          <button onClick={this.handleNextPage} disabled={page === totalPages - 1}>
            Next
          </button>
        </div>
      </div>
    )
  }

}
const mapDispatchToProps = (dispatch) => {
  return {

    getVideo: (obj) => dispatch(getVideo(obj)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Container2)
