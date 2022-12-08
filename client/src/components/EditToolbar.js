import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    function handlePublish(){
        store.publishList(store.currentList._id);
    }
    function handleDuplicateList(){
        store.duplicateList(store.currentList._id)
    }
    return (
        <div id="edit-toolbar">
            
            <Button
                id='duplicate-list-button'
                variant="contained"
                onClick={handleDuplicateList}
                >
                Duplicate
            </Button>
            <Button
                id='publish-list-button'
                disabled={(store.currentList.publishDate?true:false)}
                onClick={handlePublish}
                variant="contained">
                PUBLISH
            </Button>
            <Button
                //disabled={(!store.canAddNewSong()) && (store.currentList.publishDate?true:false)}
                disabled={(store.currentList.publishDate?true:(!store.canAddNewSong()))}
                id='add-song-button'
                onClick={handleAddNewSong}
                variant="contained">
                <AddIcon />
            </Button>
            <Button 
                disabled={(store.currentList.publishDate?true:(!store.canUndo()))}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
                disabled={(store.currentList.publishDate?true:(!store.canRedo()))}
                id='redo-button'
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />
            </Button>
            {/* <Button 
                disabled={!store.canClose()}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button> */}
        </div>
    )
}

export default EditToolbar;