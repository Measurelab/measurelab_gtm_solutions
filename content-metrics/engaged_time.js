  (function() {
    var startEngage = new Date().getTime();
    var timeEngaged = 0;
    var idleTime = 0;
    var idle = true;
    var idleReport = false;
    var idleTimer, reportTimer;
    
    /*  Set the user as idle, and calculate the time
        they were non-idle */
    var setIdle = function() {
      idleTime = new Date().getTime();
      timeEngaged += idleTime - startEngage;
      idle = true;
    };
    
    /*  Reset the 5 second idle timer.
        If the user was idle, start the non-idle timer */
    var pulse = function(evt) {
      if (idle) {
        idle = false;
        startEngage = new Date().getTime();
        idleReport = false;
      }
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(setIdle, 5000); 
    };    
    
    //  Utility function for attaching listeners to the window
    var addListener = function(evt, cb) {
      if (window.addEventListener) {
        window.addEventListener(evt, cb);
      } else if (window.attachEvent) {
        window.attachEvent('on' + evt, cb);
      }
    };
    
    /* Push an event to dataLayer every 15 seconds
       unless the user is idle.
       Also, push an event when the user leaves the page */
    var report = function(evt) {
      if (!idle) {
        timeEngaged += new Date().getTime() - startEngage;
      }

      // Push the payload to dataLayer, and only push valid time values
      if (!idleReport && timeEngaged > 0 && timeEngaged < 3600000) { 
        window.nonIdleTimeElapsed = timeEngaged
      }
      if (idle) {
        idleReport = true;
      }
      
      // Fix possible beforeunload duplication problem
      if (evt && evt.type === 'beforeunload') {
	    window.removeEventListener('beforeunload', report);
      }
      timeEngaged = 0;
      startEngage = new Date().getTime();
      reportTimer = window.setTimeout(report, 15000);
    };
    addListener('mousedown', pulse);
    addListener('keydown', pulse);
    addListener('scroll', pulse);
    addListener('mousemove', pulse);
    addListener('beforeunload', report);
    idleTimer = window.setTimeout(setIdle, 5000);
    reportTimer = window.setTimeout(report, 15000);
  })();