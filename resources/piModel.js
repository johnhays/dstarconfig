var fs = require('fs');
var cpuinfo = fs.readFileSync("/proc/cpuinfo");
var lines = cpuinfo.toString('ascii').split(/[\r\n]+/g);
var revision;
var modelname;
var hardware;
var serial;
var bogomips;
var features;
for (var line in lines) {
        var x = lines[line].split(':');
        if (x[0].trim() === "Revision") {
                revision = x[1].trim();
        }
        if (x[0].trim() === "model name") {
                modelname = x[1].trim();
        }
        if (x[0].trim() === "BogoMIPS") {
                bogomips = x[1].trim();
        }
        if (x[0].trim() === "Serial") {
                serial = x[1].trim();
        }
        if (x[0].trim() === "Features") {
                features = x[1].trim();
        }
        if (x[0].trim() === "Hardware") {
                hardware = x[1].trim();
        }
}
var identifypi = {};

identifypi["Beta"] = { date  : "Q1 2012" , model : "B (Beta)" , pcb : " ?" , memory : "256 MB" , notes : "Beta Board" }; 
identifypi["0002"] = { date  : "Q1 2012" , model : "B" , pcb : "1.0" , memory : "256 MB" , notes : "" }; 
identifypi["0003"] = { date  : "Q3 2012" , model : "B (ECN0001)" , pcb : "1.0" , memory : "256 MB" , notes : "Fuses mod and D14 removed" }; 
identifypi["0004"] = { date  : "Q3 2012" , model : "B" , pcb : "2.0" , memory : "256 MB" , notes : "(Mfg by Sony)" }; 
identifypi["0005"] = { date  : "Q4 2012" , model : "B" , pcb : "2.0" , memory : "256 MB" , notes : "(Mfg by Qisda)" }; 
identifypi["0006"] = { date  : "Q4 2012" , model : "B" , pcb : "2.0" , memory : "256 MB" , notes : "(Mfg by Egoman)" }; 
identifypi["0007"] = { date  : "Q1 2013" , model : "A" , pcb : "2.0" , memory : "256 MB" , notes : "(Mfg by Egoman)" }; 
identifypi["0008"] = { date  : "Q1 2013" , model : "A" , pcb : "2.0" , memory : "256 MB" , notes : "(Mfg by Sony)" }; 
identifypi["0009"] = { date  : "Q1 2013" , model : "A" , pcb : "2.0" , memory : "256 MB" , notes : "(Mfg by Qisda)" }; 
identifypi["000d"] = { date  : "Q4 2012" , model : "B" , pcb : "2.0" , memory : "512 MB" , notes : "(Mfg by Egoman)" }; 
identifypi["000e"] = { date  : "Q4 2012" , model : "B" , pcb : "2.0" , memory : "512 MB" , notes : "(Mfg by Sony)" }; 
identifypi["000f"] = { date  : "Q4 2012" , model : "B" , pcb : "2.0" , memory : "512 MB" , notes : "(Mfg by Qisda)" }; 
identifypi["0010"] = { date  : "Q3 2014" , model : "B+" , pcb : "1.0" , memory : "512 MB" , notes : "(Mfg by Sony)" }; 
identifypi["0011"] = { date  : "Q2 2014" , model : "Compute Module 1" , pcb : "1.0" , memory : "512 MB" , notes : "(Mfg by Sony)" }; 
identifypi["0012"] = { date  : "Q4 2014" , model : "A+" , pcb : "1.1" , memory : "256 MB" , notes : "(Mfg by Sony)" }; 
identifypi["0013"] = { date  : "Q1 2015" , model : "B+" , pcb : "1.2" , memory : "512 MB" , notes : " ?" }; 
identifypi["0014"] = { date  : "Q2 2014" , model : "Compute Module 1" , pcb : "1.0" , memory : "512 MB" , notes : "(Mfg by Embest)" }; 
identifypi["0015"] = { date  : " ?" , model : "A+" , pcb : "1.1" , memory : "256 MB / 512 MB" , notes : "(Mfg by Embest)" }; 
identifypi["a01040"] = { date  : "Unknown" , model : "2 Model B" , pcb : "1.0" , memory : "1 GB" , notes : "(Mfg by Sony)" }; 
identifypi["a01041"] = { date  : "Q1 2015" , model : "2 Model B" , pcb : "1.1" , memory : "1 GB" , notes : "(Mfg by Sony)" }; 
identifypi["a21041"] = { date  : "Q1 2015" , model : "2 Model B" , pcb : "1.1" , memory : "1 GB" , notes : "(Mfg by Embest)" }; 
identifypi["a22042"] = { date  : "Q3 2016" , model : "2 Model B (with BCM2837)" , pcb : "1.2" , memory : "1 GB" , notes : "(Mfg by Embest)" }; 
identifypi["900021"] = { date  : "Q3 2016" , model : "A+" , pcb : "1.1" , memory : "512 MB" , notes : "(Mfg by Sony)" }; 
identifypi["900032"] = { date  : "Q2 2016?" , model : "B+" , pcb : "1.2" , memory : "512 MB" , notes : "(Mfg by Sony)" }; 
identifypi["900092"] = { date  : "Q4 2015" , model : "Zero" , pcb : "1.2" , memory : "512 MB" , notes : "(Mfg by Sony)" }; 
identifypi["900093"] = { date  : "Q2 2016" , model : "Zero" , pcb : "1.3" , memory : "512 MB" , notes : "(Mfg by Sony)" }; 
identifypi["920093"] = { date  : "Q4 2016?" , model : "Zero" , pcb : "1.3" , memory : "512 MB" , notes : "(Mfg by Embest)" }; 
identifypi["9000c1"] = { date  : "Q1 2017" , model : "Zero W" , pcb : "1.1" , memory : "512 MB" , notes : "(Mfg by Sony)" }; 
identifypi["a02082"] = { date  : "Q1 2016" , model : "3 Model B" , pcb : "1.2" , memory : "1 GB" , notes : "(Mfg by Sony)" }; 
identifypi["a020a0"] = { date  : "Q1 2017" , model : "Compute Module 3 (and CM3 Lite)" , pcb : "1.0" , memory : "1 GB" , notes : "(Mfg by Sony)" }; 
identifypi["a22082"] = { date  : "Q1 2016" , model : "3 Model B" , pcb : "1.2" , memory : "1 GB" , notes : "(Mfg by Embest)" }; 
identifypi["a32082"] = { date  : "Q4 2016" , model : "3 Model B" , pcb : "1.2" , memory : "1 GB" , notes : "(Mfg by Sony Japan)"};

var piModel = function() {
	var piInfo = identifypi[revision];
	piInfo.revision = revision;
	piInfo.serial = serial;
	piInfo.hardware = hardware;
	piInfo.features = features;
	piInfo.modelname = modelname;
	piInfo.bogomips = bogomips;
	return piInfo;
};
module.exports = piModel;
