// var mic, recorder, soundFile;

// var state = 0; // mousePress will increment from Record, to Stop, to Play

// function setup() {
//   createCanvas(400,400);
//   background(0);
//   fill(255);
//   text('Tell me your secret.', 20, 200);

//   // create an audio in
//   mic = new p5.AudioIn();

//   // users must manually enable their browser microphone for recording to work properly!
//   mic.start();

//   // create a sound recorder
//   recorder = new p5.SoundRecorder();

//   // connect the mic to the recorder
//   recorder.setInput(mic);

//   // create an empty sound file that we will use to playback the recording
//   soundFile = new p5.SoundFile();
// }

// function mousePressed() {
//   // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
//   if (state === 0 && mic.enabled) {
//        // Tell recorder to record to a p5.SoundFile which we will use for playback
//     recorder.record(soundFile);

//     background(255,200,0);
//     text('Recording now! Click to stop.', 20, 200);
//     state++;
//   }

//   else if (state === 1) {
//     recorder.stop(); // stop recorder, and send the result to soundFile

//     background(255,100,0);
//     text('Recording stopped. Click to play.', 20, 200);
//     state++;
//   }

//   else if (state === 2) {
//     soundFile.play(); // play the result!
//     // saveSound(soundFile, 'mySound.wav'); // save file
//     state++;
//   }
//   else if (state ===3) {
//     soundFile.stop();

//     state = 0;
//   }
// }




var mic, soundFile;
var amplitude;

var prevLevels = new Array(60);


function setup() {
  c = createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();

  rectMode(CENTER);
  colorMode(HSB);

  mic = new p5.AudioIn();
  mic.start();

  fill(255);
  text('TELL ME YOUR SECRET.', (windowWidth/2)-70, 200);

  // load the sound, but don't play it yet
  // soundFile = loadSound('try1.mp3')

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
  amplitude.smooth(0.5);
}

function draw() {
  // background(20, 20);
  // fill(255, 10)
  // text('press t to toggle source', 20, 20);

  var level = amplitude.getLevel();

  // rectangle variables
  var spacing = 10;
  var w = width/ (prevLevels.length * spacing);

  var minHeight = 2;
  var roundness = 20;

  // add new level to end of array
  prevLevels.push(level);

  // remove first item in array
  // prevLevels.splice(0, 0.5);

  // loop through all the previous levels
  for (var i = 0; i < prevLevels.length; i++) {

    var x = map(i, prevLevels.length, 0, width/2, width);
    var h = map(prevLevels[i], 0, 0.5, minHeight, height);

    var alphaValue = logMap(i, 0, prevLevels.length, 1, 250);

    var hueValue = map(h, minHeight, height, 150, 300);

    fill(hueValue, 255, 255, alphaValue);

    rect(x, height/2, w, h);
    rect(width - x, height/2, w, h);
  }

}