var Sound = require('node-mpg123');
var serialport = require("serialport");
var walk    = require('walk');
var fs = require('fs');


// // with ability to pause/resume:
// var music = new Sound('files/test.mp3');
// music.play();

// setTimeout(function () {
//     music.pause(); // pause the music after five seconds
// }, 5000);

// setTimeout(function () {
//     music.resume(); // and resume it two seconds after pausing
// }, 7000);

// // you can also listen for various callbacks:
// music.on('complete',function () {
//     console.log('Done with playback!');
// });


function listFiles(dir){
	var arr = [];
    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name);
        }else{
            //console.log(name);
            arr.push(name);
        }
    }
    return arr;
}

var mp3 = listFiles("mp3");
console.log("mp3",mp3);

var soundPlayer = new Sound(mp3[0]);
soundPlayer.play();

serialport.list(function (err, ports) {
	ports.forEach(function(port) {
	  //console.log("list",port)

	  if(port.manufacturer.split("Arduino").length > 1){

	  	var arduino = port.comName.split(".")[1];
	    console.log("found ARDUINO on ", arduino)

	    serialInit(arduino);
	  } else {
	  	console.log("no ARDUINO on", port.comName);
	  }

	});
});

function parseProtocoll (d, callback) {
	
	//console.log(d)
	if(d.charAt(0)=="("){
		var code = d.split("!")[0].charCodeAt(1) - "A".charCodeAt(0);

		if(code>=0 && code <= 20){
			// SUCCESS
			callback(code);
		}
		
	}
}

function serialInit (port) {
	serial = new serialport.SerialPort("/dev/tty." + port, {
	  baudrate: 9600,
	  parser: serialport.parsers.readline('\n')
	});

	serial.on("open", function () {
	  console.log('open serial');

	  serial.on('data', function(data){
	  	parseProtocoll(data, function (code) {
			console.log("play",code, mp3[code]);

			var file = mp3[code];
			if(file!=undefined){
				soundPlayer.stop();
				soundPlayer = new Sound(file);
				soundPlayer.play();
			}

	  	})
	  });
	  
	});

}