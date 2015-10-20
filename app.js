var path = require('path');
var EventProxy = require('eventproxy');
var fs = require('fs');

var ep = new EventProxy();
var dirPath = '/home/zhlin/.vim/bundle/vim-snippets/snippets/javascript/javascript';
var fileNames = [];

fs.readdir(dirPath, function (err, files) {
	if (err) {
		emit('error', err);
	} else {
		files.forEach(function (file) {
			fileNames.push([path.resolve(dirPath, file),
										  path.basename(file, '.snippet')]);
		});
	}
	ep.emit('read_dir', fileNames);
});

ep.once('read_dir', function (fileNames) {
	var snippets = [];
	fileNames.forEach(function (file) {
		fs.readFile(file[0], 'utf8', function (err, data) {
			if (err) {
				ep.emit(err);
			} else {
				var snippetHead = 'snippet ' + file[1];
				var snippetBody = data.replace(/^/gm, '\t');
				ep.emit('read_file', [snippetHead, snippetBody]);
			}
		});
	});

	ep.after('read_file', fileNames.length, function (snippets) {
		snippets.forEach(function (snippet) {
			var content = [snippet[0], snippet[1], ''].join('\n');
			fs.appendFile('output.snippets', content, function (err) {
				if (err) {
					ep.emit('error', err);
				}
			});
		});
	});
});

ep.fail(function (err) {
	throw err;
});
	
