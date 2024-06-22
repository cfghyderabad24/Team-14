import React from 'react';

import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';

const Chat = () => (
    <div style={{marginLeft:"250px"}}>
      <Grid container component={Paper} sx={{ width: '100%', height: '100vh' }}>
        <Grid item xs={9}>
          <List sx={{ height: '70vh', overflowY: 'auto' }}>
            <ListItem>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="right" primary="Hey man, What's up ?" />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30" />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="left" primary="Hey, I am Good! What about you ?" />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31" />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="right" primary="Cool. I am good, let's catch up!" />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30" />
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container sx={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField id="outlined-basic-email" label="Type Something" fullWidth />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab color="primary" aria-label="add">Send</Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

export default Chat;
