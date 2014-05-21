Template.header.events({
    'click .sign_out': function(){
        Meteor.logout(Router.go('login'));
    },
    'click .friends_search': function(){
        $('.friends_search_list').removeClass('slow_hidden');
    },
    'click .lock_screen':function(){
        Meteor.call('locked_screen_enable');
    },
    'click .show_player': function(){
        $('.header_player_box').toggleClass('flip').css('margin-top','-2px');
        $('.show_player_box').toggleClass('flip').css('margin-top','-25px');

    },
    'click .hide_player': function(){

        $('.header_player_box').toggleClass('flip').css('margin-top','20px');
        $('.show_player_box').toggleClass('flip').css('margin-top','0px');
    },
    'click .play-bt':function(){
        Player.play_btn();
    },
    'click .pause-bt':function(){
        Player.pause();
    },
    'click .stop-bt':function(){
        Player.stop();
    },
    'click .next-bt': function(){
        Player.next();
    },
    'click .prev-bt': function(){
        Player.prev();
    }
});

Template.header.friends = function(){
    friends = Friends.find({members: Meteor.userId() });
    my_friends =   _.flatten(_.pluck(friends.fetch(),'members'));
    return Meteor.users.find({$and:[{_id: { $in: my_friends } }, {_id: {$ne: Meteor.userId()}}] });
};

Template.header.rendered = function(){
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

};





