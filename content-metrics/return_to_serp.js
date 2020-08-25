(function() {
    var s = document.location.search;
    var h = document.location.hash;
    var e = {{Event}};
    var n = {{New History Fragment}};
    var o = {{Old History Fragment}};
    
    // Only run if the History API is supported
    if (window.history) {

      // Create a new history state if the user lands from Google's SERP
      if (e === 'gtm.js' && 
          document.referrer.indexOf('www.google.') > -1 && 
          s.indexOf('gclid') === -1 &&
          s.indexOf('utm_') === -1 &&
          h !== '#gref') {
        window.oldFragment = false;
        window.history.pushState(null,null,'#gref');
      } else if (e === 'gtm.js') {
        window.oldFragment = true;
      }

      // When the user tries to return to the SERP using browser back, fire the
      // Google Analytics timing event, and after it's dispatched, manually
      // navigate to the previous history entry, i.e. the SERP
      if (e === 'gtm.historyChange' && 
          n === '' && 
          o === 'gref') {
        var time = new Date().getTime() - {{DLV - gtm.start}};
        if (!window.oldFragment) {
          dataLayer.push({
            'event' : 'returnToSerp',
            'timeToSerp' : time,
            'eventCallback' : function() {
              window.history.go(-1);
            }
          });
        } else {
          window.history.go(-1);
        }
      }
    }
  })();