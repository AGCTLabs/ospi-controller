require.config({
  paths: {
    'jquery': 'vendor/jquery/jquery',
    'bootstrap': 'vendor/bootstrap/js/bootstrap',
    'underscore': 'vendor/underscore-amd/underscore',
    'backbone': 'vendor/backbone-amd/backbone',
  }
});

require(['views/app'], function(AppView) {
  new AppView;
});
