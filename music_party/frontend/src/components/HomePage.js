import React, {Component} from 'react';
import RoomJoinPage from "./RoomJoinPage"
import CreateRoomPage from "./CreateRoomPage"
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";



export default class HomePage extends Component{
  constructor(props){
    super(props);
  }


  render(){
    return <Router>
     <Switch>
       <Route exact path='/'> <p> This is the HomePage</p></Route>
       <Route path='/join' component={RoomJoinPage}> <p> This is the room join page</p></Route>
       <Route path='/create' component={CreateRoomPage}> <p> This is the create page</p></Route>

     </Switch>

    </Router>;
  }
}