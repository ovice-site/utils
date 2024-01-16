// by Tok@ovice, 2024
var global_prm;
var global_prm_val;
var global_prf_country = "en";
var global_btn_position = "";
const className_UX_for_AU = "ux_for_au";
const className_UX_for_EN = "ux_for_en";
const className_trial_button = "trial_button";

function retrieveGETqs() {
	var query = window.location.search.substring(1);
	if (!query) return false;
	return query;
}

function getUserLangByUA() {
  return window.navigator.language;
}

function getUserLangByGLwithUX() {
  const Http = new XMLHttpRequest();
  var bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        bdcApi = bdcApi
          + "?latitude=" + position.coords.latitude
          + "&longitude=" + position.coords.longitude
          + "&localityLanguage=en";
        getbdcApi(bdcApi);
      },
      (err) => { getbdcApi(bdcApi); },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

  function getbdcApi(bdcApi) {
  var data;
  var bdc = new Promise((resolve, reject) => {
    Http.open("GET", bdcApi);
    Http.send();
    Http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
        resolve();
      }
    };
  });
  bdc.then(function(value) {
    global_prf_country = data.countryCode;
    console.log("country code = "); console.log(global_prf_country);
    UXcustomizeViaCountry();
  });
  }
}

function UXinitialize(){
  var UX_for_AU = document.getElementsByClassName(className_UX_for_AU);
  for (var i = 0; i < UX_for_AU.length; i++) {
    UX_for_AU[i].style.display = 'none';
  }
  var UX_for_EN = document.getElementsByClassName(className_UX_for_EN);
  for (var i = 0; i < UX_for_EN.length; i++) {
    UX_for_EN[i].style.display = 'none';
  }
}

function UXcustomizeViaCountry(){
  var UX_for_AU = document.getElementsByClassName(className_UX_for_AU);
  for (var i = 0; i < UX_for_AU.length; i++) {
    switch (global_prf_country) {
      case 'EN_AU':
      case 'en-AU':
      case 'AU':
      case 'SG':
      case 'MY':
        UX_for_AU[i].style.display = 'block';
        break;
      default:
        UX_for_AU[i].style.display = 'none';
    }
  }
  var UX_for_EN = document.getElementsByClassName(className_UX_for_EN);
  for (var i = 0; i < UX_for_EN.length; i++) {
    switch (global_prf_country) {
      case 'EN':
      case 'en':
      case 'US':
        UX_for_EN[i].style.display = 'block';
        break;
      default:
        UX_for_EN[i].style.display = 'none';
    }
  }
}

(function(){
  var str = retrieveGETqs();
  global_prm = decodeURIComponent(str);
  global_prm_val = new URLSearchParams(global_prm);

  UXinitialize();
  if (global_prm_val.has("country")) {
    global_prf_country = getUserLangByUA();
    UXcustomizeViaCountry();
  } else {
    getUserLangByGLwithUX();
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
  })
})

$('.' + className_trial_button).click(function(e) {
  global_btn_position = e.currentTarget.dataset['trial'];
  console.log(global_btn_position);
});
