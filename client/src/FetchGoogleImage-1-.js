import React, {Component} from 'react';
import Business from './data/business.json';
import {fs} from 'fs-extra';
class FetchGoogleImage extends Component {

  constructor(){
    super();
    this.fetchimg = this.fetchimg.bind(this);
  }

testimg(_googleid){

  var fs = require('fs-exists-sync')
  var path ='./img/gis/'+ _googleid +'.jpg'
  if (fs(path)) {
    return true
  }
  return false
}
fetchimg(_googleid){
  let googleid = this.props.img.split(",")
  var lon= googleid[1]
  var lat= googleid[0]
  var img_url= "https://api.tomtom.com/map/1/staticimage?key=MgZDOcpSSmGAQIdZCVoY2pWiL10w1wyX&zoom=18&center="+lon+","+lat+"&format=jpg&layer=basic&style=main&width=1305&height=748&view=Unified"
{/*  if (this.saveimg(img_url,_googleid)){
    return "image fetched"
  }
  return "image not fetched"
*/}
  return <img className="shadow" src={img_url} style={{width:"100%"}}/>
}
{/* saveimg(_imgurl,_googleid){
  var imageDownloader = require("image-downloader")
  var options =
  {
    url:_imgurl,
    dest : './img/gis/'+ _googleid +'.jpg'
  }

  imageDownloader.image(options).catch((err) => {
    console.error(err)
    return false
  })
  return true
}
*/}
render(){

  if (this.testimg(this.props.img)){

  return this.fetchimg(this.props.img)
  }

  return <img className="shadow" src={'./img/gis/'+ this.props.img +'.jpg'} style={{width:"100%"}}/>

  }
}
export default FetchGoogleImage;
