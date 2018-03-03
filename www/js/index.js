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

     window.onerror = function(message, url, lineNumber) {
        alert("Error: "+message+" in "+url+" at line "+lineNumber);
    }
 

/*
ARRAY PAGINE DA SCARICARE ALL'AVVIO
*/
var vettore_id_pagine_origine = ["55", "6", "66", "13", "69", "14", "70", "15", "71", "16", "72", "17", "73", "18", "74", "19", "75", "20", "56", "21", "57", "22"];

var vettore_id_pagine_900 = ["58", "53", "59", "23", "60", "24", "61", "25", "62", "26", "63", "44", "64", "43", "65", "42", "67", "11", "68", "45", "176", "178", "180", "182"];



var CURRENT_SLIDE = "";
var CURRENT_PAGE = "";

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
								checkLanguage();

				carica_sistema_notifiche();
				window.QRScanner.prepare(onDone); // show the prompt
				getWelcome();

			
		}
		
				if (sPage == "codescan.html"){

				document.getElementsByTagName('body')[0].style.backgroundColor="transparent";
				document.getElementsByTagName('html')[0].style.backgroundColor="transparent";
			
					window.QRScanner.prepare(onDone); // show the prompt

				}
				
				if (sPage == "location_origini.html"){
					
					var current_slider = "div" + localStorage.getItem('slider');
					//alert(current_slider);
					
					
					for (y = 0; y < vettore_id_pagine_origine.length; y+=2){
					
						var p =  document.getElementById(vettore_id_pagine_origine[y]);
						
						if (localStorage.getItem('language') != "it-IT") { 
							p.innerHTML = localStorage.getItem(vettore_id_pagine_origine[y+1]);			
						}else{
							p.innerHTML = localStorage.getItem(vettore_id_pagine_origine[y]);
						}						
					}
					
					document.getElementById(current_slider).classList.add('active');

				}

				if (sPage == "location_900.html"){
					
					var current_slider = "div" + localStorage.getItem('slider');
					//alert(current_slider);
					
					
					for (y = 0; y < vettore_id_pagine_900.length; y+=2){
					
						var p =  document.getElementById(vettore_id_pagine_900[y]);
						
						if (localStorage.getItem('language') != "it-IT") { 
							p.innerHTML = localStorage.getItem(vettore_id_pagine_900[y+1]);			
						}else{
							p.innerHTML = localStorage.getItem(vettore_id_pagine_900[y]);
						}						
					}
					
					document.getElementById(current_slider).classList.add('active');

				}
				
								
				if (sPage == "eventi.html"){
					
					//aggiorna gli eventi
					var testo_eventi = "";
					
						if (localStorage.getItem('language') != "it-IT") { 
							testo_eventi = localStorage.getItem('141');
							document.getElementById(current_slider).classList.add('active');

						}else{
							testo_eventi = localStorage.getItem('139');
							document.getElementById(current_slider).classList.add('active');

						}	

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
        function (language) {localStorage.setItem('language',language.value);},
        function () {localStorage.setItem('language','it-IT');}	//se torna un errore setta italiano 
      );
	  
	if (!localStorage.getItem('language')) {localStorage.setItem('language','it-IT');} 			

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
	 //alert(text);

	vai_allo_slider(text);
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
		
		function vai_allo_slider(id){
			localStorage.setItem('slider', id.toString());
			if (inArray(id, vettore_id_pagine_origine)){
				vai_alla_pagina('location_origini.html','fade');
			}else{
				vai_alla_pagina('location_900.html','fade');
			}
		}
		
	 function inArray(needle,haystack)
		{
			var count=haystack.length;
			for(var i=0;i<count;i++)
			{
				if(haystack[i]===needle){return true;}
			}
			return false;
		}
	/*
function loader_remove(){
		//rimuove il loader 
		var parente =  document.getElementsByTagName('body')[0];
		var child = document.getElementById("loader");
		parente.removeChild(child);
	
}
*/