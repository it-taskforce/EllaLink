<style>
body{
  overflow: hidden !important;
}


* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}



</style>
<div id="map-wrapper">
<!-- Collapse button -->
<button class="toggle-menu" onclick="toggleMapOptions()"><i class="fa fa-bars"></i></button>

<div id='map'></div>
<div id='moreInfo'>For point A (Madeiradrid) to point B (Paris) :The calculated latency of the ella.link networkis, on everage : 27 ms.</div>
<div class="accordion" id="options-wrapper">
  <div class="card">
    <div class="card-header m-0 p-0 px-4 border-0 bg-white" id="headingOne">
      <h2 class="m-0 p-0">
        <button class="btn btn-dark btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Networks
        </button>
      </h2>
    </div>



    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#options-wrapper">

      <div id="network-menu" class="menu">

      </div>

    </div>



  </div>
  <!-- <div class="card"> -->
    <!-- <div class="card-header m-0 p-0 px-4 border-0 bg-white" id="headingTwo">
      <h2 class="m-0 p-0">
        <button class="btn btn btn-dark btn-block text-left " type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Services
        </button>
      </h2>
    </div> -->
    <!-- <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" >
      <div id="services-menu" class="menu">
      </div>
    </div> -->
  <!-- </div> -->
  <div class="card">
    <div class="card-header m-0 p-0 px-4 border-0 bg-white" id="headingThree">
      <h2 class="m-0 p-0">
        <button class="btn btn btn-dark btn-block text-left " type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          POPs
        </button>
      </h2>
    </div>
    <div id="collapseThree" class="collapse show" aria-labelledby="headingThree" >
      <div id="pops-menu" class="menu">
      </div>
    </div>
  </div>
  <div class="card">
  <div class="card-header m-0 p-0 px-4 border-0 bg-white" id="headingFour">
      <h2 class="m-0 p-0">
        <button class="btn btn btn-dark btn-block text-left " type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Sites
        </button>
      </h2>
    </div>
    <div id="collapseFour" class="collapse show" aria-labelledby="headingFour" >
      <div id="sites-menu">
      </div>
    </div>
  </div></div>