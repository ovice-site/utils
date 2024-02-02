// ovice utils build 012 by Tok@ovice, 2024 
var global_prm;
var global_prm_val;
var global_prf_country = 'en';
var global_btn_position = '';
var global_flg_ctype = {none:0,QP:1,LS:2,GL:3,XX:9};
var global_flg_c = global_flg_ctype.none;
const className_UX_for_AU = 'ux_for_au';
const className_UX_for_EN = 'ux_for_en';
const className_trial_button = 'ux_trial';
const className_freeplan_button = 'ux_freeplan';

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
  var bdcApi = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      bdcApi = bdcApi
        + '?latitude=' + position.coords.latitude
        + '&longitude=' + position.coords.longitude
        + '&localityLanguage=en';
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
    Http.open('GET', bdcApi);
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
        UX_for_AU[i].style.display = 'inline';
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
        UX_for_EN[i].style.display = 'inline';
        break;
      default:
        UX_for_EN[i].style.display = 'none';
    }
  }
}

(function(){
  var str = retrieveGETqs();
  global_prm = str ? decodeURIComponent(str) : '';
  global_prm_val = new URLSearchParams(global_prm);

  if (global_prm_val.has('countrycode')) {
    var c = global_prm_val.get('countrycode');
    const r = new Intl.DisplayNames(['en-us'], {type:'region'});
    var v;
    try { v = r.of(c); }
    catch {
      v = '';
      global_prm_val.delete('countrycode');
      global_prm = global_prm_val.toString();
    }
    finally {
      if (v !== '' && v !== 'Unknown Region') {
        global_prf_country = c;
        global_flg_c = global_flg_ctype.QP;
      } else {
        global_prm_val.delete('countrycode');
        global_prm = global_prm_val.toString();
      }
    }
  }
  if (global_flg_c !== global_flg_ctype.QP) {
    if(typeof localStorage !== 'undefined') {
      var s = localStorage;
      if (s.getItem('ovicecom_countrycode')) {
        global_prf_country = s.getItem('ovicecom_countrycode');
        global_flg_c = global_flg_ctype.LS;
      } else {
        global_flg_c = global_flg_ctype.GL;
      }
    } else {
      global_prf_country = getUserLangByUA();
      global_flg_c = global_flg_ctype.XX;
    }
  }
  if(!window.location.pathname.startsWith('/ja') && !window.location.pathname.startsWith('/ko')) {
    UXinitialize();
    if (global_flg_c == global_flg_ctype.GL) {
      getUserLangByGLwithUX();
    } else {
      UXcustomizeViaCountry();
    }
  } else {
    if(window.location.pathname.startsWith('/ja')) {global_prf_country = 'JP';}
    if(window.location.pathname.startsWith('/ko')) {global_prf_country = 'KR';}
  }
})();
$(function(){
    $(window).on('beforeunload', function() {
      if (global_flg_c == global_flg_ctype.GL || global_flg_c == global_flg_ctype.QP) {
        var s = localStorage;
        s.setItem('ovicecom_countrycode',global_prf_country);
      }
    });
});
$(function(){
  $('a').click(function() {
    var target_url = $(this).attr('href');
    if (!target_url.startsWith('#')) {
      if (global_flg_c == global_flg_ctype.GL || global_flg_c == global_flg_ctype.LS) {
        if (global_prm) {
          global_prm = global_prm + '&countrycode=' + global_prf_country;
        } else {
          global_prm = 'countrycode=' + global_prf_country;
        }
      }
      if (global_prm) {
        if (global_btn_position) {
          var p = window.location.pathname;
          var c = p.startsWith('/ja') ? 'jp' : (p.startsWith('/ko') ? 'ko' : 'en');
          global_prm = global_prm + '&lp_type=' + c + '_official_' + window.location.pathname.substring(1) + '_' + global_btn_position;
        }
        if (target_url.indexOf('?') != -1) {
          $(this).attr('href', target_url + '&' + global_prm);
        } else {
          $(this).attr('href', target_url + '?' + global_prm);
        }
      }
    }
  })
});
$('.' + className_trial_button).click(function(e) {
  global_btn_position = e.currentTarget.dataset['position'];
});
$('.' + className_freeplan_button).click(function(e) {
  global_btn_position = e.currentTarget.dataset['position'];
});
