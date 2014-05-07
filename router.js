Router.configure({
    layoutTemplate: "layout",
    notFoundTemplate: "notFound",
    loadingTemplate: "loading",
    yieldTemplates: {
        'header': { to: 'header' },
        'left_menu': { to: 'left_menu' }
    },

    before: function() {
        $('.friends_search_list').addClass('slow_hidden');
        if(!Meteor.userId() && this.route.name != 'register' && this.route.name != 'login') {
            Router.go('login');
        }else if( Meteor.user() && Meteor.user().profile.locked_screen && this.route.name != 'locked_screen' && this.route.name != 'register' && this.route.name != 'login' ){
            Router.go('locked_screen');
        }else{
            return [
                this.subscribe('friends').wait(),
                this.subscribe('my_invites').wait(),
                this.subscribe('invites').wait(),
                this.subscribe('unreaded_chat').wait()

            ];

        }
    },
    data: {
        my_friends: function(){
            friends = Friends.find({members: Meteor.userId() });
            my_friends =   _.flatten(_.pluck(friends.fetch(),'members'));
            return Meteor.users.find({$and:[{_id: { $in: my_friends } }, {_id: {$ne: Meteor.userId()}}] });
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



Router.onBeforeAction('loading');


Router.map(function() {
    this.route("home", {
        path: '/',
        template: 'my_wall',
        waitOn: function(){
            return [Meteor.subscribe('wall',Meteor.userId()),Meteor.subscribe('myFiles')];
        }
    });
    this.route("locked_screen", {
        path: "/locked",
        yieldTemplates: {
        }

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
        path: "/friends"

    });

    this.route("conversations", {
        path: "/conversations",
        waitOn: function(){
            return Meteor.subscribe('conversations');
        },
        data: {
            conversations: function(){
                return  Conversations.find();
            }
        }
    });
    this.route("conversation", {
        path: "/conversations/:_id",
        waitOn: function(){
            var _id = this.params._id;
            return [Meteor.subscribe('conversation',_id),Meteor.subscribe('chat', _id)];
        },
        data: {
            conv: function(){
                return Conversations.findOne(Router.current().params._id);
            },
             chat_messages: function(){
                return Chat.find();
            }
        }
    });



    this.route("wall", {
        path: ':_id',
        template: 'wall',
        waitOn: function(){
            return [Meteor.subscribe('one_my_invite',this.params._id),Meteor.subscribe('one_invite',this.params._id),Meteor.subscribe('one_friend',this.params._id),Meteor.subscribe('wallFiles',this.params._id), Meteor.subscribe('wall',this.params._id),Meteor.subscribe('user',this.params._id)];
        }
    });




});

