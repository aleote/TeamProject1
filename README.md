# TeamProject1

Forked




<script>
function initMap(){
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAjnWWbP30ssxxKP-jULse9lWmbR9AIaZ8&callback=initMap"></script>


<div class="holder">

  <div class="inputs">
    <div class="row">
      <div class="input-field col s3">
        <input placeholder="Desired Calories" id="calories" type="text" class="validate">
      </div>
    </div>
    <div class="row">
      <div class="input-field col s3">
        <input placeholder="Desired Carbs" id="carbs" type="text" class="validate">
      </div>
    </div>
    <div class="row">
      <div class="input-field col s3">
        <input placeholder="Desired Protein" id="protein" type="text" class="validate">
      </div>
    </div>
  </div>

  <div class="meal">
    <!-- Meal dynamically shows up in this div -->
  </div>

  <div class="map-holder">
    <h4>McDonalds Near You</h4>
    <div id="map"></div>
  </div>

</div>
