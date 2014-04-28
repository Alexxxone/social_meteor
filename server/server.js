Meteor.publish("conversations", function() {
    return Conversations.find({ members: {$in: [this.userId] }}, {limit: 10, sort: {created_at: -1} });
});


Meteor.publish("people", function() {
    return Meteor.users.find({ _id: { $ne: this.userId } });
});




Meteor.publish("friends", function() {
    return Friends.find({members: this.userId});
});
Meteor.publish("my_invites", function() {
    invites = Invites.find({sender: this.userId});
    my_invites = _.pluck(invites.fetch(),'receiver');
    return [Meteor.users.find({_id: { $in: my_invites } }),invites];
});


Meteor.publish("invites", function() {
    return Invites.find({receiver: this.userId});
});
Meteor.publish("wall", function() {
    return Walls.find({owner: this.userId});
});



