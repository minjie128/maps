"use strict";

// Disable or enable inputs to find a place
$("#location, #latitude, #longitude").change(function() {
  if ($("#location").val() !== "") {
    $("#latitude, #longitude").prop("disabled", true);
  }
  if ($("#latitude").val() !== "" || $("#longitude").val() !== "") {
    $("#location").prop("disabled", true);
  }
});

// Generate the static map
$("#map-form").submit(function() {
  event.preventDefault();
  var location = $("#location").val();
  var latitude = $("#latitude").val();
  var longitude = $("#longitude").val();
  var mapType = $("#map-type").val();
  var zoom = $("#zoom").val();
  var center;
  var url;
  // Validate the specified location
  if (location !== "") {
    center = location;
  } else if (latitude !== "" || longitude !== "") {
    if ((latitude < -90) || (latitude > 90) || (latitude === "")) {
      alert("Please enter a valid latitude.");
      return;
    } else if ((longitude < -180) || (longitude > 180) || (longitude === "")) {
      alert("Please enter a valid longitude.");
      return;
    } else if ((latitude >= -90) && (latitude <= 90) && (longitude >= -180) && (longitude <= 180)) {
      center = latitude + "," + longitude;
    }
  }
  // Validate and default zoom level
  if ((zoom < 0) || (zoom > 21)) {
    alert("Please enter a valid zoom number. ");
    return;
  } else if (zoom === "") {
    zoom = 13;
  }
  url = "https://maps.googleapis.com/maps/api/staticmap?center=" + center + "&zoom=" + zoom + "&size=800x450&maptype=" + mapType + "&markers=" + center + "&key=AIzaSyA3JqL8hT9OyfKrLJqQDcX2gEwstlwi_uU";
  $("#map").attr("src", url);
});
