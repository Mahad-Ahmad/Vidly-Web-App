import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";

import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  // handleSave = () => {
  //   this.props.history.push("/movies");
  // };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  async populateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notfound");
    }
  }

  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  // render() {
  //   return (
  //     <div>
  //       <h1>Movie Form {this.props.match.params.id}</h1>
  //       <button className="btn btn-primary" onClick={this.handleSave}>
  //         Save
  //       </button>
  //     </div>
  //   );
  // }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
    // call the server
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "Number")}
          {this.renderInput("dailyRentalRate", "Rate")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
