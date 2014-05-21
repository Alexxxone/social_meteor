if(Meteor.isClient){
    Meteor.methods({
        notify: function (message,status) {
            $.gritter.add({
                title: status,
                text: message,
                time: 3000
            });
        }
    });


    Player = {
        playList: function(){
            return _.pluck(AudioFS.find({}, {fields: {_id: 1}}).fetch(),'_id');
        },
        current_song: {
            song: false
            ,
            get: function(){
               return this.song;
            },
            set: function(_id){
                this.song = AudioFS.findOne({_id: _id});
            }
        },
        current_index: 0,
        next: function(){
            audio = AudioFS.findOne(this.playList()[this.current_index]);
            this.current_song.set(audio._id);
            this.select_song(audio.url(),audio.name(),false);
            this.current_index++;
        },
        prev: function(){
            this.current_index-=1;
            audio = AudioFS.findOne(this.playList()[this.current_index]);
            this.current_song.set(audio._id);
            this.select_song(audio.url(),audio.name(),false);

        },
        player: function(){
            return document.getElementById('audio-player')
        },
        progressBox: $('.play_progress'),
        progressBar: $('.play_progress div'),

        currentSong_Name: false,
        mark_selected: function(target){
            $('.select_song.currentMusic').removeClass('currentMusic');
            target.addClass('currentMusic');
        },
        set_songName: function(name){
            this.currentSong_Name = name;
            $('.songName').text(name);
        },
        set_songUrl: function(url){
            this.player().src = url;
        },

        play_btn: function(){
            if(!this.player().src){
                var song = $('.select_song:first');
                var new_url  = song.attr('name');
                var new_name = song.text();
                this.select_song(new_url,new_name,song);
            }else{
                this.play();
            }
        },
        play: function(){
            $('.play-bt').attr('class','pause-bt').find('i').attr('class','fa fa-pause fa-fw');
            this.player().play();
        },

        stop: function(){
            this.player().pause();
            this.player().currentTime = 0;
        },

        pause: function(){
            $('.pause-bt').attr('class','play-bt').find('i').attr('class','fa fa-play fa-fw');
            this.player().pause();
        },

        progress: function(){

        },

        select_song: function(url,name,target){
            this.set_songName(name.split('.mp3')[0]);
            this.set_songUrl(url);
            this.play();
            if(target)
                this.mark_selected(target);
        },
        scroll: function(target){
            if(this.player.src){
                var parentOffset = target.offset();
                var relX = e.pageX - parentOffset.left;
                var new_width = (player.duration * (relX-5) ) / (target.width());
                player.currentTime = new_width;
            }
        }

    };
}
UI._allowJavascriptUrls()

Meteor.methods({
    set_counts: function (count) {
        Meteor.counters = {
            counter: count
        };
        return Meteor.counters;
    }
});

Before = {
    load: function(){
    var handle, self;
    self = this;


    if (!this._site) {
        this._site = {
            ready: false,
            readyDeps: new Deps.Dependency
        };
        var site;
        site = self._site;
        site.ready = true;
        return site.readyDeps.changed();
    }
    handle = {
        ready: function() {
            var site;
            site = self._site;
            site.readyDeps.depend();
            return site.ready;
        }
    };
    return handle;
},
    set: function(field,arg){
    var site;
    site = self._site;
    site[field] = arg;
    return site.readyDeps.changed();
    },
    get: function(arg){
    var site;
    site = self._site;
    return site[arg];
}
};


