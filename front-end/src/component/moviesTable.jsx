import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColoumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };
  deleteColoumnDisabled = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn disabled btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor(props) {
    super(props);
    const user = this.props.user;
    if (user && user.isAdmin) this.columns.push(this.deleteColoumn);
    else {
      this.columns.push(this.deleteColoumnDisabled);
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
