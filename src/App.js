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
      cityLon: "",
      cityLat: "",
      displayName: "",
      error: false,
      errorMessage: "",
    };
  }

  // handlers
  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value,
    });
  };

  getCityData = async (e) => {
    e.preventDefault();

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

    let cityData = await axios.get(url);

    let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=14&size=400x400`;
    console.log("MapMapMap", cityData.data);


    // console.log(cityData.data[0]);
    // console.log(cityData);

    this.setState({
      displayName: cityData.data[0].display_name,
      cityLon: cityData.data[0].lon,
      cityLat: cityData.data[0].lat,
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
        {/* <form onSubmit={this.getCityData}>
          <label>
            Pick a City!
            <input type="text" onInput={this.handleInput} />
          </label>
          <button type="submit">Explore!</button>
        </form> */}

        <Form onSubmit={this.getCityData}>
          <Form.Label>
            Pick a City!
            <input type="text" onInput={this.handleInput} />
          </Form.Label>
          <Button type="submit">Explore!</Button>
        </Form>

        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={this.image} />
          <Card.Body>
            <Card.Title>{this.state.displayName}</Card.Title>
            <Card.Text>
              <ul>{this.state.displayName}</ul>
              <ul>{this.state.cityLon}</ul>
              <ul>{this.state.cityLat}</ul>
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>

        {/* {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : <ul></ul>} */}
      </>
    );
  }
}

export default App;
