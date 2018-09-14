
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
    }
};

function onPause() {
}

function onResume() {
}

document.getElementById("play_button").onclick = playRadio;
var pause = true;
var myMedia;
function playRadio()
{

    if (pause)
    {
        myMedia = new Media("http://54.36.89.71:8616/stream")
        myMedia.play({ playAudioWhenScreenIsLocked : true });
        pause = false;
        showControls();
        MusicControls.subscribe(events);
        MusicControls.listen();
        MusicControls.updateIsPlaying(true);
        MusicControls.updateDismissable(false);
    }
    else
    {
        myMedia.stop();
        myMedia.release();
        pause = true;
        MusicControls.updateIsPlaying(false);
        MusicControls.updateDismissable(true);
    }
    return false;
};

function showControls()
{
    MusicControls.create({
        track       : 'RadijoGAMA',
        cover       : 'img/logo.png',
        hasPrev   : false,
        hasNext   : false,
    });
};

function events(action) 
{
    const message = JSON.parse(action).message;
    switch(message) 
    {
        case 'music-controls-pause':
            MusicControls.updateIsPlaying(false);
            MusicControls.updateDismissable(true);
            playRadio();
            break;
        case 'music-controls-play':
            MusicControls.updateIsPlaying(true);
            MusicControls.updateDismissable(false);
            playRadio();
            break;
        default:
            break;
    }
};

app.initialize();