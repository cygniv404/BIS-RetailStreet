import React, { Component } from 'react';
import Establishement from './Establishement';
import Streets from './data/business.json';
import Axios from 'axios';

class AppStreet extends Component {
  constructor(){
    super();
    this.state ={
      search:'',
      searchs:[],
      inputValue:"",
      database:Streets,
      health_condition:false,
      health:"Isnotactive",
      telecom_condition:false,
      telecom:"Isnotactive",
      food_condition:false,
      food:"Isnotactive",
      other_condition:false,
      other:"Isnotactive",
      berlin_condition:false,
      berlin:"Isnotactive",
      hamburg_condition:false,
      hamburg:"Isnotactive",
      muenchen_condition:false,
      muenchen:"Isnotactive",
      frankfurt_condition:false,
      frankfurt:"Isnotactive",
      more:0,
      open: false,
      vertical: 'top',
      horizontal: 'center',
    };

    this.loadmore= this.loadmore.bind(this)
    this.pagination = this.pagination.bind(this)
  }

  updatesearchvalue(event){
    if (event.type ==="change"){
      this.setState({more: 0});
      if(event.target.value===""){
          this.setState({searchs: []});
          this.setState({search: ""});
          this.setState({inputValue: ""});

      }else{
          this.setState({searchs: event.target.value.substr(0,40)});
          this.setState({search: event.target.value.substr(0,40)});
          this.setState({inputValue: event.target.value.substr(0,40)});
      }
    }
    if (typeof(event) === "string") {
      this.setState({search: event});
      this.setState({inputValue: event});
    }


  }
  filter_result(event){
          let name = event.target.name.toString()
          let condition = name +"_condition"
          this.setState({[condition]:!this.state[condition]});
          if (this.state[condition]!==false){
                this.setState({[name]:"Isnotactive"});
              }else{
                this.setState({[name]:"Isactive"});
              }
  }
  result_object(input,_array){
    var results=false
    if (typeof(_array) !== 'undefined'){var _first = _array.toString().toLowerCase()}
    if (input.toString().toLowerCase().indexOf(_first) !==-1){
      results= true
    }
    return results
  }
  filter_result_object(result,filter_array){
    var results=false
    if (filter_array.length<3){
      filter_array.map((f)=>{
            if (result.city_name.toString().toLowerCase().indexOf(f.toString().toLowerCase()) !==-1){
              results= true
            }
            return null
          })
    }
    else {
      filter_array.map((f)=>{
            if (result.type.toString().toLowerCase().indexOf(f.toString().toLowerCase()) !==-1){
              results= true
            }
            return null
          })

    }

    return results
  }
  loadmore(event){
    event.preventDefault();
    this.setState({more: this.state.more + 5});
  }
  pagination(count){
    if (count>0 && count <6){
      return <a href="#start" className="btn btn-medium btn-dark-solid btn-rounded " disabled>{count} Found</a>
    }
    if (count>6){
      if (count-(this.state.more+5)>0){
        return <button className="btn btn-medium btn-dark-solid btn-rounded " onClick={this.loadmore}>{count} Found. Load next 5 Results</button>
      }else{
      return <a href="#start" className="btn btn-medium btn-dark-solid btn-rounded " disabled>No More Results</a>
          }
      }
      if (count===0 && this.state.search.length > 0){
        return <a href="#start" className="btn btn-medium btn-dark-solid btn-rounded " disabled>No result found, Please search again</a>
      }
    return (
                                <div className="container-fluid feature-border-box" >
                                  <div className="row">

                                      <div className="col-sm-12 subscribe-info " style={{paddingLeft: 0 }}>

                                          <h3>Subscribe to our Newsletter to get our latest updates in Retailstreets Businesses</h3>
                                      </div>

                                  </div>
                                    <div className="row">

                                          <div className=" col-sm-12 subscribe-form">
                                              <form id="form-inline" className="form-inline" onSubmit={this.handleSubmit.bind(this)} method="POST">
                                                  <input type="email" id="email" className="form-control" placeholder="Enter your email address"/>
                                                  <button type="submit" className="btn btn-medium btn-rounded btn-dark-solid text-uppercase">
                                                      subscribe
                                                  </button>
                                              </form>
                                          </div>

                                      </div>
                                  </div>

                          )

  }

  handleSubmit(e){
        e.preventDefault();
        //const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        //const message = document.getElementById('message').value;
        Axios({
            method: "POST",
            url:"http://localhost:5000/api/mail",
            data: {
                //name: name,
                email: email
                //messsage: message
            }
        }).then((response)=>{
            if (response.data.msg === 'success'){
                alert("Message Sent.");
                this.resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    }
  resetForm(){
        document.getElementById('form-inline').reset();
      }

  render() {

    let result_length = false
    let _searchtext = this.state.search.toLowerCase()
    var _spacebar= _searchtext.indexOf(" ")

    _searchtext = _searchtext.replace(/ +(?= )/g,'')

    if ( _spacebar === 0 && _searchtext.length >1 ){
      console.log(_spacebar)
       _searchtext = _searchtext.replace(/^ +/mg, '')
    }

    let _search = _searchtext.split(" ")
    var _empty= _search.indexOf("")
    if (_empty>-1){
      _search.splice(_empty)
    }

    var _search_len = _search.length

    let filteredstreets = this.state.database.filter(
       (Street)=> { var contentKeys = Object.keys(Street)
                     var business = contentKeys[1]
                      if (this.result_object(Street[business].street_name,_search[0])     ||
                          this.result_object(Street[business].city_name,_search[0])       ||
                          this.result_object(Street[business].business_name,_search[0])   ||
                          this.result_object(Street[business].full_address,_search[0])    ||
                          this.result_object(Street[business].type,_search[0])) {return Street}
                      return null

       }
     )

    if(_search_len > 1){
      for (var i = _search_len-1; i> 0; i--){
         filteredstreets = filteredstreets.filter(
           // eslint-disable-next-line no-loop-func
            (Street)=> { var contentKeys = Object.keys(Street)
                          var business = contentKeys[1]
                           if (this.result_object(Street[business].street_name,_search[i])     ||
                               this.result_object(Street[business].city_name,_search[i])       ||
                               this.result_object(Street[business].business_name,_search[i])   ||
                               this.result_object(Street[business].full_address,_search[i])    ||
                               this.result_object(Street[business].type,_search[i])) {return Street}
                          return null

            }
          )
      }
    }

    if (this.state.health === "Isactive") {
          filteredstreets=filteredstreets.filter((Street)=> { var contentKeys = Object.keys(Street)
                        var business = contentKeys[1]
                        var filter=["health","beauty_salon","clothing_store","gym","hair_care","jewelry_store","pharmacy","physiotherapist","shoe_store","shopping_mall","spa","supermarket","veterinary_care"]
                        if (this.filter_result_object(Street[business],filter)){
                          return Street[business]
                        }
                        return null
                      }
                    )
        var health_count = <b><i style={{color:"#29ABE2"}}>{filteredstreets.length}</i></b>
      }

    if (this.state.telecom === "Isactive") {
        filteredstreets=filteredstreets.filter((Street)=> { var contentKeys = Object.keys(Street)
                      var business = contentKeys[1]
                      var filter=["electrician","electronics_store","hardware_store","locksmith","movie_rental","movie_theater","storage"]
                      if (this.filter_result_object(Street[business],filter)){
                        return Street[business]
                      }
                      return null
                    }
                  )
      var telecom_count = <b><i style={{color:"#29ABE2"}}>{filteredstreets.length}</i></b>
    }

    if (this.state.food === "Isactive") {
        filteredstreets=filteredstreets.filter((Street)=> { var contentKeys = Object.keys(Street)
                      var business = contentKeys[1]
                      var filter=["bakery","bar","cafe","food","liquor_store","meal_takeaway","restaurant"]
                      if (this.filter_result_object(Street[business],filter)){
                        return Street[business]
                      }
                      return null
                    }
                  )
      var food_count = <b><i style={{color:"#29ABE2"}}>{filteredstreets.length}</i></b>
    }

    if (this.state.other === "Isactive") {
        filteredstreets=filteredstreets.filter((Street)=> { var contentKeys = Object.keys(Street)
                      var business = contentKeys[1]
                      var filter=["art_gallery","bank","bicycle_store","book_store","bowling_alley","car_dealer","car_rental","car_repair"
                    ,"car_wash","casino","convenience_store","department_store","florist","furniture_store","home_goods_store","insurance_agency"
                    ,"laundry","lawyer","meal_delivery","moving_company","night_club","painter","pet_store","plumber","real_estate_agency","roofing_contractor","store","travel_agency"]
                    if (this.filter_result_object(Street[business],filter)){
                      return Street[business]
                    }
                    return null
                    }
                  )
      var other_count = <b><i style={{color:"#29ABE2"}}>{filteredstreets.length}</i></b>
    }

    if (this.state.berlin === "Isactive") {
        filteredstreets=filteredstreets.filter((Street)=> { var contentKeys = Object.keys(Street)
                      var business = contentKeys[1]
                      var filter=["berlin"]
                    if (this.filter_result_object(Street[business],filter)){
                      return Street[business]
                    }
                    return null
                    }
                  )
      var berlin_count = <b><i style={{color:"#29ABE2"}}>{filteredstreets.length}</i></b>
    }

    if (this.state.hamburg === "Isactive") {
        filteredstreets=filteredstreets.filter((Street)=> { var contentKeys = Object.keys(Street)
                      var business = contentKeys[1]
                      var filter=["hamburg"]
                    if (this.filter_result_object(Street[business],filter)){
                      return Street[business]
                    }
                    return null
                    }
                  )
      var hamburg_count = <b><i style={{color:"#29ABE2"}}>{filteredstreets.length}</i></b>
    }

    if (this.state.muenchen === "Isactive") {
        filteredstreets=filteredstreets.filter((Street)=> { var contentKeys = Object.keys(Street)
                      var business = contentKeys[1]
                      var filter=["münchen","muenchen"]
                    if (this.filter_result_object(Street[business],filter)){
                      return Street[business]
                    }
                    return null
                    }
                  )
      var muenchen_count = <b><i style={{color:"#29ABE2"}}>{filteredstreets.length}</i></b>
    }

    if (this.state.frankfurt === "Isactive") {
        filteredstreets=filteredstreets.filter((Street)=> { var contentKeys = Object.keys(Street)
                      var business = contentKeys[1]
                      var filter=["frankfurt"]
                    if (this.filter_result_object(Street[business],filter)){
                      return Street[business]
                    }
                    return null
                    }
                  )
      var frankfurt_count = <b><i style={{color:"#29ABE2"}}>{filteredstreets.length}</i></b>
    }

    result_length = filteredstreets.length
    if (result_length > 6){
      filteredstreets =  filteredstreets.slice(0,this.state.more+5)
    }

    return (
      <div className="container">
        <div className="row">
        <div className="heading-title text-center">
        <h2 className="text-uppercase">Retail Streets</h2>
        <div className="row p-top-30">
        <div className="col-md-12 ">
        <input value={this.state.inputValue} type="text" className="form-control input-lg shadow"  placeholder="establishment name, Street name, city, postalcode, state.."  onChange={this.updatesearchvalue.bind(this)}/>

        </div>

      </div>
      </div>
      <div className="col-md-4">
          <div className="featured-item feature-border-box text-left wow fadeInLeft">
              <div className="icon">
                  <i className="icon-basic_settings"></i>
              </div>
              <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-12">
              <div className="title text-uppercase">
                  <h3>Business</h3>
              </div>

                  <div className="row"><div className="col-xs-12 col-sm-3 col-md-3" style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="health" value={this.state.health_condition} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9" style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}>Health & Beauty {health_count}</h4></div></div>
                  <div className="row"><div className="col-xs-12 col-sm-3 col-md-3 " style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="telecom" value={this.state.telecom_condition ? "Isactive" :"Isnotactive"} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9 " style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}>  Electronics {telecom_count}</h4></div></div>
                  <div className="row"><div className="col-xs-12 col-sm-3 col-md-3 " style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="food" value={this.state.food_condition ? "Isactive" :"Isnotactive"} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9" style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}>  Food & Service {food_count}</h4></div></div>
                  <div className="row"><div className="col-xs-12 col-sm-3 col-md-3 " style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="other" value={this.state.other_condition ? "Isactive" :"Isnotactive"} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9" style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}>  Other {other_count}</h4></div></div>

            </div>

            <div className="col-xs-12 col-sm-6 col-md-12">
              <div className="title text-uppercase">
                  <h3>City</h3>
              </div>


                <div className="row"><div className="col-xs-12 col-sm-3 col-md-3" style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="berlin" value={this.state.berlin_condition} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9" style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}> Berlin {berlin_count}</h4></div></div>
                <div className="row"><div className="col-xs-12 col-sm-3 col-md-3 " style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="hamburg" value={this.state.hamburg_condition ? "Isactive" :"Isnotactive"} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9 " style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}>  Hamburg {hamburg_count}</h4></div></div>
                <div className="row"><div className="col-xs-12 col-sm-3 col-md-3 " style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="muenchen" value={this.state.muenchen_condition ? "Isactive" :"Isnotactive"} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9" style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}>  München {muenchen_count}</h4></div></div>
                <div className="row"><div className="col-xs-12 col-sm-3 col-md-3 " style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="frankfurt" value={this.state.frankfurt_condition ? "Isactive" :"Isnotactive"} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9" style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}>  Frankfurt {frankfurt_count}</h4></div></div>

            </div>
          </div>
          </div>
      </div>
      <div className="col-md-8">
      <div className="container-fluid" ref="result">
      {
        filteredstreets.map((Street)=> {
          var contentkeys = Object.keys(Street)

          var business= contentkeys[1]
          return <Establishement onSelectStreet={this.updatesearchvalue.bind(this)} business={Street[business]} business_id={business} street_id={Street.street_id.toString()} />
        })
      }
      <div className="col-md-12 featured-item text-center wow fadeIn " style ={{padding:"10px", }}>
        {
         this.pagination(result_length)
        }
      </div>


      </div>

    </div>
    </div>
  </div>
  )
  }
}

export default AppStreet;
