###Google Autocomplete Limiter by Maplink is a component which limits the calls in google places autocomplete API, based on a certain amount of caracters.###
 

### Instrucitions for use: ###
**
1 - Load the maplink-google-autocomplete-limiter.min.js in your project:**

HTML header:

```
#!HTML

<script src="http://corp.maplink.com.br/googleplugins/AutocompleteLimiter"></script>
```
or

Javascript:

```
#!javascript
var googleLimiterJavascript = document.createElement('script');
googleLimiterJavascript.src = 'http://corp.maplink.com.br/googleplugins/AutocompleteLimiter';
document.head.appendChild(googleLimiterJavascript);
```
 
**2 - Find where Google Palces Autocomplete is created:**

```
#!javascript

var autocomplete = new google.maps.places.Autocomplete(input);
```

 
**3- Before this line, add a call to the function passing two paramenters:**
   a) In which cahracter google should start to search in places API
   b) An ID whose represents the input on DOM
 
Example:

```
#!javascript
(function setAutoCompleteLimiter(){
 
        if(typeof mplk !== 'undefined' && mplk.google && mplk.google.setAutoCompleteLimiter){
             
            //When search should start
            var startSearchAt = 5;
             
            //The id or class element in DOM
            var googleInput = '#searchAddress';
 
            mplk.google.setAutoCompleteLimiter(startSearchAt, googleInput);
             
        }else{
            console.log('Google Search Limit Character Error: Could not find plugin. Be sure that the it was loaded.');
        }
 
})();
```