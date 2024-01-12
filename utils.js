<script>
// by Tok
var global_prm;
var global_prf_country = "en";
var global_btn_position = "";

function retrieveGETqs() {
	var query = window.location.search.substring(1);
	return query;
	if (!query) return false;
}

function getUserLangByUA() {
  return window.navigator.language;
}

function getUserLangByGL() {
  const Http = new XMLHttpRequest();
  var bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  var gl;

  console.log("get");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        bdcApi = bdcApi
          + "?latitude=" + position.coords.latitude
          + "&longitude=" + position.coords.longitude
          + "&localityLanguage=en";
        gl = getbdcApi(bdcApi);
      },
      (err) => { gl = getbdcApi(bdcApi); },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  console.log("done"); console.log(gl);

  function getbdcApi(bdcApi) {
  console.log("func begin");
  var data;
  var bdc = new Promise((resolve, reject) => {
    Http.open("GET", bdcApi);
    Http.send();
    Http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("return"); console.log(JSON.parse(this.responseText));
        data = JSON.parse(this.responseText);
        resolve();
      }
    };
  });
  bdc.then(function(value) {console.log("then"); console.log(data);});
  console.log("func end");
  }
}

(function(){
  var str = retrieveGETqs();
  global_prm = decodeURIComponent(str);

//  global_prf_country = getUserLangByUA();
  global_prf_country = getUserLangByGL();
  console.log(global_prf_country);
  var UX_for_AU = document.getElementsByClassName("UX_for_AU");
  for (var i = 0; i < UX_for_AU.length; i++) {
    switch (global_prf_country) {
      case 'EN_AU':
        UX_for_AU[i].style.visibility = 'visible';
        break;
      default:
        UX_for_AU[i].style.visibility = 'hidden';
    }
  }
})();

$(function(){
    $('a').click(function() {
    var target_url = $(this).attr("href");

    if (global_prm) {
      if (global_btn_position) {
        target_url = target_url + '&lp_type=' + global_btn_position;
      }
      if (target_url.indexOf('?') != -1) {
        $('a').attr('href', target_url + '&' + global_prm);
      } else {
        $('a').attr('href', target_url + '?' + global_prm);
      }
    }
  console.log(global_prm);
  console.log(target_url);
  })
})
</script>

//
//
//
<script>

// test 3
$('.trial-button').click(function(e) {
 global_btn_position = e.currentTarget.dataset['trial'];
 console.log(global_btn_position);
 jQuery('#experiment-text3').text('position of button: ' + global_btn_position);
});

</script>
