function initMap() {
  let image = "bus-icon.png";

  let contentString =
    "<h6><span style='color: black;'>Bus #</h6></span><b><span style='color: black;'>????</b></span>";

  let infoWindow = new google.maps.InfoWindow({
    content: contentString,
  });

  let map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: parseFloat(busLocations[0].LATITUDE),
      lng: parseFloat(busLocations[0].LONGITUDE),
    },
    zoom: 15,
    scrollwheel: false,
  });

  const transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);

  for (i = 0; i < busLocations.length; i++) {
    let marker = new google.maps.Marker({
      position: {
        lat: parseFloat(busLocations[i].LATITUDE),
        lng: parseFloat(busLocations[i].LONGITUDE),
      },
      map: map,

      animation: google.maps.Animation.DROP,

      icon: image,
    });

    marker.addListener("click", toggleBounce);

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }
}
