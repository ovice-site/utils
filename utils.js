// ovice utils build 027 by Tok@ovice, 2024 
var global_prm;
var global_prm_val;
var global_prf_country = 'none';
var global_btn_position = '';
var global_flg_ctype = {none:0,QP:1,LS:2,GL:3,XX:9};
var global_flg_c = global_flg_ctype.none;
const className_UX_for_APAC = 'ux_for_apac';
const className_UX_for_AU = 'ux_for_au';
const className_UX_for_EN = 'ux_for_en';
const className_UX_for_JA = 'ux_for_ja';
const className_UX_for_KO = 'ux_for_ko';
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
  var UX_for_APAC = document.getElementsByClassName(className_UX_for_APAC);
  for (var i = 0; i < UX_for_APAC.length; i++) {
    UX_for_APAC[i].style.display = 'none';
  }
  var UX_for_AU = document.getElementsByClassName(className_UX_for_AU);
  for (var i = 0; i < UX_for_AU.length; i++) {
    UX_for_AU[i].style.display = 'none';
  }
  var UX_for_EN = document.getElementsByClassName(className_UX_for_EN);
  for (var i = 0; i < UX_for_EN.length; i++) {
    UX_for_EN[i].style.display = 'none';
  }
  var UX_for_JA = document.getElementsByClassName(className_UX_for_JA);
  for (var i = 0; i < UX_for_JA.length; i++) {
    UX_for_JA[i].style.display = 'none';
  }
  var UX_for_KO = document.getElementsByClassName(className_UX_for_KO);
  for (var i = 0; i < UX_for_KO.length; i++) {
    UX_for_KO[i].style.display = 'none';
  }
}

function UXcustomizeViaCountry(){
  var UX_for_APAC = document.getElementsByClassName(className_UX_for_APAC);
  for (var i = 0; i < UX_for_APAC.length; i++) {
    switch (global_prf_country) {
      case 'EN_AU':
      case 'en-AU':
      case 'AU':
      case 'NZ':
      case 'SG':
      case 'MY':
        UX_for_APAC[i].style.display = 'inline';
        break;
    }
  }
  var UX_for_AU = document.getElementsByClassName(className_UX_for_AU);
  for (var i = 0; i < UX_for_AU.length; i++) {
    switch (global_prf_country) {
      case 'EN_AU':
      case 'en-AU':
      case 'AU':
        UX_for_AU[i].style.display = 'inline';
        break;
    }
  }
  var UX_for_EN = document.getElementsByClassName(className_UX_for_EN);
  for (var i = 0; i < UX_for_EN.length; i++) {
    switch (global_prf_country) {
      case 'EN':
      case 'en':
      case 'US':
      case 'none':
        UX_for_EN[i].style.display = 'inline';
        break;
    }
  }
  var UX_for_JA = document.getElementsByClassName(className_UX_for_JA);
  for (var i = 0; i < UX_for_JA.length; i++) {
    switch (global_prf_country) {
      case 'JA':
      case 'ja':
      case 'JP':
        UX_for_JA[i].style.display = 'inline';
        break;
    }
  }
  var UX_for_KO = document.getElementsByClassName(className_UX_for_KO);
  for (var i = 0; i < UX_for_KO.length; i++) {
    switch (global_prf_country) {
      case 'KO':
      case 'ko':
      case 'KR':
        UX_for_JA[i].style.display = 'inline';
        break;
    }
  }
}

function checkAttribution(d) {
  const refdata = `[
    {"domain": "ovice.", "ref": "ovice"},
    {"domain": "flexergylab.com", "ref": "ovice"},
    {"domain": "play.google.com", "ref": "aso_google"},
    {"domain": "apps.apple.com", "ref": "aso_apple"},
    {"domain": "google.", "ref": "seo_google"},
    {"domain": "yahoo.co.jp", "ref": "seo_yahoo"}, 
    {"domain": "yahoo.com", "ref": "seo_yahoo"}, 
    {"domain": "bing.com", "ref": "seo_bin"},
    {"domain": "duckduckgo.com", "ref": "seo_duckduckgo"},
    {"domain": "coccoc.com", "ref": "seo_coccoc"},
    {"domain": "yandex.com", "ref": "seo_yandex"},
    {"domain": "naver.com", "ref": "seo_naver"},
    {"domain": "baidu.com", "ref": "seo_baidu"},
    {"domain": "ecosia.org", "ref": "seo_ecosia"},
    {"domain": "msn.com", "ref": "seo_msn"},
    {"domain": "excite.co.jp", "ref": "seo_excite"},
    {"domain": "goo.ne.jp", "ref": "seo_goo"},
    {"domain": "livedoor.com", "ref": "seo_livedoor"},
    {"domain": "biglobe.ne.jp", "ref": "seo_biglobe"},
    {"domain": "ocn.ne.jp", "ref": "seo_ocn"},
    {"domain": "nifty.com", "ref": "seo_nifty"},
    {"domain": "infoseek.co.jp", "ref": "seo_infoseek"},
    {"domain": "auone.jp", "ref": "seo_au"},
    {"domain": "docomo.ne.jp", "ref": "seo_docomo"},
    {"domain": "facebook.com", "ref": "social_facebook"},
    {"domain": "x.com", "ref": "social_x"},
    {"domain": "linkedin.com", "ref": "social_linkedin"},
    {"domain": "youtube.com", "ref": "social_youtube"},
    {"domain": "instagram.com", "ref": "social_instagram"},
    {"domain": "www.itreview.jp", "ref": "review_itreview"},
    {"domain": "boxil.jp", "ref": "review_boxil"},
    {"domain": "it-trend.jp", "ref": "review_it-trend"},
    {"domain": "capterra.jp", "ref": "review_capterra"},
    {"domain": "capterra.com", "ref": "review_capterra"},
    {"domain": "g2.com", "ref": "review_g2"},
    {"domain": "getapp.com", "ref": "review_getapp"},
    {"domain": "prtimes.jp", "ref": "media_prtimes"},
    {"domain": "wantedly.com", "ref": "media_wantedly"},
    {"domain": "techable.jp", "ref": "media_techable"},
    {"domain": "zendesk.com", "ref": "media_zendesk"},
    {"domain": "patentsalon.com", "ref": "media_patentsalon"},
    {"domain": "note.com", "ref": "media_note"},
    {"domain": "connpas.com", "ref": "media_connpas"},
    {"domain": "voice-ping.com", "ref": "media_voice-ping"},
    {"domain": "toremaga.com", "ref": "media_toremaga"},
    {"domain": "wmr.tokyo", "ref": "media_wmr-tokyo"},
    {"domain": "zdnet.com", "ref": "media_zdnet"},
    {"domain": "cnet.com", "ref": "media_cnet"},
    {"domain": "impress.co.jp", "ref": "media_impress"},
    {"domain": "panora.tokyo", "ref": "media_panora-tokyo"},
    {"domain": "notion.site", "ref": "media_notion"}
  ]`;
  var j = JSON.parse(refdata);
  for (var i = 0; i < j.length; i++) {
    if (d.indexOf(j[i].domain) > -1) {return j[i].ref;}
  }
  const u = new URL(d);
  return 'other_' + u.host;
}

function secdomain(p) {
  var u = new URL(p).hostname;
  var s = u.split('.');
  var l = s.length;
  return s[l-2] + '.' + s[l-1];
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

  if ((typeof sessionStorage !== 'undefined') & (typeof localStorage !== 'undefined')) {
    var ls = localStorage;
    var ss = sessionStorage;
    var r = document.referrer;
    var ft = false;
    if (r === '') {
      r = 'direct';
    } else {
      var rd = secdomain(r);
      var cd = secdomain(location.origin);
      if (rd === cd) {tr = true;}
    }
    ls.setItem('ovicecom_cPages', Number(ls.getItem('ovicecom_cPages')) + 1);
    if(ss.getItem('ovicecom_fEntry') === null) {
      ss.setItem('ovicecom_fEntry', 1);
      var v = Number(ls.getItem('ovicecom_cVisits'));
      ls.setItem('ovicecom_cVisits', v + 1);
      if (v === 0) {
        ls.setItem('ovicecom_sFirstRef', r);
      }
      if (ft === false) {ls.setItem('ovicecom_sLastRef', r);}
      var t = new Date();
      ls.setItem('ovicecom_nLastTime', t.getTime());
    }
    if (global_prm === '') {
      ls.setItem('ovicecom_attribution', (r === 'direct' ? r : checkAttribution(r)));
    } else {
      var p = global_prm_val.get('source');
      if (p !== null) {
        ls.setItem('ovicecom_attribution', p);
      }
    }
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
    if (!target_url.startsWith('#') && !target_url.startsWith('?') && !target_url.includes('countrycode')) {
      if (global_flg_c == global_flg_ctype.GL || global_flg_c == global_flg_ctype.LS) {

        var at = '';
        if(typeof localStorage !== 'undefined') {
          var s = localStorage;
          if (s.getItem('ovicecom_attribution')) {
            at = s.getItem('ovicecom_attribution');
          }
        }

//        if (global_prm && !global_prm.includes('countrycode')) {
//          global_prm = global_prm + '&countrycode=' + global_prf_country + ((at !== '') ? ('&attribution=' + at) : '');
//        } else {
//          global_prm = 'countrycode=' + global_prf_country + ((at !== '') ? ('&attribution=' + at) : '');
//        }
        if (global_prm && !global_prm.includes('countrycode')) {
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
