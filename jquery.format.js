/**
 *	jQuery string format plugin
 *
 *	Adds Python-like format function to jQuery
 *	This is basic implementation and it doesn't cover all Python format features
 *	@param {string} string
 *	@param {mixed} variables
 *	@return {string} formated string
 */

/*
 	Usage examples:

 	$.fn.format('The quick {} {} jumped over the {} {}', "brown", "fox", "lazy", "dog");
	$.fn.format('The quick {0} {2} jumped over the {1} {3}', "brown", "lazy", "fox", "dog");
	$.fn.format('The quick {_brown_} {_fox_} jumped over the {_lazy_} {_dog_}', {
		_brown_: "brown",
		_fox_: "Fox",
		_lazy_: "lazy",
		_dog_: "Dog"
	});
	$.fn.format('The quick {0} {1} jumped over the {2} {3}', {
		0: "brown",
		1: "fox",
		2: "lazy",
		3: "dog"
	});
*/

(function($) {

	$.fn.format = function() {

		var isArguments = function(obj) {

			return obj.constructor != String && obj.constructor != Array && obj.length;
		};

		var args = isArguments(arguments[0]) ? arguments[0] : arguments,
			alen	 = args.length;

		// no arguments given
		if (!alen) return null;

		// if only one argument given assume it's string and simply return it
		else if (alen == 1) return args[0];

		// second argument is either variable or object with named vars
		else {

			var str = args[0],
				matches = str.match(/{[^}]*}/g),
				mlen = matches ? matches.length : 0,
				i = 0,
				name, val;

			// for object with named variables
			if (typeof(args[1]) == 'object') {

				while (i < mlen) {

					name = matches[i].replace(/{/, '').replace(/}/, '');
					val = args[1][name];
					var rs = '';

					if (isNaN(parseInt(name)))
						rs = "{" + name + "}";
					else
						rs = "{[" + i + "]}";

					var r = new RegExp(rs, "g");
					str = str.replace(r, args[1][name]);

					i++;
				}

				return str;

			} else { // for variables as arguments

				if (!matches || matches.length !== alen - 1)
					throw "Format: wrong number of arguments, " + str;

				while (i < alen - 1) {

					// replace {} {} {} ... {}
					if (matches[i].length == 2)
						str = str.replace('{}', args[i + 1]);

					// replace {0} {1} {2} ... {n}
					else {

						var r = new RegExp("{[" + i + "]}", "g");
						str = str.replace(r, args[i + 1]);
					}

					i++;
				}

				return str;
			}
		}
	}

})(jQuery);
