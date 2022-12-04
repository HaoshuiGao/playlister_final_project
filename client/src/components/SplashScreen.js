import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function SplashScreen() {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/login'
    }
    const handleRegister = () => {        
        window.location.href = 'http://localhost:3000/register'
    }
    return (
        <div id="splash-screen">
           <Typography sx={{fontSize:'60px',height:"20%", fontWeight:'bold'}}>Playlister</Typography>
           <Typography sx={{fontSize:'30px',fontWeight:'bold',height:"10%"}}>Welcome to Playlister!</Typography>
           <Typography sx={{fontSize:'20px'}}>Let Fill the Life with Music</Typography>
           <Typography sx={{fontSize:'20px'}}>Sign in to continue to Playlister</Typography>
           <Typography sx={{fontSize:'15px'}}>Developed by Haoshui Gao </Typography>
           <Button onClick={handleLogin}   variant="contained" sx={{bottom:300, right:40,}}>Login</Button>
           <Button onClick={handleRegister}  variant="contained" sx={{bottom:300, }}>Create Account</Button>
           <Button variant="contained" sx={{bottom:300, left:40}}>Continue as Guest</Button>
        </div>
    )
}