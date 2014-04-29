//unless $('#contactModal').length
//frag = Meteor.render(Template.contact)
//document.body.appendChild(frag)
//else
//$('#contactModal').modal('show')


Template.my_wall.helpers({
    images: function(){
        return ImagesFS.find();
    },
    on_mind: function(on_mind){
        if(on_mind && on_mind.length){
            return true;
        }
        return false;
    },
    wall: function(){
        if(Session.get('wall_sort')){
            return Walls.find({sender: Session.get('wall_sort')},{sort: {created_at: -1}});
        }else{
            return Walls.find({},{sort: {created_at: -1}});
        }
    }
});
Template.my_wall.events({
    'click .my_avatar':function(){
        if(!$('#avatar_modal').length){
            frag = UI.render(Template.avatar);
            UI.insert(frag,document.body);
        }
    },
    'click .wall_records_header a': function(e){
        e.preventDefault();
        user = Template.wall.currentProfile();
        if(Session.get('wall_sort')){
            $(e.currentTarget).text('Show only '+user.profile.name+' records');
            Session.set('wall_sort',false);
        }else{
            $(e.currentTarget).text('Show All records');
            Session.set('wall_sort',user._id);
        }
    },
    'focusin .wall_textarea': function(){
        $('.fa-chevron-down').click();
    },
    'click .fa-chevron-up': function(e){
        $('.wall_textarea').css('height','33px');
        $(e.currentTarget).attr('class','fa fa-chevron-down pull-right fa-2x');
        $('.new_wall,.append_to_wall').addClass('slow_hidden');
        $('.wall_append_box').addClass('slow_hidden');
    },
    'click .fa-chevron-down': function(e){
        $('.wall_textarea').css('height','70px');
        $(e.currentTarget).attr('class','fa fa-chevron-up pull-right fa-2x');
        $('.new_wall, .append_to_wall').toggleClass('slow_hidden');
    },
    'click .append_to_wall': function(){
        $('.wall_append_box').toggleClass('slow_hidden');
    },
    'click .new_wall': function(){
        message = $('.wall_textarea');
        Meteor.call('new_wall', message.val(),Meteor.userId());
        message.val('');

    },
    'click .remove_wall': function(){
        Meteor.call('remove_wall', this._id);
    },
    'click .change_status':function(){
        $('.change_status_box').toggleClass('slow_hidden');
    },
    'click .change_status_box_save':function(){
        on_mind = $('.change_status_box_input').val();
        Meteor.call('set_on_mind',on_mind, function(e,s){
           if(s){
               $('.change_status_box').toggleClass('slow_hidden');
           }
        });


    }
});
