!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);let o=new Date;o.getMonth(),o.getDate(),o.getFullYear();async function r(){const e=document.getElementById("city").value,t=new Date(document.getElementById("start_date").value),n=new Date(document.getElementById("end_date").value);let r,a,i;if(""!=document.getElementById("city").value)try{const c=await fetch(`http://api.geonames.org/searchJSON?q=${e}&maxRows=1&username=Soph13`);if(!c.ok)throw new Error("Error: "+c.status);const s=await c.json();r=s.geonames[0].lat,a=s.geonames[0].lng,i=s.geonames[0].countryName,console.log("Latitude:",r),console.log("Longitude:",a),console.log("Country Name:",i);const u=await fetch(`https://pixabay.com/api/?key=38378808-06119754e49cc79e1d83890eb&q=${encodeURIComponent(i)}&image_type=photo`);if(!u.ok)throw new Error("Error: "+u.status);const l=await u.json();let d="";d=217186!=l.hits[0].id&&l.hits.length>0?l.hits[0].webformatURL:"https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";const m=document.getElementById("countryImage");m.src=d,""!=d&&(m.style.display="block"),m.alt=`Image of ${i}`;let f="";217186!=l.hits[0].id&&l.hits.length>0?f+=`\n      <div>\n        <h4>Enjoy your visit to ${i}<h4>\n      </div>\n    `:f+="\n      <div>\n        <h4>You're still on Earth, but did you enter a city name above?<h4>\n      </div>\n    ",document.getElementById("imageHeader").innerHTML=f;const p=n.getTime()-o.getTime();if(p/864e5>1){const o=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${e}/${t.toISOString()}/${n.toISOString()}?key=6V2W7DPS5FP4QDZ4TCN4DR9QT`,r=await fetch(o);if(!r.ok)throw new Error("Error: "+r.status);const a=await r.json();let i="";for(const e of a.days){const t=e.datetime,n=e.tempmax,o=e.tempmin;i+=`\n          <div>\n            <p>Date: ${t}</p>\n            <p>Weather: ${e.conditions}</p>\n            <p>Maximum temperature: ${n}</p>\n            <p>Minimum temperature: ${o}</p>\n          </div>\n        `}document.getElementById("weatherData").innerHTML=i}else{const e=await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${r}&lon=${a}&days=1&key=80aee9f45fa64af9a37f78ca57292048`);if(!e.ok)throw new Error("Error: "+e.status);const t=await e.json();let n="";for(const e of t.data){const t=e.datetime,o=e.max_temp,r=e.min_temp;n+=`\n          <div>\n            <p>Date: ${t}</p>\n            <p>Weather: ${e.weather.description}</p>\n            <p>Maximum temperature: ${o}</p>\n            <p>Minimum temperature: ${r}</p>\n          </div>\n        `}document.getElementById("weatherData").innerHTML=n}}catch(e){console.log(e)}else alert("Enter a city name")}async function a(e,t){try{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!n.ok)throw new Error("Error: "+n);console.log("Entry added successfully")}catch(e){console.log(e)}}document.getElementById("generate").addEventListener("click",r);n(0);n.d(t,"generateButtonClicked",(function(){return r})),n.d(t,"addEntry",(function(){return a})),console.log(r)}]);