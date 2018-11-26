import React, { Component } from 'react';
//import FetchGoogleImage from './FetchGoogleImage.js'
import TablePagination from '@material-ui/core/TablePagination';
class ShoppingMall extends Component {

  constructor(){
    super();
    this.handleClick= this.handleClick.bind(this);
    this.state ={
      condition:false

  }
  }
  handleClick(){
        this.setState( { condition : !this.state.condition } );
    }
  handelingclick = (event) => {
    var search_field=this.props.mall.street_name;

    this.props.onSelectStreet(search_field) ;
    }
  default(event){
    event.preventDefault();
  }
  render() {

    var openhours = this.props.mall.open_time.split(";")

    var website= <a href={this.props.mall.website} target="_blank" rel="noopener noreferrer" className="text-center text-uppercase s-link">{this.props.mall.website}</a>
    if (this.props.mall.website === "Not Available") {
      website= <a href="#" className="text-center text-uppercase s-link" onClick={this.default}>Not Available</a>
    }
    if (this.props.mall.website.length> 40){
      website= <a href={this.props.mall.website} target="_blank" rel="noopener noreferrer" className="text-center text-uppercase s-link">{this.props.mall.website.substr(0,35)+"..."}</a>
    }


    return (
      <div className=" col-md-12 featured-item feature-border-box text-left wow fadeIn shadow">
                    <div className="icon icon-searchfield">
                      <img ref="business_image" src="./01.jpg" style={{width:"60px", height:"60px", }} />
                    </div>
                    <div className="title-searchfield text-uppercase">
                        <h4>{this.props.mall.name}</h4>
                    </div>
                    <div className="desc  ">
                      Full Adresse : <a href={"https://www.google.com/maps/place/"+this.props.mall.full_address} className="text-center text-uppercase s-link">{this.props.mall.street} ,{this.props.mall.PLZ} {this.props.mall.city}</a><br />
                      Website : {website}
                    </div>
                    <div className={"info-searchfield "+(this.state.condition ? "active" :"")}>

                      <div className="container-fluid m-bot-30" style={{width:"100%"}}>
                        <div className="row"  >
                          <div className="col-sm-6 col-md-3 type-searchfield ">
                            <div className="text-uppercase shadow-text">
                                <h4 className="m-bot-0 m-top-0">Open hours</h4>
                            </div>
                            <div className="desc margin-0" style={{"fontSize":"12px"}}>
                            {
                              openhours.map((ot)=>{
                              return <p style={{margin:"auto", fontSize:"20px"}}>{ot}</p>
                              })
                          }
                          </div>
                          </div>
                          <div className="col-sm-6 col-md-3 type-searchfield">
                            <div className="text-uppercase shadow-text">
                              <h4 className="m-bot-0 m-top-0">open year</h4>
                              </div>
                              <div className="desc margin-0" style={{"fontSize":"12px"}}>
                              <p style={{margin:"auto" , fontSize:"20px"}} >{this.props.mall.open_year}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-3 type-searchfield">
                            <div className="text-uppercase shadow-text">
                              <h4 className="m-bot-0 m-top-0">location</h4>
                              </div>
                              <div className="desc margin-0" style={{"fontSize":"12px"}}>
                              <p style={{margin:"auto" , fontSize:"20px"}} >{this.props.mall.location_type}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-3 type-searchfield">
                              <div className="text-uppercase shadow-text">
                              <h4 className="m-bot-0 m-top-0" >email</h4>
                              </div>
                              <div className="desc margin-0" style={{"fontSize":"12px"}}>
                              <p style={{margin:"auto" , fontSize:"20px"}}><a className="text-center text-uppercase s-link" href={"mailto:"+this.props.mall.email} onClick={this.handelingclick}>{this.props.mall.email.toString().substr(0,9)}...</a></p>
                              </div>
                          </div>

                        </div>
                        <div className="row"  >
                          <div className="col-sm-6 col-md-3 type-searchfield">
                            <div className="text-uppercase shadow-text">
                              <p className="m-bot-0 m-top-0">magnet shops</p>
                              </div>
                              <div className="desc margin-0" style={{"fontSize":"12px"}}>
                              <p style={{margin:"auto" , fontSize:"20px"}} >{parseInt(this.props.mall.n_magnet_shops)}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-3 type-searchfield">
                            <div className="text-uppercase shadow-text ">
                              <p className="m-bot-0 m-top-0">area <i style={{textTransform: "lowercase"}}>m²</i></p>
                              </div>
                              <div className="desc margin-0" style={{"fontSize":"12px"}}>
                              <p style={{margin:"auto" , fontSize:"20px"}} >{this.props.mall.area_total}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-3 type-searchfield">

                              <div className="text-uppercase shadow-text">
                              <p className="m-bot-0 m-top-0">rented area <i style={{textTransform: "lowercase"}}>m²</i></p>
                              </div>
                              <div className="desc margin-0" style={{"fontSize":"12px"}}>
                              <p  style={{margin:"auto" , fontSize:"20px"}}>{this.props.mall.area_rent}</p></div>

                          </div>
                          <div className="col-sm-6 col-md-3 type-searchfield">
                              <div className="text-uppercase shadow-text">
                              <p className="m-bot-0 m-top-0" >parkinglots</p>
                              </div>
                              <div className="desc margin-0" style={{"fontSize":"12px"}}>
                              <p style={{margin:"auto" , fontSize:"20px"}}>{this.props.mall.parkinglots}</p>
                              </div>
                          </div>

                        </div>
                        <table >
                          <thead >
                            <tr >
                              <th className="text-uppercase" >shop</th>
                              <th className="text-uppercase">Description</th>
                            </tr>
                          </thead>
                          <tbody >
                            <tr >
                              <td ><strong>shop name</strong></td>
                              <td >shop description</td>
                            </tr>
                            <tr >
                              <td ><strong>shop name</strong></td>
                              <td >shop description</td>
                            </tr><tr >
                              <td ><strong>shop name</strong></td>
                              <td >shop description</td>
                            </tr><tr >
                              <td ><strong>shop name</strong></td>
                              <td >shop description</td>
                            </tr><tr >
                              <td ><strong>shop name</strong></td>
                              <td >shop description</td>
                            </tr><tr >
                              <td ><strong>shop name</strong></td>
                              <td >shop description</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                  </div>
                  <div className="icon icon-searchfield-viewmore expand" style={this.state.condition? {top:97.5+'%'} :{}} onClick={this.handleClick}>
                      <i  className={"icon-arrows_down_double-34 icon1 icon-expand "+(this.state.condition ? "active" :"")}/>
                    <i  className={"icon-arrows_up_double-33 icon2 icon-expand "+(this.state.condition ? "active2" :"")}/>

                  </div>
                </div>

    );
  }
}

export default ShoppingMall;
