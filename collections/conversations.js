Conversations = new Meteor.Collection('conversations');



Meteor.methods({
    new_conversation: function(friend_id){

        convers = Conversations.find({ members:  { $all : [ Meteor.userId(), friend_id ] } });
        console.log('convers',Meteor.userId(),friend_id);
        if(convers.count() >= 1 ){
            conv_id =  convers._id
        }else{
            conv_id = Conversations.insert( {members: [Meteor.userId(),friend_id ]} );

        }
        return conv_id;

    }
});