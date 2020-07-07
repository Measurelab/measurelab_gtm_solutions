function(){
    var pa = ; // Page path variable here
    var qp = ; // Either a variable containing pipe-delimited names of query string parameters to redact or just a string of pipe-delimited names of query string parameters to redact.
    var qs = ; // Variable to return the whole query string here
    var qsarr = qs.split('&');
    var qprs = qp.split('|');
if(qs.length >0){
        for(i=0;i < qsarr.length; i++){
            for(j=0; j < qprs.length; j++){
                if(qsarr[i].indexOf(qprs[j]) > -1){
                    qsarr[i] = qprs[j] + "redacted";
                }
            }
        }

    return pa + '?' + qsarr.join('&');
}
}
