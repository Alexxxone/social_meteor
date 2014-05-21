Notifications = new Meteor.Collection("notifications");

Meteor.methods({
    read_chat: function(conv_id){

        var readed_count =  Chat.find({$and: [{conv_id: conv_id},{receiver: Meteor.userId()},{ readed: false } ]}).count();
        if(readed_count != 0){
            Notifications.update({owner: Meteor.userId()},{$inc:{chat: -readed_count}});
        }
        Chat.update({$and: [{conv_id: conv_id},{receiver: Meteor.userId()},{readed: false} ]},{$set:{readed: true}}, {multi: true});
        return [readed_count,conv_id];
    },
    notification_chat_add: function(receiver){
        Notifications.update({owner: receiver}, {$inc: {chat: 1}});
    }




});



