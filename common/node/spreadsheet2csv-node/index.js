var path = require('path');
var exec = require('child_process').exec;
var logger = require('../logger')();

var pathToConvertor = path.join(__dirname,'../../../apps/spreadsheet2csv/spreadsheet2csv.php');

exports = module.exports = {
	convert: function(inputPath, outputPath, callback) {
		exec("php " + pathToConvertor + ' -f '+inputPath+' -o '+outputPath, function (error, stdout, stderr) {
			if (!(error == null && stdout == '' && stderr == '')) {
				logger.error('conversion error! From '+inputPath+' to '+outputPath+', err:'+error+', '+stdout);
			}
			callback();
		});
	}
}