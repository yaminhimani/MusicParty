import React, {Component} from 'react';
import {Grid, Button,Typography} from '@material-ui/core'
import CreateRoomPage from './CreateRoomPage';

export default class Room extends Component{
  constructor(props){
    super(props);
    this.state= {
      votes_skip: 2,
      guest_pause: false,
      isHost: false,
      showSettings: false,

    };

    this.roomCode = this.props.match.params.roomCode;
    this.getRoomInfo()
    this.leaveRoomButton = this.leaveRoomButton.bind(this);
    this.updateShowSettings= this.updateShowSettings.bind(this);
    this.renderSettingsButton= this.renderSettingsButton.bind(this);
    this.renderSettings= this.renderSettings.bind(this);
    
  }


  leaveRoomButton(){
    
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},

    };

    fetch("/api/leave-room", requestOptions).then((_response) => {

      this.props.leaveRoomCallback();
      this.props.history.push('/');


    });



  }

  getRoomInfo(){
    fetch('/api/get-room'+ '?roomCode='+ this.roomCode).then((response) => {
      if(!response.ok){
        this.props.leaveRoomCallback();
        this.props.history.push("/");
      }


      return response.json()
    
    })
    .then(data =>{
       this.setState({
         votes_skip: data.votes_skip,
         guest_pause: data.guest_pause,
         isHost: data.is_host,
       });
     });
  }

  //changes if we can see the settings button based on the value 
  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    });
  }

  //renders tge settings button 
  renderSettingsButton() {
    return (
      <Grid item xs={12} align="center" onClick={() => this.updateShowSettings(true)}> 
<Button
            variant="contained"
            color="primary"
            onClick={() => this.updateShowSettings(true)}>
            Settings
          </Button>
      </Grid>
    );
    
  }

  //renders the settings page 
  renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votes_skip={this.state.votes_skip}
            guest_pause={this.state.guest_pause}
            roomCode={this.roomCode}
            updateCallback={null}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }


  render(){

    if(this.state.showSettings){
        return this.renderSettings();
        
    }

    return (

     
    
    <Grid container spacing={1}>

      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
        Code: {this.roomCode}

        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
      <Typography variant="h6" component="h6">
        Votes : {this.state.votes_skip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
      <Typography variant="h6" component="h4">
        Host: {this.state.isHost.toString()}
        </Typography>
      </Grid>

      {this.state.isHost ? this.renderSettingsButton() : null}

     
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={this.leaveRoomButton}>
          Leave Room
        </Button>
     
      </Grid>
      
    </Grid>
    
    
    
    
    
    );
  }
}
