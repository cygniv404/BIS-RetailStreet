import React , { Component } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
class Shops extends Component {
  constructor() {
    super()
    this.state ={
      page: 0,
      rowsPerPage: 5
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    return (
      <table>
        <thead >
        <tr >
          <th className="text-uppercase" >shop</th>
          <th className="text-uppercase">Description</th>
        </tr>
        </thead>
        <tbody >
        {this.props.shop.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
              return (
                <tr key={"key"+row.name.toUpperCase()}>
                  <td>
                    {row.name}
                  </td>
                  <td >{row.description}</td>
                </tr>
              );
            })}
            <tr>
            <TablePagination
              colspan="100"
              rowsPerPageOptions={[5, 10, 25]}
              count={this.props.shop.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            /></tr>
        </tbody>
      </table>

  )}
}
export default Shops;
