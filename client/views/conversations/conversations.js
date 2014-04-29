

Template.conversation.events({
    'click .send_message':function(){
        chat_body = $('.chat_body');
        Meteor.call('new_chat',chat_body.val(),Template.conversation.conv()._id);
        scrollToBottom();
        chat_body.val('');
        $("div#conversation_box .row .col-lg-7 p").emotions();

    },
    'click #smilesBtn': function(){
        $("#smilesChoose").toggle();
    },
    'click #smilesChoose span':function(e){
        var inputEl = $(".chat_body");
        var shortCode = $.emotions.shortcode($(e.currentTarget).attr("title"));
        inputEl.val(inputEl.val() + " " + shortCode + " ").focus();
        $("#smilesChoose").toggle();
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

Template.chat.rendered = function(){
    console.log(this);
   this.$('.row .col-lg-7 p').emotions();
};


Template.conversation.rendered = function(){
    Meteor.setTimeout(function() {
        $('#conversation_box').slimScroll({height: '700px',start: 'bottom'});

    },100);

    var smiles = $("#smilesChoose");
    smiles.emotions();

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