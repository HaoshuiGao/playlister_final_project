import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';


import WorkspaceScreen from './WorkspaceScreen';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    
    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }
    
    function handleCloseList(){
        store.closeCurrentList();
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        console.log("event is"+ event)
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        console.log("tolgge")
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    
    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '25pt' , border: '2px solid #999999', background:'lightyellow'}}
            className = {"playlist-card"}
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            //     }
            // }
            // onDoubleClick= {(event) => {
            //     handleToggleEdit(event)}}
            //     aria-label='edit' 
            
        >
            
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name} 
            
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'20pt'}} />
                </IconButton>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                        console.log("event is"+ event)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'20pt'}} />
                </IconButton>
            </Box>
            {/* <ThumbUpIcon sx={{ p: 1, flexGrow: 1 }}/>
            <ThumbDownIcon sx={{ p: 1, flexGrow: 1 }}/> */}
            <IconButton>
            <KeyboardDoubleArrowDownIcon sx={{ p: 1, flexGrow: 1 ,bgcolor:'lightyellow',left:'50%' }} onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}/></IconButton>
            <IconButton>
            <KeyboardDoubleArrowUpIcon sx={{ p: 1, flexGrow: 1 ,bgcolor:'lightyellow',left:'50%' }} onClick={(event) => {
                handleCloseList()
            }}/></IconButton>
            <Box>
            {(store.currentList?(store.currentList._id==idNamePair._id?<WorkspaceScreen />:null):null)}
            </Box>
            </Box>
            
            {/* <Accordion >
            <AccordionSummary>
            <IconButton>
            <KeyboardDoubleArrowDownIcon sx={{ p: 1, flexGrow: 1 ,bgcolor:'lightyellow' }} onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}/>
            </IconButton>
            </AccordionSummary>
            <AccordionDetails>
                
                    {(store.currentList?(store.currentList._id==idNamePair._id?<WorkspaceScreen height="300px"/>:null):null)}
                
            </AccordionDetails>
            </Accordion> */}
        
            

        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;