Chat = new Meteor.Collection('chat');


Meteor.methods({
    new_chat: function(body,conv_id){
       sender_name = Meteor.user().profile.name;
       Conversations.update({_id: conv_id},{$set: {last_message: body, sender_name: sender_name, created_at: new Date().getTime()}});
       Chat.insert({conv_id: conv_id, body: body, sender: Meteor.userId(), sender_name: sender_name, created_at: new Date().getTime(), readed: false});

    }
});