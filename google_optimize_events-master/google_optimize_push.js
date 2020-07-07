function(){
return function(){
var propertyId =  ; // YOUR PROPERTY ID HERE
   if (gaData[propertyId] !== undefined && typeof(gaData[propertyId].experiments) !== "undefined" && window.optHitCounter !== 1) {
   var activeExperiments = Object.keys(gaData[propertyId].experiments);
   window.optHitCounter = 1;
      var mCnt = activeExperiments.length;
      for (var i=0; i < mCnt; i++) {
           var mExp = activeExperiments[i];
           var curVar = gaData[propertyId].experiments[mExp];
           window.dataLayer.push({
            'event': 'google_optimize',
              'eventCategory': 'Google Optimize',
              'eventAction': 'Experiment ID: ' + mExp,
              'eventLabel': 'Variation ID: ' + curVar
           });
         }
}
}
}
