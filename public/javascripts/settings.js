var settings = (function() {

  // API
  var api = {
    wuCityUrl: 'http://autocomplete.wunderground.com/aq?&cb=call=?',
    wuWeatherStem: 'http://api.wunderground.com/api/',
    flickrUrl: 'https://api.flickr.com/services/rest/',
    defaultImage: '/images/default.png',
    flickrOptions: {
                    dataType: 'jsonp',
                    jsonpCallback: 'jsonFlickrApi'
                   },
    wuCityOptions: {
                    dataType: 'jsonp',
                    crossDomain: true
                   },
    photoSize:     {
                    min: 0.55,
                    max: 0.65
                   },
    placeData:     {
                    method:   'flickr.places.find',
                    query:    null,
                    api_key:  null,
                    format: 'json'
                   },
    photoData:     {
                    method:   'flickr.photos.search',
                    sort:     'relevance',
                    extras:   'url_z',
                    media:    'photos',
                    place_id: null,
                    api_key:  null,
                    format: 'json'
                   },
    failMessages:  {
                    dropdown: "Hmm... Can't seem to find any cities right now.",
                    weather: "Weird. Couldn't find the weather for that city.",
                    image: "Hmm... Can't seem to get any images right now.",
                    place: "Hmm... Cant't find that city right now."
                   }
  }

  return api;
})();
