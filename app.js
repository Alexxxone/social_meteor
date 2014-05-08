if(Meteor.isClient){
    Meteor.methods({
        notify: function (message,status) {
            $.gritter.add({
                title: status,
                text: message,
                time: 3000
            });
        }
    });
}
UI._allowJavascriptUrls()

Meteor.methods({
    set_counts: function (count) {
        Meteor.counters = {
            counter: count
        };
        return Meteor.counters;
    }
});

Before = {
    load: function(){
    var handle, self;
    self = this;


    if (!this._site) {
        this._site = {
            ready: false,
            readyDeps: new Deps.Dependency
        };
        var site;
        site = self._site;
        site.ready = true;
        return site.readyDeps.changed();
    }
    handle = {
        ready: function() {
            var site;
            site = self._site;
            site.readyDeps.depend();
            return site.ready;
        }
    };
    return handle;
},
    set: function(field,arg){
    var site;
    site = self._site;
    site[field] = arg;
    return site.readyDeps.changed();
    },
    get: function(arg){
    var site;
    site = self._site;
    return site[arg];
}
};


