Invites = new Meteor.Collection('invites');




Meteor.methods({
    invite_new: function(friend_id){
        Invites.insert({sender:Meteor.userId(), receiver: friend_id});
    },
    cancel_invite: function(friend_id){
        Invites.remove({ $and:[{ sender: Meteor.userId()}, {receiver: friend_id}] });
    }
});