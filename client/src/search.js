classNameimport React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className="container">
        <div className="row p-top-30">
        <div className="col-md-8 ">
        <input type="text" className="form-control input-lg"  placeholder="establishment name, Street name, city, postalcode, state.." />

        </div>
        <div className="col-md-4 searchbox">
        <button className="btn btn-medium btn-rounded btn-dark-solid text-uppercase" type="button"> Search <i className="icon-search"></i></button>
        </div>
      </div>
      </div>

    );
  }
}

export default Search;
