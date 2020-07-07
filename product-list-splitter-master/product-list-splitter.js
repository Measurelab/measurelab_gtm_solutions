<script>
function prodlistimp(){
    var dl = //INSERT DATA LAYER PRODUCT LIST IMPRESSION VALUES VARIABLE;
    var jss = JSON.stringify(dl);
    var prodarr = JSON.parse(jss);
    var ecc = //INSERT CURRENCY VALUE VARIABLE;
    var len = 35; //or select another appropriate number of items to push

if(prodarr.length > len){
var i;
iter = Math.round(prodarr.length/len);
  for(i=1;i<iter;i++){
    var start = (i*len) - len
    var end = (i*len)
    var prodarrsli = prodarr.slice(start,end)
    dataLayer.push({
  'event':'product_list_impression',
  'ecommerce': {
    'currencyCode': ecc,
    'impressions' : prodarrsli
}
}
);  
  }
  //dataLayer.push({'ecommerce':undefined});
   dataLayer.push({'event':'product_list_impression',
  'ecommerce': {
    'currencyCode': ecc,
    'impressions' : prodarr.slice((i*len) - len,prodarr.length+1)
  }
  }
  );
} else{
dataLayer.push({
  'event':'product_list_impression',
  'ecommerce': {
    'currencyCode': ecc,
    'impressions' : prodarr
}});
}
}
  prodlistimp();
</script>