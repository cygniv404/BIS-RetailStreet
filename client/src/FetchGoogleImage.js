import React, {Component} from 'react';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
class FetchGoogleImage extends Component {

  constructor(props){
    super(props);
    this.state ={
      isOpen: false,
      url: window.location.origin +'/img/gis/'+ this.props.street_id + '/'+ this.props.business_id +'.png'
    }
    this.fetchimg = this.fetchimg.bind(this);
    this.testimage = this.testimage.bind(this);
  }
testimage = () =>{
  var tester = new Image();
  tester.onload= () => this.setState({url:tester.src})
  tester.onerror=() => this.fetchimg();
  tester.src= this.state.url;


}

fetchimg(){
  let googleid = this.props.img.split(",")
  var lon= googleid[1]
  var lat= googleid[0]
  var img_url= "https://api.tomtom.com/map/1/staticimage?key=MgZDOcpSSmGAQIdZCVoY2pWiL10w1wyX&zoom=18&center="+lon+","+lat+"&format=jpg&layer=basic&style=main&width=1305&height=748&view=Unified"
  this.setState({url:img_url})
  console.log(" loaded again") ;
}

render(){

        this.testimage()

        return (
          // eslint-disable-next-line
        <a style={{margin:0,padding:0}} onClick={(event) => {
          this.setState({ isOpen: true })
          event.preventDefault()
          }
        }>
             <img className="shadow" src={this.state.url} alt="map" style={{width:"100%"}}
                  onClick={() => this.setState({ isOpen: true })}/>,
               {
                 this.state.isOpen && (<Lightbox
               mainSrc={this.state.url}
               onCloseRequest={() => this.setState({ isOpen: false })}/>)
             }
        </a>
           )

  }
}
export default FetchGoogleImage;
