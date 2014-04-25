Template.header.events({
    'click .sign_out': function(){
        Meteor.logout(Router.go('login'));

    }
});


