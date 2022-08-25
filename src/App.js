"use strict";

import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Form } from "react-bootstrap";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: [],
      cityLat: "",
      cityLon: "",
      displayName: "",
      displayMap: "",
      display: "",
      error: false,
      errorMessage: "",
    };
  }

  // handlers
  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value,
      display: false,
    });
  };

  getCityData = async (e) => {
    e.preventDefault();

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

    let cityData = await axios.get(url);

    let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=10`;
    console.log("MapMapMap", cityData.data);

    // let weatherURL = `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}`;
    // let weatherData = await axios.get(weatherURL)

    // console.log(cityData.data[0]);
    // console.log(cityData);

    this.setState({
      displayName: cityData.data[0].display_name,
      cityLat: cityData.data[0].lat,
      cityLon: cityData.data[0].lon,
      displayMap: cityMap,
    });
  };

  catch(error) {
    this.setState({
      error: true,
      errorMessage: `${error.message}`,
    });
  }

  handleClose = () => {
    this.setState({ error: false });
  };

  render() {
    console.log("app.state: ", this.state);
    return (
      <>

        <Form onSubmit={this.getCityData}>
          <Form.Label>
            <input placeholder="Pick a City!" type="text" onInput={this.handleInput} />
          </Form.Label>
          <Button type="submit">Explore!</Button>
        </Form>

        <Card style={{ width: "22rem" }} onClick>
          <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=14&size=500x600`} />
          <Card.Body>
            <Card.Title>City Explorer</Card.Title>
            <Card.Text>
              <div>City: {this.state.displayName} </div>
              <div>Latitude: {this.state.cityLat}</div>
              <div>Longitude: {this.state.cityLon}</div>
            </Card.Text>
          </Card.Body>
        </Card>

      </>
    );
  }
}

export default App;
