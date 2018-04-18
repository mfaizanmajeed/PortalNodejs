var request = require('request');
var http = require("https");  
     
    function gettoken(res,req)
    {
      var options = { method: 'POST',
      url: 'https://x45k5kd3hj.execute-api.us-east-2.amazonaws.com/dev/login',
      qs: { regId: 'ham245' },
      headers: 
       { 'postman-token': 'b3c718af-c24c-b314-12db-8e4bfadf81e3',
         'cache-control': 'no-cache',
         authorization: 'Basic ' + Buffer.from('hak@inbox:123').toString('base64') } };

        
         var hn= request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        //console.log(body);
        //k=JSON.parse(body);
        //console.log(k);
        //globals=k.access_token;
        //console.log(globals);inbox
        req.send(body);

        //return globals.info
        //callback();
        
      });
      
      
    }
    

    module.exports = {
        gettoken
    };