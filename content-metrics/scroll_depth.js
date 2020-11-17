if(scrollDepth){

    var winheight, docheight, trackLength, throttlescroll
    
    window.depthTrack = 0;
    
    // This function return the height of the page
    
    function getDocHeight() {
      var D = document;
      return Math.max(
          D.body.scrollHeight, D.documentElement.scrollHeight,
          D.body.offsetHeight, D.documentElement.offsetHeight,
          D.body.clientHeight, D.documentElement.clientHeight
      )
    }
    
    // This function returns the trackable length of the page
    
    function getmeasurements(){
      winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
      docheight = getDocHeight()
      trackLength = docheight - winheight
    }
    
    // This function returns the depth scrolled as a percentage of page height and sets it to the depthTrack global variable if it is greater than the variable's current value
    
    function amountscrolled(){
      var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
      var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
      //console.log(pctScrolled + '% scrolled')
      if(pctScrolled > window.depthTrack){
      window.depthTrack = pctScrolled
      } 
    }
    
    getmeasurements()
    
    // This listener checks for browser resizing and updates the page size values
    
    window.addEventListener("resize", function(){
      getmeasurements()
    }, false)
    
    // This listener checks for user scrolling and updates the depth scrolled
    
    window.addEventListener("scroll", function(){
      clearTimeout(throttlescroll)
          throttlescroll = setTimeout(function(){ // throttle code inside scroll to once every 50 milliseconds
          amountscrolled()
      }, 50)
    }, false)
    
    };