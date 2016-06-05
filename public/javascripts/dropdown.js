var doDropdown = (function() {
  // Dropdown fetches matching cities
  $('.ui.dropdown input').keyup(function(e) {
    var dropdownQuery = {'query': $(this).val()};
    // Wait until user has stopped typing for about half a second
    components.holdUp(function goAhead() {
      // Now do it!
      components.doDropdownAjax(dropdownQuery)
        .then(function dropdownSuccess(data) {
          // Filter returned data for cities
          var lookupList = components.filterCities(data);
          // Create and append divs
          components.appendList(lookupList);
        }, errors.dropdown);
      });
  });

  // When dropdown active value changes, send query to Weather Underground (wu)
  $('.ui.dropdown').dropdown({
    onChange: function (val,city,obj) {
      flickrWeather(city,obj);
    }
  })
});
