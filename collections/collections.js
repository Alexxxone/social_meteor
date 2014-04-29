
Notifications = new Meteor.Collection("notifications");

//var imageStore = new FS.Store.FileSystem("images", {
//    path: "/", //optional, default '~/cfs/files/name'
//    maxTries: 5 //optional, default 5
//});


ImagesFS = new FS.Collection("images", {
    stores: [
        new FS.Store.FileSystem('images', {path: "~/myfiles"})

    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});




//  jquery-jcrop
//  cfs-base-package
//  collectionFS
//  cfs-public-folder
//  cfs-storage-adapter
//  cfs-filesystem
