Template.conversation.events({
    'click .send_message':function(){
        chat_body = $('.chat_body').val()
        console.log('chat_body',chat_body);
    }
});





Template.conversation.conv =  function(){
    console.log(Conversations.findOne(Router.current().params._id));
    return Conversations.findOne(Router.current().params._id);
}