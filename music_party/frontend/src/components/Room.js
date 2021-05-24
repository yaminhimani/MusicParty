import React, {Component} from 'react';


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
  }

  getRoomInfo(){
    fetch('/api/get-room'+ '?roomCode='+ this.roomCode).then((response) => 
     response.json()
     ).then(data =>{
       this.setState({
         votes_skip: data.votes_skip,
         guest_pause: data.guest_pause,
         isHost: data.is_host,
       });
     });
  }

  render(){
    return (<div>
      <h3>{this.roomCode}</h3>
      <p> Votes : {this.state.votes_skip}</p>
      <p> Guest Can Pause : {this.state.guest_pause.toString()}</p>
      <p> Host : {this.state.isHost.toString()}</p>

    </div>
    );
  }
}
