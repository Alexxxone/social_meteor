
Handlebars.registerHelper('log', function(arg) {
   console.log(arg);
});
Handlebars.registerHelper('my_name', function() {
    if(Meteor.user()){
        return  Meteor.user().profile.name;
    }else{
        return 'Guest'
    }
});
Handlebars.registerHelper('user_name', function(profile) {
    return  profile.name;
});
Handlebars.registerHelper("prettifyDate", function(timestamp){
    return moment(new Date(timestamp)).fromNow();
});


Handlebars.registerHelper('emails_address', function(emails) {
    return  emails[0].address;
});

Handlebars.registerHelper("status", function(user_id){

    status = Meteor.users.findOne({_id: user_id}).status;
    console.log(Meteor.users.findOne({_id: user_id}));
    if(status && status.online){
        status_s = 'online';
    }else{
        status_s = 'offline';
    }
    return status_s
});





