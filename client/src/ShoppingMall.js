import React, { Component } from 'react';
//import FetchGoogleImage from './FetchGoogleImage.js'
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

                      <div className="container-fluid m-bot-30">
                        <div className="row">
                          <div className="col-sm-6 col-md-4 type-searchfield ">
                            <div className="text-uppercase shadow-text">
                                <h4>Open hours</h4>
                            </div>
                            <div className="desc" style={{"fontSize":"12px"}}>
                            {
                              openhours.map((ot)=>{
                              return <p style={{margin:"auto"}}>{ot}</p>
                              })
                          }
                          </div>
                          </div>
                          <div className="col-sm-6 col-md-4 type-searchfield">
                            <div className="text-uppercase shadow-text">
                              <h4 className="m-bot-0 m-top-0">open year</h4>
                              </div>
                              <div className="desc margin-0" style={{"fontSize":"12px"}}>
                              <p style={{margin:"auto"}} >{this.props.mall.open_year}</p>
                            </div>
                            <div className="text-uppercase shadow-text">
                              <h4 className="m-bot-0 m-top-0">location type</h4>
                              </div>
                              <div className="desc margin-0" style={{"fontSize":"12px"}}>
                              <p style={{margin:"auto"}} >{this.props.mall.location_type}</p>
                            </div>
                              <div className="text-uppercase shadow-text">
                              <h4 className="m-bot-0 m-top-0">Phone</h4>
                              </div>
                              <div className="desc" style={{"fontSize":"12px"}}>
                              <p  className="margin-0">{this.props.mall.phone}</p></div>
                              <div className="text-uppercase shadow-text">
                              <h4 className="m-bot-0 m-top-0" >email</h4>
                              </div>
                              <div className="desc" style={{"fontSize":"12px"}}>
                              <p className="margin-0">
                              <a className="text-center text-uppercase s-link" href="#start" onClick={this.handelingclick}>{this.props.mall.email}</a></p>
                              </div>
                          </div>
                          <div className="col-md-4 map-searchfield">
                            <div className="desc">

                            <img className="shadow" src={"http://localhost:3000/img/gis/8972e619-d00d-4cce-94c9-31c383bb32bb/81deaaa7-9924-45d0-a601-37db82c1c46d.png"} alt="map" style={{width:"100%"}}/>
                          </div>
                          </div>
                        </div>
                      </div>

                  </div>
                  <div className="icon icon-searchfield-viewmore expand" onClick={this.handleClick}>
                      <i  className={"icon-arrows_down_double-34 icon1 icon-expand "+(this.state.condition ? "active" :"")}/>
                    <i  className={"icon-arrows_up_double-33 icon2 icon-expand "+(this.state.condition ? "active2" :"")}/>

                  </div>
                </div>

    );
  }
}

export default ShoppingMall;
