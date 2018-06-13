import React, { Component } from 'react';
import Navigation from '../component/Navigation';
import Logo from '../component/Logo';
import Rank from '../component/Rank';
import ImageLinkForm from '../component/ImageLinkForm';
import FaceRecognition from '../component/FaceRecognition';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'cae804dcdb2e408f8eac5388ca32f597'
});

class App extends Component {
  constructor (){
    super();
    this.state={
      input: '',
      imageUrl:'',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.OUTPUTS[0].data.regions[0].region.info.bounding_box;
    const image= document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height)
    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height- (clarifaiFace.bottom_row * height),
    }
    //imprime solo la primera cara
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange =(event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit =() =>{
    console.log("click")
    this.setState({imageUrl: this.state.input})
  
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
      .then((response) => this.displayFaceBox(this.calculateFaceLocation (response)))
      .catch(err => console.log(err));
      // do something with response
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
          />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;