var errors = (function() {

  // Handle various errors
  
  function dropdown(error) {
    handleError(settings.failMessages.dropdown);
  }

  function image(error) {
    handleError(settings.failMessages.image);
  }

  function place(error) {
    handleError(settings.failMessages.place);
  }

  function weather(error) {
    handleError(settings.failMessages.weather);
  }

  // PRIVATE

  // Show default image and error message
  function handleError(message) {
    components.addImage(settings.defaultImage);
    components.addWeather(message,null);
    $('#image-display').flip('toggle');
  }

  // API
  var api = {
    dropdown: dropdown,
    image: image,
    place: place,
    weather: weather
  }

  return api;
})();
