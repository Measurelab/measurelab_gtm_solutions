// Note: more specific CSS selectors should be used to ensure we're not selecting every iframe!

(function() {
    var myConfObj = {
        iframeMouseOver: false,
        iframeID: 'not found'
    }
    var frames = document.querySelectorAll('iframe');

    window.addEventListener('blur', function() {
        if (myConfObj.iframeMouseOver) {
            //console.log('Iframe Click: ID = ' + myConfObj.iframeID);
            // You can use myConfObj.iframeID in the event to identify the iframe.
            dataLayer.push({
                event: 'ga-event',
                eventCategory: '', //YOUR CATEGORY HERE
                eventAction: '', // YOUR ACTION HERE
                eventLabel: '', // YOUR LABEL HERE
                eventValue: '' // YOUR VALUE HERE
            });
        }
    });

    frames.forEach(function(element) {
        element.addEventListener("mouseover", function(event) {
            myConfObj.iframeMouseOver = true;
            myConfObj.iframeID = element.id; //OR WHATEVER VARIABLE IS APPROPRIATE
            //console.log('test');
            //dataLayer.push({
            //event : 'ga-event',
            //eventCategory : '',  // YOUR CATEGORY HERE
            //eventAction : '',   // YOUR ACTION HERE
            //eventLabel : ''    // YOUR LABEL HERE
        });
        element.addEventListener("mouseout", function(event) {
            myConfObj.iframeMouseOver = false;
        });
    });
}())