import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonData: [],
      city: "",
      cityData: [],
      cityLon: "",
      cityLat: "",
      error: false,
      errorMessage: "",
    };
  }

  // City Data handlers
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

    let cityMap = ``;

    console.log(cityData.data[0]);
    console.log(cityData);
  };

  // handleGetPokemon = async (e) => {
  //   e.preventDefault();
  //   // first axios call-url
  //   try {
  //     let pokemonData = await axios.get("https://pokeapi.co/api/v2/pokemon");

  //     // proof of life
  //     // console.log(pokemonData.data.results);
  //     this.setState({
  //       pokemonData: pokemonData.data.results,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({
  //       error: true,
  //       errorMessage: error.message,
  //     });
  //   }
  // };

  render() {
    console.log("app.state: ", this.state);

    let pokemonItems = this.state.pokemonData.map((pokemon, index) => {
      return <li key={index}>{pokemon.name}</li>;
    });

    return (
      <>
        <header className="Header"></header>
        <h1>Pokemon Data</h1>
        <form>
          <button onClick={this.handleGetPokemon}>Gotta Catch Em All!</button>
        </form>

        <form onSubmit={this.getCityData}>
          <label>
            Pick a City!
            <input type="text" onInput={this.handleInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>

        {this.state.errorMessage ? (
          <p>{this.state.errorMessage}</p>
        ) : (
          <ul>{pokemonItems}</ul>
        )}
      </>
    );
  }
}

export default App;
