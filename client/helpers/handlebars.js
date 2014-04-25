
Handlebars.registerHelper('log', function(arg) {
   console.log(arg);
});
Handlebars.registerHelper('user_name', function() {
    if(Meteor.user()){
        return  Meteor.user().profile.name;
    }else{
        return 'Guest'
    }

});

Handlebars.registerHelper("prettifyDate", function(timestamp){
    return moment(new Date(timestamp)).fromNow();
});


Handlebars.registerHelper('emails_address', function(emails) {
    return  emails[0].address;
});



