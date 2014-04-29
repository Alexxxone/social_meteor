
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

Walls.allow({
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

ImagesFS.allow({
    insert: function(userId, file) {
        return true;
    },

    update: function(userId, file, fields, modifier) {
        return true;
    },
    remove: function(userId, file) {return userId && file.owner === userId; }
});



