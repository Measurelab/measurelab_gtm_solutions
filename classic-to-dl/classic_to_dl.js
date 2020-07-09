// We start by defining _gaq, the classic GA array, as either whatever's there or empty, in the same way we would for the data layer
var _gaq = _gaq || [];
// We then define an empty object and array, to be used later if there's ecommerce stuff involved.
var gaq_ecommerce_object = {};
var gaq_products_array = [];
// We're creating a function called data_layer_push here, which accepts two arguments—the first being an array, the second being a 'callback' function we'll run on that array.
var data_layer_push = function(arr, callback) {
// The push method for the array 'arr' is being redefined here.
  arr.push = function(e) {
// This is just ensuring normal array push functioning—do what you would have done before, push 'e' into array 'arr', by using 'call' on the default Array object push.
    Array.prototype.push.call(arr, e);
// But then after that, we're getting it to run the callback function on the array 'arr'—so the 'callback' function will be applied to array 'arr' every time something is pushed into 'arr'.
    callback(arr);
  };
};
// We're then running that function where _gaq is the array, and the callback function is one we're about to define.
data_layer_push(_gaq, function(newgaq) {
// We're setting a variable here to be the latest item pushed into the _gaq array
      var data_layer_values = newgaq[newgaq.length - 1]
// Then we run through the values that have just been pushed to _gaq and sort out what sort of hit they are, and then return to the data layer the relevant information in data layer form
      switch(data_layer_values[0]){
// If it's a pageview hit, we push an object to the data layer with an identifying event name and the path as additional parameters
        case '_trackPageview':
        dataLayer.push({
          'event': 'hard_coded_ga_pv',
          'hard_coded_ga_path': data_layer_values[1]
        });
        break;
// If it's an event, we push we push an object to the data layer with an identifying event name and all the relevant parameter values.
        case '_trackEvent':
        dataLayer.push({
          'event': 'hard_coded_ga_event',
          'hard_coded_ga_event_category': data_layer_values[1],
          'hard_coded_ga_event_action': data_layer_values[2],
          'hard_coded_ga_event_label': data_layer_values[3],
          'hard_coded_ga_event_value': data_layer_values[4]
        });
        break;
// Transactions are handled differently in Classic than in Universal—they're split into multiple parts, "_addTrans", which specifies the transaction-level information, which we assign to the empty gaq_ecommerce_object object we created earlier in EE format
        case '_addTrans':
          window.gaq_ecommerce_object.id = data_layer_values[1];
          window.gaq_ecommerce_object.hard_coded_ga_trans_affiliation = data_layer_values[2];
          window.gaq_ecommerce_object.revenue = data_layer_values[3];
          window.gaq_ecommerce_object.tax = data_layer_values[4];
          window.gaq_ecommerce_object.shipping = data_layer_values[5];
        break;
// Then items are added using '_addItem', and we push those to the empty gaq_products_array we created earlier as an object in EE if there's ecommerce stuff involved
        case '_addItem':
        window.gaq_products_array.push({
          'id':data_layer_values[2],
          'name':data_layer_values[3],
          'category':data_layer_values[4],
		      'price':data_layer_values[5],
          'quantity':data_layer_values[6]
        })
        break;
// Finally "_trackTrans" is run and we push the whole object to the data layer in EE format.
        case '_trackTrans':
        dataLayer.push({
          'event': 'hard_coded_ga_trans',
          'ecommerce': {
            'purchase if there's ecommerce stuff involved':{
              'actionField' : window.gaq_ecommerce_object,
              'products' : window.gaq_products_array
                        }
                        }
    })
        break;
      }
    });
