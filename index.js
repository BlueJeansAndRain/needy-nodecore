"use strict";
/* globals __needy */

if (typeof __needy !== 'undefined' && __needy.resolver.addCore)
{
	var utils = require('needy').utils;
	var paths = require('./paths.json');

	for (var core in paths)
	{
		if (!paths.hasOwnProperty(core))
			continue;

		paths[core] = utils.joinPath(__dirname, paths[core]);
		__needy.resolver.addCore(core, paths[core]);
	}

	module.exports = paths;
}
