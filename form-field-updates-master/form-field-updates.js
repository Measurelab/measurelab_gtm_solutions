// Description: A JavaScript function to be put in a Custom HTML tag in Google Tag Manager that can be used to monitor the changes in HTML form fields and monitor form abandonment through data layer events
// Author: Victor Sarker
// Version: 1.02
// Note: This code has been adapted from Simo Ahava's 'Track Form Abandonment With Google Tag Manager' code snippets on: https://www.simoahava.com/analytics/track-form-abandonment-with-google-tag-manager/

(function formFieldUpdates() {
    // variables that need to be set go here
    var formSelector = 'form'; // Modify this CSS selector to match your form. Default is first form on the page
    var attribute = 'name'; // Modify this for the appropriate attribute to match from all the input and/or select elements from within the form. Default is the 'name' attribute
    
    //
    // ------------------------ !! DO NOT EDIT BELOW THIS LINE !! ------------------------
    //

    var inputSelector = formSelector + ' input[' + attribute + '], ' + formSelector + ' select[' + attribute + ']';
    var inputs = [];
    var initObj = {};
    var eventAction;

    // get all 'input' and 'select' elements from within the form with the chosen attribute
    window.document.querySelectorAll(inputSelector).forEach(function (input) {
        inputs.push(input);
    });

    for (var input of inputs) {
        initObj[input.getAttribute(attribute)] = input.value;
    }
    // create a copy of the intial object for storing updates
    var newObj = JSON.parse(JSON.stringify(initObj));

    // keep track of the form update history
    var updateHistory = [];

    // check the new object for updated property values
    var getUpdatedProps = function (newObj, initObj) {
        var updates = [];
        for (var key in newObj) {
            if (newObj[key] !== initObj[key]) {
                if (initObj[key] === '') { // used to be empty so it has been added
                    updates.push(key + ' added');
                } else if (newObj[key] === '') {
                    updates.push(key + ' removed'); // new key is empty so it has been removed
                } else {
                    updates.push(key + ' updated'); // both keys are not empty so it has been updated
                }
            }
        }
        return updates.join(', ');
    }

    // listen out for changes for any of the specified form input text fields (using regex)
    window.document.querySelector(formSelector).addEventListener('change', function (e) {
        updateHistory.push(e.target.getAttribute(attribute));
        newObj[e.target.getAttribute(attribute)] = e.target.value;
    });

    // listen out for the form submission event and compare objects for any updated fields
    window.document.querySelector(formSelector).addEventListener('submit', function () {
        eventAction = getUpdatedProps(newObj, initObj);
        if (updateHistory.length && (newObj !== initObj)) {
            window.dataLayer.push({
                event: 'formFieldsUpdated',
                eventCategory: 'Form Fields Updated',
                eventAction: eventAction
            })
        }
    });

    // listen out for when the page unloads to send the form abandonment update
    var i;
    var checkSubmit = function () {
        i = window.dataLayer.length - 1;
        while (i > -1) {
            if (window.dataLayer[i].event === 'gtm.formSubmit') {
                return true;
            }
            i--;
        }
    };

    window.addEventListener('beforeunload', function () {
        if (!checkSubmit()) {
            window.dataLayer.push({
                event: 'formAbandonment',
                eventCategory: 'Form Abandonment',
                eventAction: updateHistory.join(' > ')
            });
        }
    });
})();
