import React from 'react';
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store'
import { useContext, useState } from 'react'
import { Card, Typography,Paper} from '@mui/material';

import SquareIcon from '@mui/icons-material/Square';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrow from '@mui/icons-material/PlayArrow';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


export default function YouTubePlayerExample() {
    const { store } = useContext(GlobalStoreContext);
    const [nowPlayingindex,setNowPlayingIndex]= useState(0) 
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    let player;
    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [];
    let playlistTitle=[];
    let playlistArtist=[];
    let playlistIndex=[];
    let playListName;
    

    if(store.currentList){
    for(let i=0; i<store.getPlaylistSize();i++){
        playlist[i]=store.currentList.songs[i].youTubeId
        playlistTitle[i]=store.currentList.songs[i].title
        playlistArtist[i]=store.currentList.songs[i].artist
        playlistIndex[i]=i+1
    }

    playListName=store.currentList.name
    }
    
    // console.log("playlist"+ playlist)
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        height: '300',
        width: '620',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[nowPlayingindex];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        // currentSong++;
        // currentSong = currentSong % playlist.length;
        // setNowPlayingIndex(currentSong)
        //replace currentSong with nowPlayingIndex
        let index = nowPlayingindex+1
        console.log("playlist length is "+playlist.length)
        console.log("songindex is "+ index)
        //
        if(index==playlist.length){
            index=playlist.length-1
        }

        index=index % playlist.length;
        setNowPlayingIndex(index);
    }
    
    function onPlayerReady(event) {
        player=event.target;
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }
    function handlePause(event){
        player.stopVideo();
    }
    function handlePlay(event){
        player.playVideo();
    }
    function handleFastForward(event){
        incSong();
        loadAndPlayCurrentSong(player)

    }
    function handleFastRewind(event){
        let index=nowPlayingindex-1;
        if(index<0){
            index=0
        }
        index = index % playlist.length;
        setNowPlayingIndex(index);
        loadAndPlayCurrentSong(player)

    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }
    
    return <div>
        <YouTube 
        videoId={playlist[nowPlayingindex]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />
        <Box>
        <Card align="center">Now Playing</Card>
        <Card>Playlist: {playListName}</Card>
        <Card>Title:{playlistTitle[nowPlayingindex]}</Card>
        <Card>Song#:{playlistIndex[nowPlayingindex]}</Card>
        <Card>Artist:{playlistArtist[nowPlayingindex]}</Card>
        <Card align="center">
        <Button>
                <FastRewindIcon style={{fontSize:'40px'}} onClick={handleFastRewind}/>
        </Button>
        <Button><SquareIcon style={{fontSize:'40px'}} onClick={handlePause}/></Button>
        <Button><PlayArrowIcon style={{fontSize:'40px'}} onClick={handlePlay}/></Button>
        <Button><FastForwardIcon style={{fontSize:'40px' }} onClick={handleFastForward}/></Button>
        

        </Card>
        {/* <Grid container spacing={0}>
            <Grid item xs={12}  style={{fontSize:'40px', left:'500px', width:'80%'}}>Now Playing</Grid>
            <Grid item xs={0.6}><PlayArrowIcon/></Grid>
            <Grid item xs={0.6}><PlayArrowIcon/></Grid>
            <Grid item xs={0.6}><PlayArrowIcon/></Grid>
            <Grid item xs={0.6}><FastForwardIcon/></Grid>
            <Grid item xs={0.6}><FastForwardIcon/></Grid>
            
            <Grid item xs={2}><FastForwardIcon/></Grid>
            </Grid> */}
        

        </Box>
    </div>
        
        


}