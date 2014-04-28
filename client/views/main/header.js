Template.header.events({
    'click .sign_out': function(){
        Meteor.logout(Router.go('login'));
    },
    'click .friends_search': function(){
        $('.friends_search_list').removeClass('slow_hidden');
    }
});

Template.header.friends = function(){
    friends = Friends.find({members: Meteor.userId() });
    my_friends =   _.flatten(_.pluck(friends.fetch(),'members'));
    return Meteor.users.find({$and:[{_id: { $in: my_friends } }, {_id: {$ne: Meteor.userId()}}] });
};




