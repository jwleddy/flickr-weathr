var flickrWeather = (function(city,obj) {

  // API keys passed from server and embedded in DOM
  // Super insecure and a weird way of doing things, but the point of the assignment is to practice AJAX requests
  var key = {
    wu: $('input').data('wu-key'),
    flickr: $('input').data('flickr-key')
  }
  settings.photoData.api_key = settings.placeData.api_key = key.flickr;

  // Construct URL
  var wuWeatherUrl = settings.wuWeatherStem + key.wu + '/conditions' + obj.attr('value') + '.json';
  // Get from WU
  components.doWeatherAjax(wuWeatherUrl)
    .then(function weatherSuccess(data) {
      components.addWeather(city, data.current_observation.weather);
  }, errors.weather);
  // Weather handled. Now get photo.
  // Set city
  settings.placeData.query = city;
  // Get place_id from Flickr
  components.doFlickrAjax(settings.placeData)
    .then(function placeSuccess(data) {
      // Places returned. Just use the first ID.
      settings.photoData.place_id = data.places.place[0].place_id;
      // Request images for that place
      components.doFlickrAjax(settings.photoData)
        .then(function imageSuccess(data) {
          // Image data returned

          // Find a nice photo
          var photoUrl;
          try {
            photoUrl = components.getPhoto(data.photos.photo);
          }
          // What if there are no photos?
          catch (err) {
            photoUrl = settings.defaultImage;
          }
          // Add image to display
          var image = components.addImage(photoUrl);
          // Flip it
            $('#display').flip('toggle');

      }, errors.image);
    }, errors.place);
});
