//Meteor.publish("conversations", function() {
//    return Conversations.find({ members: {$in: [this.userId] }}, {limit: 10, sort: {created_at: -1} });
//});


Meteor.publish("people", function() {
    return Meteor.users.find({});
});




Meteor.publish("friends", function() {
    friends = Friends.find({members: this.userId});
    my_friends =   _.flatten(_.pluck(friends.fetch(),'members'));
    console.log(my_friends);
    return [Meteor.users.find({_id: { $in: my_friends } }),friends];
});
Meteor.publish("my_invites", function() {
    invites = Invites.find({sender: this.userId});
    my_invites = _.pluck(invites.fetch(),'receiver');
    return [Meteor.users.find({_id: { $in: my_invites } }),invites];
});


Meteor.publish("invites", function() {
    invites = Invites.find({receiver: this.userId});
    my_invites = _.pluck(invites.fetch(),'sender');
    return [Meteor.users.find({_id: { $in: my_invites } }),invites];
});


Meteor.publish("conversations", function() {
    conversations = Conversations.find({members: this.userId});
    return Conversations.find({members: this.userId});
});

Meteor.publish("conversation", function(friend_id) {
    convers = Conversations.find({ members:  { $all : [ this.userId, friend_id ] } });
    if(convers.count() == 0){
        Conversations.insert( {members: [this.userId, friend_id ]} );
    }
    return Conversations.find({ members:  { $all : [ this.userId, friend_id ] } });
});
Meteor.publish("chat", function(friend_id) {
    conv_id = Conversations.findOne({ members:  { $all : [ this.userId, friend_id ] } })._id;
    return Chat.find({conv_id: conv_id});
});


Meteor.publish("wall", function(_id) {
    return Walls.find({owner: _id});
});
Meteor.publish("user", function(_id) {
    return Meteor.users.find(_id);
});


Meteor.publish("myFiles", function() {
    return ImagesFS.find({ owner: this.userId });
});

FS.HTTP.publish(ImagesFS, function () {
    // `this` provides a context similar to Meteor.publish
    return ImagesFS.find();
});



//var handler = {
//    "imageUrl": function (options) {
//        return {
//            blob: options.blob,
//            fileRecord: options.fileRecord
//        };
//    }
//}
//ImagesFS.fileHandlers(handler);

