
Notifications = new Meteor.Collection("notifications");

//var imageStore = new FS.Store.FileSystem("images", {
//    path: "/", //optional, default '~/cfs/files/name'
//    maxTries: 5 //optional, default 5
//});


ImagesFS = new FS.Collection("images", {
    stores: [
        new FS.Store.FileSystem('images')

    ],
    filter: {
        maxSize: 1048576, //in bytes
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png','jpg','jpeg']
        },
        deny: {
            contentTypes: ['images/*'],
            extensions: ['pngs']
        },
        onInvalid: function (message) {
            if (Meteor.isClient) {
                alert(message);
            } else {
                console.log(message);
            }
        }
    }
});


