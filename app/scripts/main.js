requirejs.config({
  baseUrl: 'scripts',

  paths: {
    text: 'vendor/requirejs/text',
    jquery: 'vendor/jquery/jquery',
    jqueryui: 'vendor/jquery/jquery-ui',
    underscore: 'vendor/underscore/underscore',
    backbone: 'vendor/backbone/backbone',
    bootstrap: 'vendor/bootstrap/js/bootstrap'
  },

  shim: {
    'jquery': {
      exports: '$'
    },
    'jqueryui': {
      deps: ['jquery']
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery','underscore']
    , exports: 'Backbone'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'Bootstrap'
    },
    'views/app': {
      deps: [
      'jquery',
      'jqueryui',
      'underscore', 
      'backbone', 
      'bootstrap']
    }
  }
});

require(['views/app'], 
    function(AppView) {
  new AppView;
});

