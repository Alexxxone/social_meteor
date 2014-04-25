Template.left_menu.events({
    'click .show_drop_menu':function(){
      $('.drop_menu').slideToggle('fast');
    }
});
Template.left_menu.active = function(path){
  if(Router.current().path == path)
    return 'active';
};