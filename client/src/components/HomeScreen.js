import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import Grid from '@mui/material/Grid';
import YouTubePlaylister from './YouTubePlaylister.js';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import WorkspaceScreen from './WorkspaceScreen';
import { Box } from '@mui/material';
import AuthContext from '../auth';
import CommentArea from './CommentArea';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
        
    }
    function handleCommentList(event){
        if(event.code=="Enter"){
            let comment=event.target.value
            store.commentList(store.currentList._id,auth.user.firstName+" " +auth.user.lastName,comment)

        }

    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#00b0ff' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    function TabPanel(){
        console.log(value)
        if(value=="1")
        
         return(<Grid container spacing={0}>
            <Grid item xs={7}>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
            </Grid>
            
            <Grid item xs={5}> <YouTubePlaylister/>    
            
            </Grid>
            </Grid>
            
        )
        else if(value=="2")
        // let commentCard="";
        // if(store.currentList){
        // commentCard=store.currentList?store.currentList.comment.map(pair=>(
        //     {pair.username}
        //     {pair.comment}
        // ))
        // }
         return(
            <Grid container spacing={0}>
            <Grid item xs={7}>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
            </Grid>
            
            <Grid item xs={5}> 
            <Box>
            {
                store.currentList?store.currentList.comment.map((pair) => (
                    <CommentArea
                        username={pair.username}
                        comment={pair.comment}
                    />
                )):null
            }
                


            </Box>
            
            
            <TextField fullWidth onKeyDown={handleCommentList} placeholder={"Comment"}>Comment</TextField>
             </Grid>
            
            </Grid>
         )
    }

    return (
        <div id="playlist-selector">
            <Grid container spacing={0}>
            <Grid item xs={0.6}><HomeIcon style={{fontSize:'50px'}}/></Grid>
            <Grid item xs={0.6}><PersonIcon style={{fontSize:'50px'}}/></Grid>
            <Grid item xs={0.6}><GroupsIcon style={{fontSize:'50px'}}/></Grid>
            <Grid item xs={5}>
            <TextField
                id="search" 
                label="Search" type="search" style={{fontSize:'40px', left:'100px', width:'80%'}}
                />
            </Grid>
            <Grid item xs={3}><Typography align="right" style={{fontSize:'40px'}}>Sort By</Typography></Grid>
            <Grid item xs={2}><SortIcon  style={{fontSize:'40px'}}/></Grid>
            </Grid>

            
            <Tabs value={value} onChange={handleChange} >
                <Tab label="Player" value="1"  sx={{left:900,}}>
                    
                </Tab>
                <Tab label="Comment" value="2" sx={{left:900,}}>
                    
                </Tab>
            </Tabs>
            <TabPanel></TabPanel>
            
            <div>
            
            <Typography variant="h2" style={{textAlign:'center'}}>Your List<Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon/>
            </Fab></Typography>
            <Typography>-</Typography>

            </div>
            
                
            
            
            
            
            
        </div>)
}

export default HomeScreen;