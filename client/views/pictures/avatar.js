Template.avatar.events({
    'change .fileUploader': function (event) {
        var fsFile = new FS.File(event.target.files[0]);
        fsFile.owner = Meteor.userId();
        ImagesFS.insert(fsFile, function (err,s) {
            if (err) throw err;
            console.log(s);
        });
    },
    'click .deleteFile': function () {
        ImagesFS.remove({_id: this._id})
    },
    'click .asAvatar': function () {
        Meteor.users.update({_id: Meteor.userId()},{$set: {'profile.avatar':this.fileHandler.imageUrl.url}})
    },
    'click #avatar_modal_wrapper':function(){
        $('#avatar_modal, #avatar_modal_wrapper').remove();
    }

});

Template.avatar.helpers({
    Files: function() {
        var filterOptions = {};
        var filter = Session.get('filter');

        if ( filter.sortBy && filter.sortBy == ''+filter.sortBy && filter.sortBy != '') {
            var query = {};
            query[filter.sortBy] = (filter.reversed)? 1 : -1;
            filterOptions.sort = query;
        }

        return ImagesFS.find({}, filterOptions); // We have to sort on client to..
    },
    isPaused: function() {
        return ImagesFS.queue.isPaused();
    },
    isOwner: function() {
        return (this.owner == Meteor.userId());
    },
    fileHandler: function(func) {
        if (!this.fileHandler)
            return func;
        for (var fId in this.fileHandler) {
            if (this.fileHandler[fId].func && this.fileHandler[fId].func == func)
                return this.fileHandler[fId].url;
        }
        return false;
    },
    progress : function() {
        var filesProgress = Math.round(this.currentChunk / (this.countChunks - 1) * 100);
        var queueProgress = ImagesFS.queue.progress(this._id);
        var responsiveProgress = Math.max(filesProgress, queueProgress);
        var fileInQue = ImagesFS.queue.getItem(this._id);

        if (this.complete && !this.download) {
            //downloaded og i kø grøn

        } else {
            if (fileInQue) {
                if (ImagesFS.queue.isPaused()) {
                    //upload pause gul rød
                    if (this.download) {
                        if (queueProgress == 100) {
                            return { barAStyle: 'bar-success', barBStyle:'progress-info', progressA: responsiveProgress, progressB: 100-responsiveProgress};
                        } else {
                            return { barAStyle: 'bar-warning', barBStyle:'bar-danger', progressA: responsiveProgress, progressB: 100-responsiveProgress};
                        }
                    } else {
                        return { barAStyle: 'bar-warning', barBStyle:'bar-danger', progressA: queueProgress, progressB: 100-queueProgress};
                    }
                    //download pause gul, blå
                } else {
                    //upload igang grøn gul
                    if (this.download) {
                        if (queueProgress == 100) {
                            return { barAStyle: 'bar-success', barBStyle:'progress-info', progressA: responsiveProgress, progressB: 100-responsiveProgress};
                        } else {
                            return { barAStyle: 'bar-warning', barBStyle:'progress-info', progressA: responsiveProgress, progressB: 100-responsiveProgress};
                        }
                    } else {
                        return { barAStyle: 'bar-success', barBStyle:'bar-warning', progressA: filesProgress, progressB: 100-filesProgress}; //queue -
                    }
                    //download igang grøn, blå
                }
            } else {
                //upload afbrudt gul, rød
                return { barAStyle: 'bar-warning',  barBStyle:'bar-danger', progressA: filesProgress, progressB: 100-filesProgress};
            }
        }

    },
    estTime : function() {
        var duration = (Date.now()-this.uploadDate);
        var estimate = ((duration / this.currentChunk * this.countChunks) + this.uploadDate);
        var myDate = new Date(duration);
        return myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
    },
    niceSize: function() {
        var fileSize = (this.length || this.len)
        var cGb = Math.floor(fileSize / 1000000000);
        if (cGb > 0) return (Math.floor(fileSize / 10000000)/100) + 'Gb';
        var cMb = Math.floor(fileSize / 1000000);
        if (cMb > 0) return (Math.floor(fileSize / 10000)/100) + 'Mb';
        var cKb = Math.floor(fileSize / 1000);
        if (cKb > 0) return (Math.floor(fileSize / 10)/100) + 'Kb';
        return fileSize + 'bytes';
    },
    transfereText: function() {
        if (!this.complete) {
            //check if file pointer found in queue
            if (ImagesFS.queue.getItem(this._id)) {
                //In progress
                if (ImagesFS.queue.isPaused())
                    return 'Paused'
                else
                    return 'In progress';
            } else {
                //Failed
                //Want to resume? show button with event:
                return 'Resume';
            } //EO progress / failed
        } else {
            //All done
            return 'Done';
        } //EO complete
    }, //EO text
    transfereStyleBS: function() {
        if (!this.complete) {
            //check if file pointer found in queue
            if (ImagesFS.queue.getItem(this._id)) {
                //In progress
                if (ImagesFS.queue.isPaused()) {
                    return 'label-warning';
                } else {
                    return 'label-info';
                } //EO paused
            } else {
                //Failed
                //Want to resume? show button with event:
                return 'label-important';
            } //EO progress / failed
        } else {
            //All done
            return 'label-success';
        } //EO complete
    }, //EO styleBS
    needToResumeUpload: function() {
        //Not complete, not in queue?
        return ( !this.complete && !ImagesFS.queue.getItem(this._id));
    }, //EO resume
    ownerUsername : function () {
        //lookup
        return extractProfile(this.owner).username;
    },
    isDownloading: function() {
        return ImagesFS.queue.isDownloading(this._id);
    },
    filehanderSupported: function() {
        return __meteor_runtime_config__.FILEHANDLER_SUPPORTED;
    }
});