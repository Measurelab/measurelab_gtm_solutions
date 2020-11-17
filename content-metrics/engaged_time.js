var timeEngaged = 0;
var idleTimer, timeInterval, timeOffset;

//  Utility function for attaching listeners to the window

var addListener = function(evt, cb) {
if (window.addEventListener) {
window.addEventListener(evt, cb);
} else if (window.attachEvent) {
window.attachEvent('on' + evt, cb);
}
};

//  Set the user as idle, and clear the interval recording engaged time

var setIdle = function() {
  if (timeInterval) {
    clearInterval(timeInterval);
    timeInterval = null;
  }
};

//  Reset the 5 second idle timer. Start the interval recording engaged time

var pulse = function(evt) {
  if (!timeInterval) {
    timeOffset   = Date.now();
    timeInterval = setInterval(timeUpdate, 100);
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(setIdle, 5000);
  } 
};   

// Utility function for updating the engaged time    

function timeUpdate() {
  timeEngaged += delta();
}

// Utility function for getting the time difference

function delta() {
  var now = Date.now(),
      d   = now - timeOffset;
  timeOffset = now;
  return d;
}

// Setting listeners for engagement to fire 'pulse'    

addListener('mousedown', pulse);
addListener('keydown', pulse);
addListener('scroll', pulse);
addListener('mousemove', pulse);