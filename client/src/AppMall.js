import React, { Component } from 'react';
import ShoppingMall from './ShoppingMall_1';
import ShoppingCenter from './data/ShoppingCenters.json';
import axios from 'axios';
class AppMall extends Component {
  constructor(){
    super();
    this.state ={
      search:'xxx',
      searchs:[],
      inputValue:"",
      database:ShoppingCenter,
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
            if (result.name.toString().toLowerCase().indexOf(f.toString().toLowerCase()) !==-1){
              results= true
            }
          })
    }
    else {
      filter_array.map((f)=>{
            if (result.type.toString().toLowerCase().indexOf(f.toString().toLowerCase()) !==-1){
              results= true
            }
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
      return <a href="#" className="btn btn-medium btn-dark-solid btn-rounded " disabled>{count} Found</a>
    }
    if (count>6){
      if (count-(this.state.more+5)>0){
        return <a href="#" className="btn btn-medium btn-dark-solid btn-rounded " onClick={this.loadmore}>{count} Found. Load next 5 Results</a>
      }else{
      return <a href="#" className="btn btn-medium btn-dark-solid btn-rounded " disabled>No More Results</a>
          }
      }
    return (
                                <div className="container-fluid feature-border-box" >
                                  <div className="row">

                                      <div className="col-sm-12 subscribe-info " style={{paddingLeft: 0 }}>

                                          <h3>Subscribe to our Newsletter to get our latest updates about Shopping Centers </h3>
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
        axios({
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

    if ( _spacebar == 0 && _searchtext.length >1 ){
      console.log(_spacebar)
       _searchtext = _searchtext.replace(/^ +/mg, '')
    }

    let _search = _searchtext.split(" ")
    var _empty= _search.indexOf("")
    if (_empty>-1){
      _search.splice(_empty)
    }
    console.log(_search.length)
    var _search_len = _search.length

    let filteredmalls = this.state.database.filter(
       (Mall)=> { var contentKeys = Object.keys(Mall)
                     var _mall = contentKeys[0]
                      if (this.result_object(Mall[_mall].name,_search[0])     ||
                          this.result_object(Mall[_mall].street,_search[0])       ||
                          this.result_object(Mall[_mall].PLZ,_search[0])   ||
                          this.result_object(Mall[_mall].city,_search[0])    ||
                          this.result_object(Mall[_mall].region,_search[0])) {return Mall}

       }
     )

    if(_search_len > 1){
      for (var i = _search_len-1; i> 0; i--){
         filteredmalls = filteredmalls.filter(
            (Mall)=> { var contentKeys = Object.keys(Mall)
                          var _mall = contentKeys[0]
                           if (this.result_object(Mall[_mall].name,_search[i])     ||
                               this.result_object(Mall[_mall].street,_search[i])       ||
                               this.result_object(Mall[_mall].PLZ,_search[i])   ||
                               this.result_object(Mall[_mall].city,_search[i])    ||
                               this.result_object(Mall[_mall].region,_search[i])) {return Mall}

            }
          )
      }
    }

    // if (this.state.health === "Isactive") {
    //       filteredmalls=filteredmalls.filter((Mall)=> { var contentKeys = Object.keys(Mall)
    //                     var _mall = contentKeys[0]
    //                     var filter=["health","beauty_salon","clothing_store","gym","hair_care","jewelry_store","pharmacy","physiotherapist","shoe_store","shopping_mall","spa","supermarket","veterinary_care"]
    //                     if (this.filter_result_object(Mall[_mall],filter)){
    //                       return Mall[_mall]
    //                     }
    //                   }
    //                 )
    //     var health_count = <b><i style={{color:"#29ABE2"}}>{filteredmalls.length}</i></b>
    //   }
    //
    // if (this.state.telecom === "Isactive") {
    //     filteredmalls=filteredmalls.filter((Mall)=> { var contentKeys = Object.keys(Mall)
    //                   var _mall = contentKeys[0]
    //                   var filter=["electrician","electronics_store","hardware_store","locksmith","movie_rental","movie_theater","storage"]
    //                   if (this.filter_result_object(Mall[_mall],filter)){
    //                     return Mall[_mall]
    //                   }
    //                 }
    //               )
    //   var telecom_count = <b><i style={{color:"#29ABE2"}}>{filteredmalls.length}</i></b>
    // }
    //
    // if (this.state.food === "Isactive") {
    //     filteredmalls=filteredmalls.filter((Mall)=> { var contentKeys = Object.keys(Mall)
    //                   var _mall = contentKeys[0]
    //                   var filter=["bakery","bar","cafe","food","liquor_store","meal_takeaway","restaurant"]
    //                   if (this.filter_result_object(Mall[_mall],filter)){
    //                     return Mall[_mall]
    //                   }
    //                 }
    //               )
    //   var food_count = <b><i style={{color:"#29ABE2"}}>{filteredmalls.length}</i></b>
    // }
    //
    // if (this.state.other === "Isactive") {
    //     filteredmalls=filteredmalls.filter((Mall)=> { var contentKeys = Object.keys(Mall)
    //                   var _mall = contentKeys[0]
    //                   var filter=["art_gallery","bank","bicycle_store","book_store","bowling_alley","car_dealer","car_rental","car_repair"
    //                 ,"car_wash","casino","convenience_store","department_store","florist","furniture_store","home_goods_store","insurance_agency"
    //                 ,"laundry","lawyer","meal_delivery","moving_company","night_club","painter","pet_store","plumber","real_estate_agency","roofing_contractor","store","travel_agency"]
    //                 if (this.filter_result_object(Mall[_mall],filter)){
    //                   return Mall[_mall]
    //                 }
    //                 }
    //               )
    //   var other_count = <b><i style={{color:"#29ABE2"}}>{filteredmalls.length}</i></b>
    // }

    if (this.state.berlin === "Isactive") {
        filteredmalls=filteredmalls.filter((Mall)=> { var contentKeys = Object.keys(Mall)
                      var _mall = contentKeys[0]
                      var filter=["berlin"]
                    if (this.filter_result_object(Mall[_mall],filter)){
                      return Mall[_mall]
                    }
                    }
                  )
      var berlin_count = <b><i style={{color:"#29ABE2"}}>{filteredmalls.length}</i></b>
    }

    if (this.state.hamburg === "Isactive") {
        filteredmalls=filteredmalls.filter((Mall)=> { var contentKeys = Object.keys(Mall)
                      var _mall = contentKeys[0]
                      var filter=["hamburg"]
                    if (this.filter_result_object(Mall[_mall],filter)){
                      return Mall[_mall]
                    }
                    }
                  )
      var hamburg_count = <b><i style={{color:"#29ABE2"}}>{filteredmalls.length}</i></b>
    }

    if (this.state.muenchen === "Isactive") {
        filteredmalls=filteredmalls.filter((Mall)=> { var contentKeys = Object.keys(Mall)
                      var _mall = contentKeys[0]
                      var filter=["münchen","muenchen"]
                    if (this.filter_result_object(Mall[_mall],filter)){
                      return Mall[_mall]
                    }
                    }
                  )
      var muenchen_count = <b><i style={{color:"#29ABE2"}}>{filteredmalls.length}</i></b>
    }

    if (this.state.frankfurt === "Isactive") {
        filteredmalls=filteredmalls.filter((Mall)=> { var contentKeys = Object.keys(Mall)
                      var _mall = contentKeys[0]
                      var filter=["frankfurt"]
                    if (this.filter_result_object(Mall[_mall],filter)){
                      return Mall[_mall]
                    }
                    }
                  )
      var frankfurt_count = <b><i style={{color:"#29ABE2"}}>{filteredmalls.length}</i></b>
    }

    result_length = filteredmalls.length
    if (result_length > 6){
      filteredmalls =  filteredmalls.slice(0,this.state.more+5)
    }

    return (
      <div className="container">
        <div className="row">
        <div className="heading-title text-center">
        <h2 className="text-uppercase">Shopping Centers</h2>
        <div className="row p-top-30">
        <div className="col-md-12 ">
        <input value={this.state.inputValue} type="text" className="form-control input-lg shadow"  placeholder="Mall name, street, city, postalcode, state.."  onChange={this.updatesearchvalue.bind(this)}/>

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
                  <h3>Mall</h3>
              </div>

                  <div className="row"><div className="col-xs-12 col-sm-3 col-md-3" style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="health" value={this.state.health_condition} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9" style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}>Health & Beauty </h4></div></div>
                  <div className="row"><div className="col-xs-12 col-sm-3 col-md-3 " style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="telecom" value={this.state.telecom_condition ? "Isactive" :"Isnotactive"} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9 " style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}>  Electronics </h4></div></div>
                  <div className="row"><div className="col-xs-12 col-sm-3 col-md-3 " style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="food" value={this.state.food_condition ? "Isactive" :"Isnotactive"} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9" style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}>  Food & Service </h4></div></div>
                  <div className="row"><div className="col-xs-12 col-sm-3 col-md-3 " style={{padding:"0px"}}><input type="checkbox" className="uiswitch" name="other" value={this.state.other_condition ? "Isactive" :"Isnotactive"} onChange={this.filter_result.bind(this)}></input></div><div className="col-xs-12 col-sm-9 col-md-9" style={{padding:"2% 0 0 0"}} > <h4 style={{margin:"0"}}>  Other </h4></div></div>

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
        filteredmalls.map((Mall)=> {
          var contentkeys = Object.keys(Mall)

          var _mall= contentkeys[0]
          return <ShoppingMall  mall={Mall[_mall]} mall_id={_mall} />
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

export default AppMall;
