// ----- Battery Output -----
if ('getBattery' in navigator) {
  navigator.getBattery().then(function(battery) {
    function updateBatteryStatus() {
      var batteryStatusElement = document.getElementById('batteryStatus');
      var batteryIconElement = document.getElementById('batteryIcon');
      var batteryPercentage = (battery.level * 100).toFixed(2);
      batteryStatusElement.textContent = batteryPercentage + "%";
  
      // Choose the appropriate icon and color based on battery level and charging status
      var iconName = getBatteryIconName(battery.level, battery.charging);
      var iconColor = getBatteryIconColor(battery.level, battery.charging);
      
      console.log('Icon Name:', iconName);
      console.log('Icon Color:', iconColor);
  
      batteryIconElement.setAttribute('name', iconName);
      batteryIconElement.style.color = iconColor; // Set color explicitly
  }

    updateBatteryStatus();

    battery.addEventListener('levelchange', updateBatteryStatus);
    battery.addEventListener('chargingchange', updateBatteryStatus);
  });
} else {
  document.getElementById('batteryStatus').textContent = "Battery Status API not supported";
}

function getBatteryIconName(level, charging) {
  if (charging) {
    return 'battery-charging';
  } else if (level >= 0.51) {
    return 'battery-full';
  } else if (level >= 0.01) {
    return 'battery-half';
  } else {
    return 'battery-dead';
  }
}

function getBatteryIconColor(level, charging) {
  if (charging) {
    return '#00FFFF'; // Cyan for charging
  } else if (level >= 0.51) {
    return '#00FF00'; // Green for high battery level
  } else if (level >= 0.01) {
    return '#FFFF00'; // Yellow for medium battery level
  } else {
    return '#FF0000'; // Red for low battery level
  }
}

// ----- Location Output -----
// ----- Needed GoogleMapsApi's (not free) -----
document.addEventListener("DOMContentLoaded", function() {
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      document.getElementById("locationData").innerHTML = "- Geolocation is not supported by this browser -";
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Use the Google Maps Geocoding API to get the address from coordinates
  var geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`;

  fetch(geocodingApiUrl)
      .then(response => response.json())
      .then(data => {
          if (data.results && data.results.length > 0) {
              var address = data.results[0].formatted_address;
              document.getElementById("locationData").innerHTML = "Location: " + address;
          } else {
              document.getElementById("locationData").innerHTML = "Location information not available.";
          }
      })
      .catch(error => {
          console.error("Error fetching geocoding data:", error);
          document.getElementById("locationData").innerHTML = "Error fetching location information.";
      });
}

function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          document.getElementById("locationData").innerHTML = "- User denied the request for Geolocation -";
          break;
      case error.POSITION_UNAVAILABLE:
          document.getElementById("locationData").innerHTML = "- Location information is unavailable -";
          break;
      case error.TIMEOUT:
          document.getElementById("locationData").innerHTML = "- The request to get user location timed out -";
          break;
      case error.UNKNOWN_ERROR:
          document.getElementById("locationData").innerHTML = "- An unknown error occurred -";
          break;
  }
}