import React, { Component } from 'react';
import Navigation from '../component/Navigation';
import Logo from '../component/Logo';
import Rank from '../component/Rank';
import ImageLinkForm from '../component/ImageLinkForm';
import FaceRecognition from '../component/FaceRecognition';
import SignIn from '../component/SignIn';
import Register from '../component/Register';
import './App.css';

class App extends Component {
  constructor (){
    super();
    this.state={
      input: '',
      imageUrl:'',
      route: 'signin',
      isSignedIn:false,
      user: {
        id: '',
        name: '',
        password: '',
        email: '',
        entries: '',
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      password: data.password,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange =(event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit =() =>{
    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user, { entries:count}))
    })
    this.setState({imageUrl: this.state.input})
  }

  onRouteChange= (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    }else if  (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  
  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
                />
              <FaceRecognition imageUrl={this.state.imageUrl}/>
          </div>
          :(
          this.state.route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;