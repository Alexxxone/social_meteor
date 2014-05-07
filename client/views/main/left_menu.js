Template.left_menu.events({
    'click .show_drop_menu':function(){
      $('.drop_menu').slideToggle('fast');
    },
    'click .sign_out': function(){
        Meteor.logout(Router.go('login'));
    }
});
Template.left_menu.helpers({
    active: function(path){
        if(Router.current().path == path){
            return 'active';
        }

    },messages_count: function(){
        return Chat.find().count();
    },
    invitations_count: function(){
        return Invites.find({receiver: Meteor.userId() }).count();
    }


});