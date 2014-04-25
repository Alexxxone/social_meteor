Meteor.publish("conversations", function() {
    return Conversations.find({ members: {$in: [this.userId] }}, {limit: 10, sort: {created_at: -1} });
});


Meteor.publish("people", function() {
    return Meteor.users.find({});
});




Meteor.publish("friends", function() {
    return Friends.find({sender: this.userId});
});
Meteor.publish("my_invites", function() {
    invites = Invites.find({sender: this.userId}).fetch();
    my_invites = _.pluck(invites,'receiver');
    return Meteor.users.find({_id: { $in: my_invites } })
});


Meteor.publish("invites", function() {
    return Invites.find({receiver: this.userId});
});



