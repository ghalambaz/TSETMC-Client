var config = require("./config");
var soap = require("soap");
var merge = require('merge');
var events = require('events');

var default_data = {'UserName': config.username, 'Password': config.password};
var options = {
    disableCache: true
};


class tsetmc extends events.EventEmitter {
    submit(args, func_name,event_name,flow_num) {
        var event = null;
        if(typeof event_name === "undefined" || event_name === null)
            event = "TSETMC";
        else event = event_name;
        var self = this;
        soap.createClient(config.uri,options, function (err, client) {
            if (err) {
                console.log(err);
                self.emit(event, null, true, err, flow_num);
            }
            else {
                if (typeof args !== "undefined")
                    var data = merge(default_data, args);
                if (typeof(client[func_name]) == 'function') {
                    client[func_name](data, function (err, result) {
                        if (err) {
                            if(typeof flow_num !== "undefined" || flow_num !== null)
                                self.emit(event,null,true,err,flow_num);
                            else self.emit(event,null,true,err,flow_num);
                        } else {
                            if (result == null) {
                                if(typeof flow_num === "undefined" || flow_num === null)
                                self.emit(event,null,false,"Empty",flow_num);
                                else    self.emit(event,null,false,"Empty",flow_num);
                            }
                            else {
                                if(typeof flow_num === "undefined" || flow_num === null)
                                self.emit(event,result,false,null,flow_num);
                                else
                                    self.emit(event, result,false,null,flow_num);

                            }
                        }
                    });
                }
                else
                    self.emit(event,null,true,"Function Not Defined");
            }
        });
    }

}

exports.tsetmc = tsetmc;

