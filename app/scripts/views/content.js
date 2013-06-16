define(['vendor/text!tmplts/content.html', 'backbone'], function(template, Backbone) {

  var ContentView = Backbone.View.extend({
    template: _.template(template),

    events: {
       'click #zopenshut':  'openShut'
    },

    initialize: function(args) {
      this.app = args.app;
      this.$el = $('#mcontent');
      this.render();
      this.app.viewState.on("change:zone2Show", this.render, this);
    },

    render: function() {
      this.$el.empty();
      this.stopTimer();
      var zone2Show = this.app.viewState.get('zone2Show');
      var item = this.app.data[zone2Show];

      var content = this.template(item);
      this.$el.append(content);
      if (item.valve_open) {
        this.startTimer({"item": item, "start_time" : item.open_time, el: this.$el.find('#counter > h3')});
      }      
    },

    openValve : function() {
      var zone2Show = this.app.viewState.get('zone2Show');
      var item = this.app.data[zone2Show];

      if (item.valve_open) 
        return;

      item.valve_open = true;
      item.open_time = new Date().valueOf();
      this.$el.find('#counter span').text('Last Run : '+new Date(item.open_time));
      this.startTimer({"item": item, "start_time" : item.open_time, el: this.$el.find('#counter > h3')});
      this.app.viewState.openValve(item.id);

      this.$el.find('#zopenshut').text("Shut");
    },

    shutValve : function() {

      var zone2Show = this.app.viewState.get('zone2Show');
      var item = this.app.data[zone2Show];

      if (!item.valve_open) 
        return;

      delete item.valve_open;
      this.stopTimer();
      this.$el.find('#counter > h3').empty();
      this.app.viewState.shutValve(item.id);
      this.$el.find('#zopenshut').text("Open");
    },

    openShut : function() {
      var zone2Show = this.app.viewState.get('zone2Show');
      var item = this.app.data[zone2Show];

      if (item.valve_open) {
        this.shutValve();
      } else {
        this.openValve();
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
      var d1 = args.start_time;
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

  return ContentView;
});
