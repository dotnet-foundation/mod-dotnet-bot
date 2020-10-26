'use strict';

const $ = require('jquery');

class Save {

	constructor( options ) {

		const saveBtn = $('#download-file');
		const shareBtn = $('#share-on-twitter');
		const shareModal = $('#share-modal');
		const bd = $('body');
		const toggleShare = $('.js-toggle-share');
		const termsLabel = $('#terms-label');
		const terms = $('#terms');

		let termsAgreed = localStorage.getItem('modthebotterms');


		$(document).ready(function(){
			if( termsAgreed == 'true' ) {
				terms.prop( "checked", true );
				shareBtn.removeAttr('disabled');
				saveBtn.removeAttr('disabled');
			}
		});

		terms.change(function() {
		    var ischecked= $(this).is(':checked');
				if( ischecked ) {
					console.log('check');
					localStorage.setItem('modthebotterms', 'true');
					shareBtn.removeAttr('disabled');
					saveBtn.removeAttr('disabled');

				} else {
					console.log('uncheck');
					localStorage.setItem('modthebotterms', 'false');
					shareBtn.attr('disabled', 'disabled');
					saveBtn.attr('disabled', 'disabled');
				}
		});

		toggleShare.click(function(e){
			e.preventDefault();
			if( shareModal.hasClass('is-active') ) {
				shareModal.removeClass('is-active');
				bd.removeClass('modal-is-active');
			} else {
				shareModal.addClass('is-active');
				bd.addClass('modal-is-active');
			}
		});


		saveBtn.click(function(e){
			e.preventDefault();
			convert('#bot', downloadImg, true, false, false);
		});

		shareBtn.click(function(e){
			e.preventDefault();
			convert('#bot', tweetImg, false, false, true);
		});

		function convert(selectors, callbackFunction, downloadObject, tweetObject){
			[].forEach.call(document.querySelectorAll(selectors),function(div){
				try{
					var sourceImage;

					var img = document.getElementById('img'),
					svg  = document.getElementById('bot'),
					can  = document.getElementById('canvas'),
					ctx  = can.getContext('2d');

					var scaleFactor = 300 / 96;
					// can.width = Math.ceil(canvas.width * scaleFactor);
					// can.height = Math.ceil(canvas.height * scaleFactor);

					//can.style["display"] = "none";
					can.setAttribute("width", 2000);
					can.setAttribute("height", 2000);

					img.src = svgDataURL(svg);
					var svgData = img.src;
					sourceImage = new Image;
					sourceImage.width  = 2000;
					sourceImage.height = 2000;

					var filename = "my-dotnet-bot-mod";

					sourceImage.onload = function(){
						//ctx.fillStyle = "#f6f8fa";
						ctx.fillStyle = "rgba(255, 255, 255, 0)";
						//ctx.fillRect(0, 0, canvas.width, canvas.height);
						ctx.fillRect(0, 0, canvas.width, canvas.height);
						ctx.drawImage(sourceImage,0,0,2000,2000);

						if(downloadObject) {
							img.src = can.toDataURL();
							var a = document.createElement("a");
							a.download = filename+".png";
							a.href = img.src;
							document.body.appendChild(a);
							a.click();
						}

						svgData = new XMLSerializer().serializeToString(document.getElementById("bot"));
						var encodedData = window.btoa(svgData);
						//console.log('Ssvg Data = ' +  encodedData);
						//console.log('==========');
						img.src = can.toDataURL();
						var imgData = img.src;
						imgData = img.src.split("data:image/png;base64,").pop();

						// Add image data to form input field
						document.getElementById('image-file').value = imgData;

						//console.log(imgData);

						//if(emailObject) {
						callbackFunction();
						//}
						document.getElementById('tweetPreviewImg').src = svgDataURL(svg);
					};

					sourceImage.src = svg ? svgDataURL(svg) : div.getAttribute('data-svgSource');


				}catch(e){ console.log(e) }
			});
		}

		function binEncode(data) {
			var binArray = [];
			var datEncode = "";

			for (i=0; i < data.length; i++) {
				binArray.push(data[i].charCodeAt(0).toString(2));
			}
			for (j=0; j < binArray.length; j++) {
				var pad = padding_left(binArray[j], '0', 8);
				datEncode += pad + ' ';
			}
			function padding_left(s, c, n) { if (! s || ! c || s.length >= n) {
				return s;
			}
			var max = (n - s.length)/c.length;
			for (var i = 0; i < max; i++) {
				s = c + s; } return s;
			}
			return binArray;
		}



		function downloadImg() {
			console.log('download image');
		}

		function tweetImg() {
			console.log('tweet image');
			let tp = $('#tweet-preview');
			tp.removeClass('d-none');

		}


		function postToTwitter() {
			console.log('tweet image');

			let tp = $('#tweet-preview');

			tp.removeClass('d-none');

			//$('#img').removeClass('d-none');

			var form = document.getElementById("share-on-twitter");
			var mediab64 = document.getElementById('twitter-image').value;

			TweenMax.to(svgMaskLoad, 10, { scaleY: 0.3, transformOrigin:"top center",ease: Power4.easeOut }).delay(0.4);
			exportModal.classList.add('posting');
			//console.log(window.location.hostname);

			var postUrl = 'https://octocat-generator.herokuapp.com/auth';
			if( window.location.hostname === '127.0.0.1' ) {
				postUrl = 'http://localhost:4000/';
			}
			window.fetch(postUrl, {
				method:'POST',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-type':'application/json'
				},
				body:JSON.stringify({ media_id: mediab64 })
			})
			.then((res) => res.json())
			.then((data) => {
				//console.log('el response = ' + JSON.stringify(data.success));
				//console.log('Admin authorized, now authorizing user');
				var herokuToken = data.success.oauth_token;
				var url = 'https://twitter.com/oauth/authenticate?oauth_token=' + herokuToken;
				var callbackUrl = window.location.origin + '/close';
				//var login = window.open(url, "_blank", "width=400,height=400,status=yes");

				loginWindow.location.href = url;

				// Send message to child window and check for twitter tokens
				function childRequest() {
					var message = 'Checking for tokens...';
					//console.log('Sending message: ' + message);
					loginWindow.postMessage(message, callbackUrl); //send the message and target URI
				}
				var credsCheck = setInterval(childRequest, 2000);

				// listen for message back from child window
				window.addEventListener('message',function(event) {
					//if(event.origin !== '') return;
					//console.log('Response from child:  ', event.data);
					if (event.data[0] === herokuToken) {
						//console.log('Tokens match');
						clearInterval(credsCheck);
						loginWindow.close();
						previewTweet(event.data[0], event.data[1]);
					} else {
						clearInterval(credsCheck);
						loginWindow.close();
						exportModal.classList.remove('posting');
						exportModal.classList.add('error');
					}
				},false);


				function previewTweet(auth, veri) {
					//console.log("Preview Tweet");

					exportModal.classList.add('previewing');

					document.getElementById('tweet').onclick = function(e) {
						e.preventDefault();
						var text = document.getElementById('tweet-text').value;
						callback(auth, veri, text);
					};
				}


				function callback(auth, veri, text) {

					exportModal.classList.remove('previewing');

					var postUrl = 'https://octocat-generator.herokuapp.com/tweet';
					if( window.location.hostname === '127.0.0.1' ) {
						postUrl = 'http://localhost:4000/auth';
					}
					window.fetch(postUrl, {
						method:'POST',
						headers: {
							'Accept': 'application/json, text/plain, */*',
							'Content-type':'application/json'
						},
						body:JSON.stringify({oauth_token: auth, oauth_token_secret: data.success.oauth_token_secret, oauth_verifier: veri, media_id: mediab64, tweetText: text})
					}).then((res) => res.json())
					.then((data) => {

						// console.log('++++++++++++++++++');
						// console.log('response = ' + JSON.stringify(data.success));
						// console.log('response = ' + JSON.stringify(data.msg));
						// console.log('++++++++++++++++++');

						if( data.success === true ){
							TweenMax.to(svgMaskLoad, 2, { scaleY: 0, transformOrigin:"top center", ease: Power0.easeNone }).delay(1.4);
							setTimeout(function(){
								exportModal.classList.remove('posting');
								exportModal.classList.add('completed');
								sendToAws(false);
								TweenMax.to(svgMaskLoad, 1, { scaleY: 1}).delay(1);
								var url = data.url,
								params = data.params;
							}, 2300);

						} else {
							setTimeout(function(){
								//console.log('There was an issue');
								exportModal.classList.remove('posting');
								exportModal.classList.add('error');
							}, 4300);
						}
					})
				}
			})
		}

		function svgDataURL(svg) {
			var svgAsXML = (new XMLSerializer).serializeToString(svg);
			return "data:image/svg+xml," + encodeURIComponent(svgAsXML);
		}


		const tweetText = document.getElementById('tweet-text');
    const charCount = document.getElementById('tweet-text-count');

    let truncate = function (elem, limit) {
        if (!elem || !limit) return;
    };

    let tweetTextCount = function (event) {
      let cc = tweetText.value.length;
      charCount.innerHTML = cc;
    };

    tweetTextCount();
    tweetText.addEventListener('keydown', tweetTextCount, false);
    tweetText.addEventListener('keyup', tweetTextCount, false);
    tweetText.addEventListener('change', tweetTextCount, false);

	}

}

module.exports = Save;
