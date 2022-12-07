import Box from '@mui/material/Box';

export default function CommentArea(props){
    const {username, comment} =props;

    return(
        <Box style={{background:"lightyellow", border: '2px solid #999999'}}>
        <Box style={{fontSize: '14pt' ,background:"lightyellow", color:'blue', textDecorationLine: 'underline'}}>
            {username}</Box>
        
        
        <Box style={{fontSize: '25pt',background:"lightyellow", color:'black', textDecorationLine: 'none'}}>
            {comment}</Box>

        </Box>
        


    )







}