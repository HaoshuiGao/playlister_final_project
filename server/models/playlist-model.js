const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        comment:{type:[{username:String, comment:String}], required:true},
        publish:{type:Boolean, required:true},
        publishDate:{type:Date, required:false},
        like:{type:Number,required:false},
        dislike:{type:Number,required:false},
        listen:{type:Number,required:false},
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true }

        
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
