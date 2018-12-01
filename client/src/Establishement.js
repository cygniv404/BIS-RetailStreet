import React, { Component } from 'react';
import FetchGoogleImage from './FetchGoogleImage.js'
class Establishement extends Component {

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
    var search_field=this.props.business.street_name;

    this.props.onSelectStreet(search_field) ;
    }
  default(event){
    event.preventDefault();
  }
  render() {

    var types= this.props.business.type.split(",")
    if (types==="n.a"){
      types=["Not Available"]
    }
    var phone= this.props.business.phone
    if (this.props.business.phone==="n.a"){
      phone="Not Available"
    }
    var types_filtered= types.filter(function(value,index,arr){
      return value !== "point_of_interest" && value !=="establishment" && value.indexOf("_")=== -1  })
    if ( types_filtered.length === 0 ){
      types_filtered=["Not Available"]
    }
    var opentimes=this.props.business.opentime
    if (opentimes === "n.a") {
      opentimes=["Not Available"]
    }
    if (this)
    var website= <a href={this.props.business.website} target="_blank" rel="noopener noreferrer" className="text-center text-uppercase s-link">{this.props.business.website}</a>
    if (this.props.business.website === "n.a") {
      website= <button className="text-center text-uppercase s-link" onClick={this.default}>Not Available</button>
    }
    if (this.props.business.website.length> 40){
      website= <a href={this.props.business.website} target="_blank" rel="noopener noreferrer" className="text-center text-uppercase s-link">{this.props.business.website.substr(0,35)+"..."}</a>
    }


    return (
      <div className=" col-md-12 featured-item feature-border-box text-left wow fadeIn shadow">
                    <div className="icon icon-searchfield">
                      <img src={this.props.business.icon_url} alt="business_image" style={{width:"60px", height:"60px", }} />
                    </div>
                    <div className="title-searchfield text-uppercase">
                        <h4>{this.props.business.business_name}</h4>
                    </div>
                    <div className="desc  ">
                      Full Adresse : <a href={"https://www.google.com/maps/place/"+this.props.business.full_address} className="text-center text-uppercase s-link">{this.props.business.full_address}</a><br />
                    Website : {website}
                    </div>
                    <div className={"info-searchfield "+(this.state.condition ? "active" :"")}>

                      <div className="container-fluid m-bot-30">
                        <div className="row">
                          <div className="col-sm-6 col-md-4 opentime-searchfield ">
                            <div className="text-uppercase shadow-text">
                                <h4>Open hours</h4>
                            </div>
                            <div className="desc" style={{"fontSize":"12px"}}>
                            {
                              opentimes.map((ot)=>{
                              return <p style={{margin:"auto"}}>{ot}</p>
                              })
                          }
                          </div>
                          </div>
                          <div className="col-sm-6 col-md-4 type-searchfield">
                            <div className="text-uppercase  shadow-text">
                              <h4 className="m-bot-0 m-top-0">type</h4>
                              </div>
                              <div className="desc margin-0" style={{"fontSize":"12px"}}>
                              {
                                types_filtered.map((t)=>{
                                return <p style={{margin:"auto"}} >{t}</p>
                                })
                              }
                            </div>

                              <div className="text-uppercase  shadow-text">
                              <h4 className="m-bot-0 m-top-0" style={{}}>Phone</h4>
                              </div>
                              <div className="desc" style={{"fontSize":"12px"}}><p  className="margin-0">{phone}</p></div>
                              <div className="text-uppercase  shadow-text">
                              <h4 className="m-bot-0 m-top-0" style={{}}>Street</h4>
                              </div>
                              <div className="desc" style={{"fontSize":"12px"}}>
                              <p className="margin-0"><a className="text-center text-uppercase s-link" href="#start" onClick={this.handelingclick}>{this.props.business.street_name}</a></p>
                              </div>
                          </div>
                          <div className="col-md-4 map-searchfield">
                            <div className="desc">

                            <FetchGoogleImage img={this.props.business.map_id} street_id={this.props.street_id} business_id={this.props.business_id}/>
                          </div>
                          </div>
                        </div>
                      </div>

                  </div>
                  <div className="icon icon-searchfield-viewmore expand"  style={this.state.condition? {top:97.5+'%'} :{}}  onClick={this.handleClick}>
                      <i  className={"icon-arrows_down_double-34 icon1 icon-expand "+(this.state.condition ? "active" :"")}/>
                    <i  className={"icon-arrows_up_double-33 icon2 icon-expand "+(this.state.condition ? "active2" :"")}/>

                  </div>
                </div>

    );
  }
}

export default Establishement;
