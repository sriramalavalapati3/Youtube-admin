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



  render() {
    const { videos, isLogin, loginForm, isSuccess } = this.props
    const token = sessionStorage.getItem("token")
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
        {videos.map((ele) => <Card key={ele.id} element={ele} />
        )}
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
