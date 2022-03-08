let marker;

async function initMap() {

  let url = document.URL;
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: {lat:0,lng:0},
    mapTypeId: "roadmap",
  });
  setData(map,url,marker);
  setInterval(function(){setData(map,url,marker)},10000)
}

function setData(map,url){
  fetch(`${url}getAllCoordinates`).then(response => response.json()).then(data => {
    let coordinates = data.data.coordinates;
    let lastRow = data.data.lastRow;
    map.setCenter(coordinates[coordinates.length-1])
    const flightPath = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    flightPath.setMap(map);
    if(marker){
      marker.setMap(null)
    }
    marker =new google.maps.Marker({
      position: coordinates[coordinates.length - 1],
      map: map
    });

    document.getElementById('attr').innerHTML = `
  <h1>Time - ${lastRow.time}</h1>
  <h1>Speed - ${lastRow.speed}</h1>
  <h1>Altitude -${lastRow.altitude}</h1>`
  })
  
}