Template.peopleAudio.events({
    'click .select_song': function(e){
        $('.songName').text(this.name().split('.mp3')[0]);
        player = document.getElementById('audio-player');
        player.pause();
        player.src = this.url();
        player.play();
        $('.select_song.currentMusic').removeClass('currentMusic');
        $(e.currentTarget).addClass('currentMusic')
    },
    'click #play-bt':function(e){
        player = document.getElementById('audio-player');
        if(!player.src){
            song = $('.select_song:first');
            player.src = song.attr('name');
            song.addClass('currentMusic');
            $('.songName').text(song.text().split('.mp3')[0]);
        }
        player.play();

        $(e.currentTarget).attr('id','pause-bt').find('i').attr('class','fa fa-pause fa-fw');
    },

    'click #pause-bt':function(e){
        player = document.getElementById('audio-player');
        player.pause();
        $(e.currentTarget).attr('id','play-bt').find('i').attr('class','fa fa-play fa-fw');
    },

    'click #stop-bt':function(){
        $("#audio-player")[0].pause();
        $("#audio-player")[0].currentTime = 0;

    },
    'mouseenter .volumeSlider':function(){
        $('.volume_box').css('opacity',1);
    },
    'mouseleave .volumeSlider':function(){
        $('.volume_box').css('opacity',0);
    },
    'click .play_progress':function(e){

        player = document.getElementById('audio-player');
        if(player.currentSrc){

            var parentOffset = $(e.currentTarget).offset();
            var relX = e.pageX - parentOffset.left;

            new_width = (player.duration * (relX-5) ) / ($('.play_progress').width());
            player.currentTime = parseFloat(new_width);
            console.log(relX,parentOffset,new_width);
        }
    }

});

Template.peopleAudio.helpers({
    audio: function(){
        return AudioFS.find({owner: currentProfile()._id});
    }
});
Template.peopleAudio.rendered = function(){
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
                song = $('.currentMusic').next();
                $('.currentMusic').removeClass('currentMusic');
                player.src = song.attr('name');
                player.play();
                song.addClass('currentMusic');
                $('.songName').text(song.text().split('.mp3')[0]);
                progress.width(0);
            }
            var fWidth = (elapsedTime / player.duration) * (progress.parents('.play_progress').width());
            console.log('play',fWidth);
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

currentProfile = function(){
    return Meteor.users.findOne(Router.current().params._id);
};