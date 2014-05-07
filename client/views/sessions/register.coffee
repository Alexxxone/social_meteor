@Template.register.events
    'submit #register-form' : (e, t) ->
      e.preventDefault();
      email = secureInput(t.find('#account-email').value)
      password = t.find('#account-password').value
      confirmation = t.find('#confirmation_account-password').value
      name = t.find('#account-name').value
      if confirmation is password and name isnt ''
        Accounts.createUser email : email, password : password, profile: { name : name , locked_screen: false , avatar: '' }, (err)->
          if err
            console.log(err)
          else
            Router.go('/')
      else
        console.log("Password fields not Match! Or Empty Name!","error")
      false

secureInput = (val) ->
  $.trim(val)
  val.replace(/^\s*|\s*$/g, "")
  val.replace /<\/?[^>]+>/g, ""
isValidPassword = (val) ->
  val.length >= 6 ? true : false



