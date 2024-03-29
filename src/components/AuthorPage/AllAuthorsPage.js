import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight:'10%',
        marginLeft:'10%',
        [theme.breakpoints.down('sm')]: {
            marginRight:'0%',
            marginLeft:'0%',
        },
        paddingBottom:50
    },
    title:{
        marginBottom:30,
        color:'#333333',
        fontSize:'1.8em',
        [theme.breakpoints.down('sm')]: {
            marginRight:'10%',
            marginLeft:'10%',
        },
        
    },
    listPaper:{
        marginBottom:7
    }
}));

let getAuthors =  async () => {
    let authors = await fetch('https://mostare1.pythonanywhere.com/api/allauthors')
    .then(response => response.json())
    .then(data => data );
    
    return authors;
}

export default function AllAuthorsPage(props) {
    const classes = useStyles();
    const [authors, setAuthors] = React.useState([]);

    const location = useLocation();

    React.useEffect(()=>{
        getAuthors().then(data => setAuthors(data));

        return () => {setAuthors([]); }
    },[]);

    return (
        <div className={classes.root}>
            <Typography 
                variant="h4" 
                className={classes.title}
            >
                All Authors
            </Typography>
            {authors.length === 0 ? <CircularProgress/> : <></>}
            <Fade in={true}>
            <List>
                {authors.map((author, index) => (
                    <div key={index}>
                    <Paper variant="outlined" className={classes.listPaper}>
                        <ListItem 
                            button 
                            style={{paddingTop:10, paddingBottom:10}}
                            component={Link}
                            to={"/author/"+author.authorID}
                            replace={location.pathname === ("/author/"+author.authorID)}
                        >
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor:'#1976d2'}}>
                                    {author.firstName.charAt(0).toUpperCase() +  
                                    author.lastName.charAt(0).toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={author.firstName + " " +  author.lastName}
                                secondary={author.booksCount + " books"}
                            />
                            <ListItemSecondaryAction>
                            
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Paper>
                    </div >
                ))}
            </List>
            </Fade>
        </div>
    );
}