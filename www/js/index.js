/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 
 
/*
ARRAY PAGINE DA SCARICARE ALL'AVVIO
*/
var vettore_id_pagine = ["55", "6", "66", "13", "69", "14", "70", "15", "71", "16", "72", "17", "73", "18", "74", "19", "75", "20", "56", "21", "57", "22"];

var CURRENT_LANGUAGE = "";
var CURRENT_SLIDE = "";
var CURRENT_PAGE = "";

/*Location1
vettore_id_pagine[0] = "6"; //Location 1 ENG
vettore_id_pagine[1] = "55"; //Location 1 ITA

//Location2
vettore_id_pagine[2] = "13"; //ENG
vettore_id_pagine[3] = "66"; //ITA

//Location3
vettore_id_pagine[4] = "14"; //ENG
vettore_id_pagine[5] = "69"; //ITA

//Location4
vettore_id_pagine[6] = "15"; //ENG
vettore_id_pagine[7] = "70"; //ITA

//Location5
vettore_id_pagine[8] = "16"; //ENG
vettore_id_pagine[9] = "71"; //ITA

//Location6
vettore_id_pagine[10] = "17"; //ENG
vettore_id_pagine[11] = "72"; //ITA

//Location7
vettore_id_pagine[12] = "18"; //ENG
vettore_id_pagine[13] = "73"; //ITA

//Location8
vettore_id_pagine[14] = "19"; //ENG
vettore_id_pagine[15] = "74"; //ITA

//Location9
vettore_id_pagine[16] = "19"; //ENG
vettore_id_pagine[17] = "75"; //ITA

//Location10
vettore_id_pagine[18] = "21"; //ENG
vettore_id_pagine[19] = "56"; //ITA*/


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
	
		
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

			var sPath=window.location.pathname;
		var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
        console.log('Received Event: ' + id);
		
		if (sPage == "index.html"){
				//se la pagina è lo splash screen carica tutt
				//carica_sistema_notifiche();
				window.QRScanner.prepare(onDone); // show the prompt
				checkLanguage();
				getWelcome();
				
			
		}
		
				if (sPage == "codescan.html"){

				document.getElementsByTagName('body')[0].style.backgroundColor="transparent";
				document.getElementsByTagName('html')[0].style.backgroundColor="transparent";
			
					window.QRScanner.prepare(onDone); // show the prompt

				}
				
				if (sPage == "location_origini.html"){
					
					var current_slider = "div" + localStorage.getItem('slider');
					alert(current_slider);
					document.getElementById(current_slider).add('active');
					
					for (y = 0; y < vettore_id_pagine.length; y+=2){
						var p =  document.getElementById(vettore_id_pagine[y]);
							//if (vettore_id_pagine[y] == y){
								p.innerHTML = localStorage.getItem(vettore_id_pagine[y]);
							//}
			
					}
					
					// var x = document.querySelectorAll(".carousel-item.slider-fullscreen-image.active");
					//x[0].classList.remove("active");
					// var y = document.getElementById("prova_qr");
					//y.classList.add("active");
				
				}
				
				
				
				
	}
};

	function carica_sistema_notifiche(){
		  
		  //window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
		  var notificationOpenedCallback = function(jsonData) {
			console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
		  };

		  window.plugins.OneSignal
			.startInit("a4e21b4d-a1c7-48e4-a5a6-d56f74e75148")
			.handleNotificationOpened(notificationOpenedCallback)
			.endInit();
		
	}

    function checkLanguage() {
      navigator.globalization.getPreferredLanguage(
        function (language) {console.log('language: ' + language.value + '\n');},
        function () {console.log('Error getting language\n');}
      );
    }

function chBackcolor(color) {
   document.body.style.background = color;

}

function onDone(err, status){
  if (err) {
   // here we can handle errors and clean up any loose ends.
   alert(err);
  }
  if (status.authorized) {

    // W00t, you have camera access and the scanner is initialized.
	window.QRScanner.show();
	window.QRScanner.scan(displayContents);

  } else if (status.denied) {

   // The video preview will remain black, and scanning is disabled. We can
   // try to ask the user to change their mind, but we'll have to send them
   // to their device settings with `window.QRScanner.openSettings()`.
  } else {
    // we didn't get permission, but we didn't get permanently denied. (On
    // Android, a denial isn't permanent unless the user checks the "Don't
    // ask again" box.) We can ask again at the next relevant opportunity.
  }
}

function displayContents(err, text){

  if(err){
    // an error occurred, or the scan was canceled (error code `6`)
	alert(err);
  } else {
    // The scan completed, display the contents of the QR code:
	vai_allo_slider(text);
    //alert(text);
  }
}



		function getWelcome(){
			
			var ajaxRequest = new XMLHttpRequest();
			ajaxRequest.onreadystatechange = function(){
			
				if(ajaxRequest.readyState == 4){
					//the request is completed, now check its status
					if(ajaxRequest.status == 200){
						console.log(ajaxRequest.responseText);
						data = JSON.parse(ajaxRequest.responseText);
						//alert(data);
						salva_dati(data);
						window.location = "seleziona_percorso.html";
						
					
					}
					else{
						console.log("Status error: " + ajaxRequest.status);
						window.location = "seleziona_percorso.html";
					}
				}
				else{
					console.log("Ignored readyState: " + ajaxRequest.readyState);
				}
			


			
			}
			ajaxRequest.open('GET', 'http://app.roccadellecaminate.com/wp-json/wp/v2/pages?per_page=100');
			ajaxRequest.send();
		}
		
		function salva_dati(data){
			for (i=0; i < data.length; i++){
		
							localStorage.setItem(data[i].id.toString(), data[i].content.rendered.toString());
							//alert("Salvato " + vettore_id_pagine[y].toString() + " con i dati " + data[i].content.rendered.toString());
			
			}
			
			
		}
		
		function vai_alla_pagina(pag, animazione){
			
			switch (animazione){
				case "flip":
					var options = {
					  "direction"      : "up", // 'left|right|up|down', default 'right' (Android currently only supports left and right)
					  "duration"       :  600, // in milliseconds (ms), default 400
					  "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
					  "androiddelay"   :  100,  // same as above but for Android, default 70
					  "winphonedelay"  :  150, // same as above but for Windows Phone, default 200
					  "href" : pag

					};
					window.plugins.nativepagetransitions.flip(
					  options,
					  function (msg) {console.log("success: " + msg)}, // called when the animation has finished
					  function (msg) {alert("error: " + msg)} // called in case you pass in weird values
					);
				
				break;
				
				case "fade":
						var options = {
						  "duration"       :  600, // in milliseconds (ms), default 400
						  "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
						  "androiddelay"   :  100,
						  "href" : pag

						};
						window.plugins.nativepagetransitions.fade(
						  options,
						  function (msg) {console.log("success: " + msg)}, // called when the animation has finished
						  function (msg) {alert("error: " + msg)} // called in case you pass in weird values
						);
				break;
			}
			
		}
		
		function vai_allo_slider(id, pagina){
			localStorage.setItem('slider', id.toString());
			if (pagina == "origini"){
				vai_alla_pagina('location_origini.html');
			}
			else
			{
				vai_alla_pagina('location_900.html');
			}
		}
	/*
function loader_remove(){
		//rimuove il loader 
		var parente =  document.getElementsByTagName('body')[0];
		var child = document.getElementById("loader");
		parente.removeChild(child);
	
}
*/