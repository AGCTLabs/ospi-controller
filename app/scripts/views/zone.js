define(['vendor/text!tmplts/zone.html', 'utils'], 
    function(ZoneTemplate, Utils) {

var ZoneView = Backbone.View.extend({
  
    template: _.template(ZoneTemplate),

    events: {
      "change" : "change",
      "click a.save"   : "save",
      "click a.delete" : "delete",
      "click a.cancel" : "cancel"
    },

    initialize: function(options) {
      this.app = options.app;
      this.model = options.model;
      this.render();
    },

    render: function() {
      var parentDiv = $('#mcontent').empty();
      this.$el = $(this.template(this.model.toJSON()));
      parentDiv.append(this.$el);
    },

    remove : function() {
      $('#mcontent').empty();
    },

    change: function (event) {
      // Remove any existing alert message
      //utils.hideAlert();

      // Apply the change to the model
      var target = event.target;
      var change = {};
      change[target.name] = target.value;
      this.model.set(change);

    },

    save : function() {
        var self = this;
        var isNew = this.model.isNew();
        this.model.save( null, {
            success: function (model) {
              if (isNew) {
                self.app.zones.add(model);
              }
              self.app.showZoneActions(model);
              self.app.appRouter.navigate('zhs/' + model.id, false);
              Utils.showFeedback(
                {type:'success',msg: model.get('name') + ' successfully saved'});
            },
            error: function (model, err) {
              Utils.showMessage(
                {title:'Error',msg: err.responseText});
            }
        });
    },

    delete: function () {
      var self = this;
      this.model.destroy({
        success: function (model, response) {
         Utils.showFeedback(
              {type:'success',msg: model.name+' Successfully Deleted!!'});
             
          self.app.reloadZones();
          self.app.appRouter.navigate('/');
        },
        error: function (model, err) {
          $('#galert').feedback('show',
              {type:'error',msg: err.responseText});
        }
      });
    },

    cancel : function() {
       window.history.back();
    }


  });

  return ZoneView;
});
