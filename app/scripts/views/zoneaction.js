define(['vendor/text!tmplts/zoneaction.html'], function(template) {

  var ZoneActionView = Backbone.View.extend({
    template: _.template(template),

    events: {
       'click #zopenshut':  'openShut'
    },

    initialize: function(options) {
      this.app = options.app;
      this.model = options.model;
      this.$el = $('#zac');
      this.render();
    },

    render: function() {
      this.$el.empty();
      this.stopTimer();
      var item = this.model.toJSON();
      var content = this.template(item);
      this.$el.append(content);

      if (item.active !== 'Yes' && item.valve_open != true) {
        this.$el.find('#zopenshut').addClass('disabled');
      }
      if (item.valve_open) {
        this.startTimer({"item": item, "start_time" : item.open_time, el: this.$el.find('#counter > h3')});
      }      
    },

    openValve : function(item) {
      if (item.valve_open) 
        return;
      
      this.app.openValve(item.id);
    },

    shutValve : function(item) {

      if (!item.valve_open) 
        return;

      this.app.shutValve(item.id);
    },

    openShut : function() {
      var item = this.model.toJSON();

      if (item.valve_open) {
        this.shutValve(item);
      } else {
        this.openValve(item);
      }
    },

    stopTimer : function() {
      if (this.timer) {
        clearInterval(this.timer);
        delete this.timer;
      }
    },

    startTimer: function(args) {

      var item = args.item;
      var d1 = new Date(args.start_time);
      var el = args.el

      var d2 = new Date();

      var millis = d2.valueOf() - d1.valueOf();

      var that = this;

      this.stopTimer();

      var showTimer = function () {
        var hours = Math.floor(millis / 36e5),
        mins = Math.floor((millis % 36e5) / 6e4),
        secs = Math.floor((millis % 6e4) / 1000);
        el.html(hours+':'+mins+':'+secs);  
      }

      this.timer = setInterval(function(){
        millis += 1000;
        showTimer();
      }, 1000);
    }
  });

  return ZoneActionView;
});
