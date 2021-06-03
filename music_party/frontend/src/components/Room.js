import React, {Component} from 'react';
import {Grid, Button,Typography} from '@material-ui/core'

export default class Room extends Component{
  constructor(props){
    super(props);
    this.state= {
      votes_skip: 2,
      guest_pause: false,
      isHost: false,
    };

    this.roomCode = this.props.match.params.roomCode;
    this.getRoomInfo()
    this.leaveRoomButton = this.leaveRoomButton.bind(this);
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

  render(){


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

      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={this.leaveRoomButton}>
          Leave Room
        </Button>
     
      </Grid>
      
    </Grid>
    
    
    
    
    
    );
  }
}
