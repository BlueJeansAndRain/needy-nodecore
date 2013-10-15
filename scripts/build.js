"use strict";

var fs = require('fs');
var path = require('path');

var paths = {};
var root = path.resolve(__dirname, '..');

// Load core modules from core directory.
fs.readdirSync(path.resolve(__dirname, '../core')).forEach(function(file)
{
	if (!(/\.js$/).test(file))
		return;

	paths[path.basename(file, '.js')] = path.relative(root, path.resolve(root, 'core', file));
});

// Add core modules which are provided by modules.
fs.readdirSync(path.resolve(__dirname, '../node_modules')).forEach(function(file)
{
	var name = path.basename(file, '.js');

	if (name === 'punycode')
		file = path.resolve(root, 'node_modules', 'punycode', 'punycode.js');
	else if (name === 'os-browserify')
		file = path.resolve(require.resolve('os-browserify'), '..', 'browser.js');
	else
		file = require.resolve(name);

	paths[name.replace(/\-browserify$/, '')] = path.relative(root, file);
});

fs.writeFileSync(path.resolve(root, 'paths.json'), JSON.stringify(paths, null, "    "));
