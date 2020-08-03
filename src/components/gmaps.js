import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Details from "./details";

// map class
class MainMap extends Component {
  state = {
    marker: { lat: 27, lng: 74 },
    load: false,
  };

  // to capture coordinates when a pin is droped
  onClick = (t, map, coord) => {
    const { latLng } = coord;
    let lat = latLng.lat();
    let lng = latLng.lng();

    this.setState({ marker: { lat, lng } });
  };

  // get initial position from your current geolocation
  // once fetched load map
  getloc() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({
          marker: { lat, lng },
          load: true,
        });
      },
      (err) => {
        alert("Please allow access to location.");
      },
      { enableHighAccuracy: true, maximumAge: 10000 }
    );
  }

  // to get your current location when component is mounted
  componentDidMount() {
    this.getloc();
  }

  render() {
    const style = {
      width: "100%",
      height: "90%",
    };

    // wait till data loads
    if (!this.state.load) {
      return "loading...";
    }

    // return JSX
    return (
      <div className='map-responsive'>
        <Map
          google={this.props.google}
          style={style}
          className={"map"}
          zoom={14}
          initialCenter={this.state.marker}
          onClick={this.onClick}
        >
          <Marker position={this.state.marker} />
        </Map>
        <Details position={this.state.marker} />
      </div>
    );
  }
}

// map component
const Gmap = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPAPIKEY,
})(MainMap);

export default Gmap;
