// ovice utils build 028 by Tok@ovice, 2024 
var global_utils = 28;
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
    {"domain": "ovice.", "ref": "ref_ovart"},
    {"domain": "flexergylab.com", "ref": "ref_flart"},
    {"domain": "play.google.com", "ref": "aso_gosea"},
    {"domain": "apps.apple.com", "ref": "aso_apsea"},
    {"domain": "google.", "ref": "seo_gosea"},
    {"domain": "yahoo.co.jp", "ref": "seo_yasea"}, 
    {"domain": "yahoo.com", "ref": "seo_yasea"}, 
    {"domain": "bing.com", "ref": "seo_misea"},
    {"domain": "duckduckgo.com", "ref": "seo_otsea"},
    {"domain": "coccoc.com", "ref": "seo_otsea"},
    {"domain": "yandex.com", "ref": "seo_otsea"},
    {"domain": "naver.com", "ref": "seo_otsea"},
    {"domain": "baidu.com", "ref": "seo_otsea"},
    {"domain": "ecosia.org", "ref": "seo_otsea"},
    {"domain": "msn.com", "ref": "seo_otsea"},
    {"domain": "excite.co.jp", "ref": "seo_otsea"},
    {"domain": "goo.ne.jp", "ref": "seo_otsea"},
    {"domain": "livedoor.com", "ref": "seo_otsea"},
    {"domain": "biglobe.ne.jp", "ref": "seo_otsea"},
    {"domain": "ocn.ne.jp", "ref": "seo_otsea"},
    {"domain": "nifty.com", "ref": "seo_otsea"},
    {"domain": "infoseek.co.jp", "ref": "seo_otsea"},
    {"domain": "auone.jp", "ref": "seo_otsea"},
    {"domain": "docomo.ne.jp", "ref": "seo_otsea"},
    {"domain": "facebook.com", "ref": "soc_fapos"},
    {"domain": "x.com", "ref": "soc_xpos"},
    {"domain": "linkedin.com", "ref": "soc_lipos"},
    {"domain": "youtube.com", "ref": "soc_yopos"},
    {"domain": "instagram.com", "ref": "soc_inpos"},
    {"domain": "www.itreview.jp", "ref": "ref_itart"},
    {"domain": "prtimes.jp", "ref": "ref_prart"},
    {"domain": "boxil.jp", "ref": "ref_otart"},
    {"domain": "it-trend.jp", "ref": "ref_otart"},
    {"domain": "capterra.jp", "ref": "ref_otart"},
    {"domain": "capterra.com", "ref": "ref_otart"},
    {"domain": "g2.com", "ref": "ref_otart"},
    {"domain": "getapp.com", "ref": "ref_otart"},
    {"domain": "wantedly.com", "ref": "ref_otart"},
    {"domain": "techable.jp", "ref": "ref_otart"},
    {"domain": "zendesk.com", "ref": "ref_otart"},
    {"domain": "patentsalon.com", "ref": "ref_otart"},
    {"domain": "note.com", "ref": "ref_otart"},
    {"domain": "connpas.com", "ref": "ref_otart"},
    {"domain": "voice-ping.com", "ref": "ref_otart"},
    {"domain": "toremaga.com", "ref": "ref_otart"},
    {"domain": "wmr.tokyo", "ref": "ref_otart"},
    {"domain": "zdnet.com", "ref": "ref_otart"},
    {"domain": "cnet.com", "ref": "ref_otart"},
    {"domain": "impress.co.jp", "ref": "ref_otart"},
    {"domain": "panora.tokyo", "ref": "ref_otart"},
    {"domain": "notion.site", "ref": "ref_otart"}
  ]`;
  ]`;
  var j = JSON.parse(refdata);
  for (var i = 0; i < j.length; i++) {
    if (d.indexOf(j[i].domain) > -1) {return j[i].ref;}
  }
//  const u = new URL(d);
//  return 'other_' + u.host;
  return 'ref_otart';
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
    var u = ls.getItem('ovicecom_utils');
    if ((u == null) || Number(u) < global_utils) {ls.setItem('ovicecom_utils', global_utils);}
    if(ss.getItem('ovicecom_fEntry') === '99') {
      console.log('ovicecom utils: reset');
      ss.removeItem('ovicecom_fEntry');
      ls.removeItem('ovicecom_utils');
      ls.removeItem('ovicecom_countrycode');
      ls.removeItem('ovicecom_cPages');
      ls.removeItem('ovicecom_cVisits');
      ls.removeItem('ovicecom_sFirstRef');
      ls.removeItem('ovicecom_attribution');
      return;
    }
    if (r === '') {
      r = 'direct';
    } else {
      var rd = secdomain(r);
      var cd = secdomain(location.origin);
      if (rd === cd) {ft = true;}
    }
    if((ss.getItem('ovicecom_fEntry') === null) && (ft === false)) {
      ss.setItem('ovicecom_fEntry', 1);
      if (global_prm === '') {
        ls.setItem('ovicecom_sLastRef', (r === 'direct' ? r : checkAttribution(r)));
      } else {
        var p = global_prm_val.get('source');
        if (p !== null) {
          ls.setItem('ovicecom_sLastRef', p);
        }
      }
      var v = Number(ls.getItem('ovicecom_cVisits'));
      ls.setItem('ovicecom_cVisits', v + 1);
      if (v === 0) {
        ls.setItem('ovicecom_sFirstRef', r);
      }
    }
    var t = new Date();
    ls.setItem('ovicecom_nLastTime', t.getTime());
    ls.setItem('ovicecom_cPages', Number(ls.getItem('ovicecom_cPages')) + 1);
    ls.setItem('ovicecom_attribution', ls.getItem('ovicecom_sLastRef'));
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
        if (target_url.includes('trial-form') || target_url.includes('go.ovice.com')) {
          var at = '';
          if(typeof localStorage !== 'undefined') {
            var s = localStorage;
            if (s.getItem('ovicecom_attribution')) {
              at = 'mp=' + s.getItem('ovicecom_cPages') + '&mv=' + s.getItem('ovicecom_cVisits') + '&mf=' + s.getItem('ovicecom_sFirstRef') + '&ms=' + s.getItem('ovicecom_attribution');
              global_prm = global_prm + '&' + at;
            }
          }
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
