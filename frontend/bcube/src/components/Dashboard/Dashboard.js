import React, { Component } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../Cards';
import './Container.css'
import ErrorBoundary from '../ErrorBoundary';

 class Dashboard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      page: 0,
      Videos: [],
      deleteStatusVideo: false,
      editStatusVideo: false,
    }
    this.handlePreviousPage = this.handlePreviousPage.bind(this)
    this.handleNextPage = this.handleNextPage.bind(this)
  }

  componentDidMount(){
    const token = sessionStorage.getItem("token")
    const { page } = this.state

    if (token) {

      if (this.props.videos.length === 0) {
        // Fetch data only if the data for the current page is not available
        this.props.getVideo({ token, page });


      }

      if (this.props.videos.length !== 0) {
        this.setState({ Videos: this.props.videos[page].data });
      }


  }
}

componentDidUpdate(prevProps){
  const { page, deleteStatusVideo, editStatusVideo } = this.state;
  const { isLogin } = this.props
  const token = sessionStorage.getItem("token")

  if (!prevProps.isLogin && isLogin && token) {
    toast.success('Login successful!', { autoClose: 3000 });
  }





  if (token && prevProps.isLogin !== this.props.isLogin) {

    this.props.getVideo({ token, page });
    this.setState({ Videos: this.props.videos })
  }

  // if (token && prevProps.editStatus !== this.props.editStatus) {
  //   this.props.getVideo({ token })
  // }
  if (prevProps.videos !== this.props.videos) {
    this.setState((prevState) => ({
      Videos: [...prevState.Videos, ...this.props.videos[page].data],
    }));
  }
  if (prevProps.searchVideos !== this.props.searchVideos) {
    this.setState((prevState) => ({
      Videos: [...this.props.searchVideos],
    }));
  }
  if (prevProps.updateStatus !== this.props.updateStatus) {
    this.setState({
      page: 0,
      editStatusVideo: true
    })

    this.setState((prevState) => ({
      Videos: [...this.props.videos[page].data],
    }));


    if (editStatusVideo) {
      if (this.props.updateStatus === true) {


        toast.success('edit successful!', {
          autoClose: 3000, onClose: () => {
            this.setState({
              editStatusVideo: false
            })
          }
        });
      } else if (this.props.updateStatus === false) {
        toast.error('edit unsuccesfull', {
          autoClose: 3000, onClose: () => {
            this.setState({
              editStatusVideo: false
            })
          }
        })
      }
    }
  }

  if (token && prevProps.deleteStatus !== this.props.deleteStatus) {
    this.setState({
      page: 0,
      deleteStatusVideo: true
    })
    this.setState((prevState) => ({
      Videos: [...this.props.videos[page].data],
    }));

    if (deleteStatusVideo) {
      if (this.props.deleteStatus) {
        toast.success('Delete successful!', {
          autoClose: 3000, onClose: () => {
            this.setState({
              deleteStatusVideo: false
            })
          }
        })
      } else if (!this.props.deleteStatus) {
        toast.error('Delete unsuccessful!', {
          autoClose: 3000, onClose: () => {
            this.setState({
              deleteStatusVideo: false
            })
          }
        })
      }

    }


  }


}





handlePreviousPage() {
  this.setState((prevState) => ({
    page: prevState.page - 1,
  }));
}

handleNextPage() {

  const token = sessionStorage.getItem("token");
  const { page } = this.state;
  const nextPage = page + 1;

  this.setState({
    page: nextPage,
  })
  this.props.getVideo({ token, page: nextPage });
  ;
}





render() {
  const { videos, isLogin, loginForm, isSuccess } = this.props
  const { page } = this.state


  const { Videos } = this.state
  console.log(Videos)

  // const totalPages = videos.length
  const token = sessionStorage.getItem("token");


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

      {Videos.length !== 0 && Videos.map((video) => (
        <Card key={video._id} element={video} page={page} />
      ))}
      
      <div className="load-more-container">
        <button className="load-more-button" onClick={this.handleNextPage}>
          Load More
        </button>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
    
  )
}

}


export default (Dashboard)