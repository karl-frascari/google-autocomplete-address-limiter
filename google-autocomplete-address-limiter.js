var googlePlugins = googlePlugins || {};

googlePlugins.limiter = googlePlugins.limiter || {};

googlePlugins.limiter.setAutoCompleteLimiter = function(waitUntil, element) {

	//Hack for fix Google input behavior 
	waitUntil -= 1;

	var googleSearchInput = document.querySelectorAll(element)[0];

	if(typeof waitUntil === 'undefined' || isNaN(waitUntil)){
		console.log("Google Search Limit Character Error: Could not find parameter startSearchAt");
		return;
	}

	if (typeof googleSearchInput === 'undefined') {
		console.log("Google Search Limit Character Error: Element " + element + " was not found, please check the input id or if it's already rendered by DOM");
		return;
	}

	var originalEventListener = googleSearchInput.addEventListener,
		keyUpFunction,
		keyDownFunction,
		focusFunction,
		blurFunction,
		inputSize = 0;

	googleSearchInput.addEventListener = function(action, handler, options) {

		(function setHandlers(){

			if (action === 'keyup') {

				if(typeof keyUpFunction === 'undefined'){
					keyUpFunction = handler;
				}

			}else if(action === 'keydown'){

				if(typeof keyDownFunction === 'undefined'){
					keyDownFunction = handler;
				}

			}else if(action === 'focus'){

				if(typeof focusFunction === 'undefined'){
					focusFunction = handler;
				}

			}else if(action === 'blur'){

				if(typeof blurFunction === 'undefined'){
					blurFunction = handler;
				}
			}

		})();

		if (action === 'keyup') {

			originalEventListener.call(this, action, function(params) {

				inputSize = googleSearchInput.value.length;

				var container = document.getElementsByClassName('pac-container')[0];

				if (typeof container === 'undefined' || typeof params === 'undefined') {
					console.log('Google Search Limit Character Error: Was not possible to find Google Places element, please contact support');
				}

				if (inputSize <= waitUntil) {

					container.style.display = 'none';
					keyUpFunction(params);

				} else {

					keyDownFunction(params);
					keyUpFunction(params);
				}

			}, options);

		}else if(action === 'keydown'){
			
			return;

		}else if(action === 'focus'){

			originalEventListener.call(this, action, function(params) {

				inputSize = googleSearchInput.value.length;

				if (inputSize > waitUntil) {
					focusFunction(params);
				}

			}, options);

		}else if (action === 'blur'){

			originalEventListener.call(this, action, function(params) {

				inputSize = googleSearchInput.value.length;

				if (inputSize > waitUntil) {
					blurFunction(params);
				}

			}, options);

		}else {

			originalEventListener.call(this, action, function(params) {		

				handler(params);

			}, options);        
		}
	}
};

// var startSearchAt = 5;
 
// var googleInput = '#input-google-search';
 
// googlePlugins.limiter.setAutoCompleteLimiter(startSearchAt, googleInput);