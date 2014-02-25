var Sound = require('node-mpg123');
var serialport = require("serialport");
var walk    = require('walk');

// with ability to pause/resume:
var music = new Sound('files/test.mp3');
music.play();

setTimeout(function () {
    music.pause(); // pause the music after five seconds
}, 5000);

setTimeout(function () {
    music.resume(); // and resume it two seconds after pausing
}, 7000);

// you can also listen for various callbacks:
music.on('complete',function () {
    console.log('Done with playback!');
});


function listFiles(dir){
	var arr = [];
    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name);
        }else{
            console.log(name);
            arr.push(name);
        }
    }
    return arr;
}

var files = listFiles("files");
console.log(files);

serialport.list(function (err, ports) {
	ports.forEach(function(port) {
	  //console.log("list",port)
	  var name = port.comName.split(".")[1];

	  if(name.split("-")[0] == "usbserial"){
	    console.log("found ARDUINO on ", name)

	    serialInit(name);
	  }

	});
});

function serialInit (port) {
	serial = new serialport.SerialPort("/dev/tty." + port, {
	  baudrate: 9600
	});

	serial.on("open", function () {
	  console.log('open serial');

	  serial.on('data', function(data) {

	    // LOGIC AUF DAS ARDUINO
	    console.log('serial received: ' + data);
	  });
	  
	});

}