
Chat.allow({
    insert: function(userId, message) {

        return userId && message.sender === userId;
    },
    update: function() {
        return false;
    },
    remove: function(userId, message) {
        return userId && message.sender === userId;
    }
});
Friends.allow({
    insert: function(userId, friends) {
        return true;
    },
    update: function() {
        return false;
    },
    remove: function(userId, message) {
        return true;
    }
});
Invites.allow({
    insert: function(userId, friends) {
        return true;
    },
    update: function() {
        return false;
    },
    remove: function(userId, message) {
        return true;
    }
});

Notifications.allow({
    insert: function(userId, friends) {
        return true;
    },
    update: function() {
        return false;
    },
    remove: function(userId, message) {
        return true;
    }
});

Conversations.allow({
    insert: function(userId, friends) {
        return true;
    },
    update: function() {
        return false;
    },
    remove: function(userId, message) {
        return true;
    }
});


