var components = (function() {

  // AJAX requests
  function doWeatherAjax(url) {
    return doAjax(url,'get',{},{format:'json'});
  }

  function doFlickrAjax(data) {
    return doAjax(settings.flickrUrl,'get',data,settings.flickrOptions);
  }

  function doDropdownAjax(data) {
    return doAjax(settings.wuCityUrl,'get',data,settings.wuCityOptions);
  }

  // Check if they've stopped typing
  var typingTimer;
  function holdUp(callback) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(callback,400);
  }

  // Filter cities for dropdown
  function filterCities(data) {
    return data.RESULTS.filter(function(x) {
      return x.type === 'city';
    }).map(function(x) {
      return {placeName: x.name, fileName: x.l}
    });
  }

  // Append city divs to dropdown menu
  function appendList(list) {
    // First empty the menu
    $('.menu').empty();
    $(list).each(function(idx) {
      var newDiv = $('<div>')
        .addClass('item')
        .attr('value',list[idx].fileName)
        .text(list[idx].placeName);
      $('.menu').append(newDiv);
    });
  }

  // Add weather to display card
  function addWeather(city,weather) {
    var flip = $('#display').data('flip-model');
    if (flip.isFlipped) {
      $('.front h4').text(city);
      $('.front p').text(weather);
    } else {
      $('.back h4').text(city);
      $('.back p').text(weather);
    }
  }

  // Filter and pick photo
  function getPhoto(photos) {
    return pickRandom (
      filterPhotos(photos,settings.photoSize.min,settings.photoSize.max)
    );
  }

  // Add image to display card
  function addImage(url) {
    var flip = $('#display').data('flip-model');
    if (flip.isFlipped) {
      $('.front img').attr('src',url);
      return $('.front img');
    } else {
      $('.back img').attr('src',url);
      return $('.back img');
    }
  }

  // PRIVATE

  // For AJAX functions - returns promise
  function doAjax(url,type,data,requestOptions = {}) {
    return $.ajax(
      $.extend({
        url:    url,
        data:   data,
        type: type
      }, requestOptions)
    );
  }

  // Filter photos based on dimensions
  function filterPhotos(photos,min,max) {
    return photos.filter(function(x) {
      var ratio = x.height_z / x.width_z;
      return ratio > min && ratio < max;
    });
  }

  // Pick random image from array
  function pickRandom(photos) {
    var i = Math.floor(Math.random() * photos.length);
    return photos[i].url_z;
  }

  // API
  var api = {
    filterCities: filterCities,
    appendList: appendList,
    holdUp: holdUp,
    doWeatherAjax: doWeatherAjax,
    doFlickrAjax: doFlickrAjax,
    doDropdownAjax: doDropdownAjax,
    addWeather: addWeather,
    getPhoto: getPhoto,
    addImage: addImage
  }

  return api;
})();
