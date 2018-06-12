import React, { Component } from 'react';
import Navigation from '../component/Navigation';
import Logo from '../component/Logo';
import Rank from '../component/Rank';
import ImageLinkForm from '../component/ImageLinkForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
         {/*
        <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;