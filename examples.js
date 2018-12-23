var tsetmc = require("./server/apis/tsetmc/tsetmc");
var tse = new tsetmc.tsetmc();
//example 1
tse.submit({},"Sector","MY_EVENT");
tse.on("MY_EVENT",function(data,err,err_info){
    if(err || data == null){
        console.log("Fetch Sector List Failed");
    }
    else
    {
        //data received
    }
});
//example 2
tse.submit({'Flow':'7'},"Instrument","INSTRUMENT",7);