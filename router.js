Router.configure({
    layoutTemplate: "layout",
    notFoundTemplate: "notFound",
    loadingTemplate: "loading",
    yieldTemplates: {
        'header': { to: 'header' },
        'left_menu': { to: 'left_menu' }
    },

    before: function() {
//        this.subscribe('site_names').wait();
        if (!Meteor.userId() && this.route.name != 'register' && this.route.name != 'login') {
            return Router.go('login');
        }
    }
});

Router.map(function() {
    this.route("home", {
        path: '/',
        template: 'home'
    });
    this.route("login", {
        path: "/login",
        yieldTemplates: {
        }

    });
    this.route("register", {
        path: "/register",
        yieldTemplates: {
        }
    });

    this.route("people", {
        path: "/people",
        waitOn: function(){
            return Meteor.subscribe('people');
        }
    });
    this.route("friends", {
        path: "/friends",
        waitOn: function(){
            return [Meteor.subscribe('friends'),Meteor.subscribe('my_invites'),Meteor.subscribe('invites')];
        },
        data: {
            my_friends: function(){
                return Meteor.users.find({});
            },
            my_invites: function(){
                invites = Invites.find({sender: Meteor.userId() });
                my_invites = _.pluck(invites.fetch(),'receiver');
                return Meteor.users.find({_id: { $in: my_invites } });
            },
            invites: function(){
                invites = Invites.find({receiver: Meteor.userId() });
                my_invites = _.pluck(invites.fetch(),'sender');
                return Meteor.users.find({_id: { $in: my_invites } });
            }
        }
    });



});

