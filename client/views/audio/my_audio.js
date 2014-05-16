Template.my_audio.events({
    'change .fileUploader': function (event) {
        var fsFile = new FS.File(event.target.files[0]);
        user_id = Meteor.userId();
        fsFile.owner = user_id;
        AudioFS.insert(fsFile, function (err,s) {
            if (err) throw err;
        });

    },
    'click .remove_audio': function () {
        AudioFS.remove({_id: this._id})
    },
    'click .select_song': function(e){
        Player.select_song(this.url(),this.name(), $(e.currentTarget));
    },
    'click .play-bt':function(){
        Player.play_btn();
    },

    'click .pause-bt':function(e){
        Player.pause();
    },

    'click .stop-bt':function(){
        Player.stop();
    },
    'mouseenter .volumeSlider':function(){
        $('.volume_box').css('opacity',1);
    },
    'mouseleave .volumeSlider':function(){
        $('.volume_box').css('opacity',0);
    },
    'click .play_progress':function(e){
        Player.scroll($(e.currentTarget));
    },
    'keyup .search_song': function(e){
        var query = $(e.currentTarget).val();
        Session.set('audio_search',query);
    }

});

Template.my_audio.helpers({
    audio: function(){
        if(Session.get('audio_search'))
            return AudioFS.find({'original.name': new RegExp(Session.get('audio_search'),'i')});
        return AudioFS.find();
    }
});
Template.my_audio.rendered = function(){

    player = document.getElementById('audio-player');
    $( ".volumeSlider" ).slider({
        range: "max",
        min: 0,
        max: 10,
        value: 10,
        slide: function( event, ui ) {
            player.volume = ui.value/10;
            $(".currentVolume").text( ui.value );
        }
    });

    player.addEventListener("timeupdate", play_progress, true);
    function play_progress() {

        //get current time in seconds
        var elapsedTime = Math.round(player.currentTime);
        //update the progress bar
        var progress  = $('.play_progress div');
        var playTime = $('.current_playTime');
        var min = 0;
        var sec = 0;
        if (progress) {

            if(player.currentTime == player.duration){
                $('.current_playTime').text('')
                song = $('.currentMusic').next();
                $('.currentMusic').removeClass('currentMusic');
                player.src = song.attr('name');
                player.play();
                song.addClass('currentMusic');
                $('.songName').text(song.text().split('.mp3')[0]);
                progress.width(0);

            }
            var fWidth = (elapsedTime / player.duration) * (progress.parents('.play_progress').width());
            if (fWidth > 0) {
                progress.width(fWidth);
                if(elapsedTime>60 && elapsedTime<120){
                    min = 1;
                    sec = parseInt(elapsedTime) - 60;
                }else if(elapsedTime>120 && elapsedTime<180){
                    min = 2;
                    sec = parseInt(elapsedTime) - 120;
                }else{
                    sec = elapsedTime;
                }

                playTime.text(min+ ':' +sec);
            }
        }
    }

};


