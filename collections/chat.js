Chat = new Meteor.Collection('chat');


Meteor.methods({
    start_chat: function(friend_id){
        Meteor.call('new_conversation',friend_id,function(e,s){
            if(s){
                Router.go('conversation',{_id: s});
            }
        })

    }
});