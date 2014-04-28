Template.conversation.events({
    'click .send_message':function(){
        chat_body = $('.chat_body');
        Meteor.call('new_chat',chat_body.val(),Template.conversation.conv()._id);
        scrollToBottom();
        chat_body.val('');
    }
});
Template.conversations.events({
    'click':function(){
       members = this.members;
       var right_id;
        $.each(members, function(i,v){
            if(v != Meteor.userId()){
                right_id = v;
            }
        });
        console.log(right_id,Meteor.userId());
       Router.go('conversation',{_id: right_id});
    }
});



Template.conversation.rendered = function(){
    Meteor.setTimeout(function() {
        $('#conversation_box').slimScroll({height: '700px',start: 'bottom'});
    },100);
};
Template.conversation.destroyed = function(){
    $('.slimScrollDiv').remove()
};

function scrollToBottom(){
    scrollTo_val = $('#conversation_box>div.row:first').height() * $('#conversation_box > div.row').length + 'px'
    $('#conversation_box').slimScroll({scrollTo: scrollTo_val})
}

Template.conversation.conv =  function(){
    return Conversations.findOne();
};