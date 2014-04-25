Template.my_invites.events({
   'click .cancel_friend_request':function(){
       Meteor.call('cancel_invite', this._id);
   }
});