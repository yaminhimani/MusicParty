import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";



export default class CreateRoom extends Component{

  defaultVotes = 2;

  constructor(props){
    super(props);
    this.state = {
      guest_pause: true,
      votes_skip: this.defaultVotes,
    
    };
    this.handleRoomButton = this.handleRoomButton.bind(this);
    this.handleVotesChange= this.handleVotesChange.bind(this);
    this.handleGuestCanPause= this.handleGuestCanPause.bind(this);
    

    //to use the this keyword in the methods we must bind them to the class which is done above
  }

  //whatever we put in the text field will be updates to votes skip
  handleVotesChange(e){
    this.setState({
      votes_skip: e.target.value,
    })
  }

  //handle the guest pause feature
  handleGuestCanPause(e){
    this.setState({
      guest_pause: e.target.value=='true' ? true : false
    })
  }

  //creating a new room function
  handleRoomButton(){
    
      const request = {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
         votes_skip: this.state.votes_skip,
         guest_pause: this.state.guest_pause,
        }),

      };
      fetch('api/create-room', request).then((response) => response.json()).then((data) => this.props.history.push('/room/'+ data.roomCode));
      
    
  }




  render(){
    return (
      <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component='h4' variant='h4'>
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align='center'>Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup row 
          defaultValue='true'
          onChange={this.handleGuestCanPause}
          >
            <FormControlLabel 
            value = "true" 
            control={<Radio color="primary"/>}
            label="Play/Pause"
            labelPlacement="bottom"
            />
            <FormControlLabel
            value = "false" 
            control={<Radio color="secondary"/>}
            label="No Control"
            labelPlacement="bottom"
            />
          
          


            
          </RadioGroup>
        </FormControl>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField 
            required={true} type="number"
            onChange={this.handleVotesChange}
            defaultValue={this.defaultVotes}
            inputProps={{
              min:1,
              style: {textAlign: "center"}

            }}
            
            />

            <FormHelperText>
              <div align="center">
                Votes Required to Skip Song

              </div>
            </FormHelperText>
            
          </FormControl>


        </Grid>
        </Grid>

        <Grid item xs={12} align="center">
          <Button color="primary" 
          variant="contained"
          onClick={this.handleRoomButton}
          >Create A Room  </Button>

        </Grid>
        
        
      
      <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>Go Back</Button>

        </Grid>


    </Grid>
    );
  }


}