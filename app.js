if(Meteor.isClient){
    Meteor.methods({
        notify: function (message,status) {
            $.gritter.add({
                title: status,
                text: message,
                time: 3000
            });
        }
    });
}