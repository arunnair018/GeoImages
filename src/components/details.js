import React from "react";
import { Component } from "react";
import axios from "axios";
import Album from "./album";

// details component
class Details extends Component {
  state = {
    data: {},
    load: false,
    marker: this.props.position,
    pages: 2,
    page: 1,
  };

  // to get detail from flickr api based on geo coordinates
  getDetails = (page) => {
    var bodyFormData = new FormData();
    bodyFormData.set("api_key", process.env.REACT_APP_FLICKRAPIKEY);
    bodyFormData.set("lat", this.state.marker.lat);
    bodyFormData.set("lon", this.state.marker.lng);
    bodyFormData.set("per_page", "10");
    bodyFormData.set("page", page);
    bodyFormData.set("radius", "30");
    axios({
      method: "post",
      url:
        "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=?",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: bodyFormData,
    })
      .then((res) => {
        this.setState({
          pages: res.data.photos.pages,
          data: res.data.photos,
          load: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update component when new coordinates are recieved
  componentDidUpdate(prevProps) {
    if (this.props.position !== prevProps.position) {
      this.setState({ marker: this.props.position });
      this.getDetails(1);
    }
  }

  // get data for initial state
  componentDidMount() {
    this.getDetails(1);
  }

  // get data when next page is clicked
  nextPage = (e) => {
    this.getDetails(parseInt(e.target.id) + 1);
    this.setState({ page: parseInt(e.target.id) + 1 });
  };

  // return JSX
  render() {
    if (!this.state.load) {
      return "loading...";
    }
    let pages = [...Array(this.state.pages).keys()];
    return (
      <div className='details'>
        <Album data={this.state.data.photo} />
        <span className='pagenumber'>page no.: {this.state.page - 1}</span>
        <center>
          <div className='navigation'>
            <ul className='pagination example'>
              {pages.map((item) => {
                return (
                  <li className='page-item' key={item}>
                    <span
                      className='page-link'
                      onClick={this.nextPage}
                      id={item}
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </center>
      </div>
    );
  }
}

export default Details;
