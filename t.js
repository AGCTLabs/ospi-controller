var argv = require('optimist').argv;

var string = " mon,tue".trim();

//1 to 16 
//var regex = /^(1[0-6]|0[1-9]|[1-9])$/

//1 to 15 min(s)
//var regex = /^(1[0-5]|0[1-9]|[1-9]) +(min|mins)$/i

// hh:min am|pm
//var regex = /^(1[012]|[1-9]|0[1-9]):([0-5][0-9]) +(am|pm)$/i

// local|remote|local_and_remote
//var regex = /^(LOCAL|REMOTE|LOCAL_AND_REMOTE)$/i


// 0..59 secs / 0..59 mins
//var regex = /^([0-5]*[0-9]) +(sec|secs|min|mins)$/i

var regex = /(?!,)(Sun)*((^|,)Mon)*((^|,)Tue)*((^|,)Wed)*((^|,)Thu)*((^|,)Fri)*((^|,)Sat)?/i
//var regex = /(?!,)(Sun)?([,^]Mon)?([,^]Tue)?([,^]Wed)?([,^]Thu)?([,^]Fri)?([,^]Sat)?/
var result = string.match(regex);

//console.log(result);

if (result) {
  var statusNumber = result[1];
  var statusString = result[2];
  var ampm = result[3];
  console.log(statusNumber);
  console.log(statusString);
  console.log(ampm);
}
