'use strict';

const $ = require('jquery');

class Save {

  constructor(options) {
    //setup any defaults
    this.defaults = {};
    //merge options with defaults
    this.settings = $.extend(true, {}, this.defaults, options);

    if ($('#bot').length) {
      this.setup();
    }

  }

  setup() {
    const saveBtn = $('#download-file');
    const shareBtn = $('#share-on-twitter');
    const shareModal = $('#share-modal');
    const bd = $('body');
    const toggleShare = $('.js-toggle-share');
    const termsLabel = $('#terms-label');
    const terms = $('#terms');
    let termsAgreed = localStorage.getItem('modthebotterms');


    $(document).ready(function () {
      if (termsAgreed == 'true') {
        terms.prop("checked", true);
        shareBtn.removeAttr('disabled');
        saveBtn.removeAttr('disabled');
      }
    });

    terms.change(function () {
      var ischecked = $(this).is(':checked');
      if (ischecked) {
        //console.log('check');
        localStorage.setItem('modthebotterms', 'true');
        shareBtn.removeAttr('disabled');
        saveBtn.removeAttr('disabled');

      } else {
        //console.log('uncheck');
        localStorage.setItem('modthebotterms', 'false');
        shareBtn.attr('disabled', 'disabled');
        saveBtn.attr('disabled', 'disabled');
      }
    });

    toggleShare.click(function (e) {
      e.preventDefault();
      if (shareModal.hasClass('is-active')) {
        shareModal.removeClass('is-active');
        bd.removeClass('modal-is-active');
      } else {
        shareModal.addClass('is-active');
        bd.addClass('modal-is-active');
      }
    });


    saveBtn.click(function (e) {
      e.preventDefault();
      convert('#bot', downloadImg, true, false, false);
    });

    shareBtn.click(function (e) {
      e.preventDefault();
      convert('#bot', tweetImg, false, false, true);
    });

    function convert(selectors, callbackFunction, downloadObject, tweetObject) {
      [].forEach.call(document.querySelectorAll(selectors), function (div) {
        try {

          let antenna = $('#antenna-holder');
          let antennaContents = $('#antenna-holder').html();

          // Need to remove antenna for export, display none doesnt work
          if ($('#bot').hasClass('hide-antenna')) {
            antenna.empty();
          }

          var sourceImage;

          var img = document.getElementById('img'),
            svg = document.getElementById('bot'),
            can = document.getElementById('canvas'),
            ctx = can.getContext('2d');
          var scaleFactor = 300 / 96;
          can.setAttribute("width", 2000);
          can.setAttribute("height", 2000);

          img.src = svgDataURL(svg);
          var svgData = img.src;
          sourceImage = new Image;
          sourceImage.width = 2000;
          sourceImage.height = 2000;

          var filename = "my-dotnet-bot-mod";

          sourceImage.onload = function () {
            //ctx.fillStyle = "#f6f8fa";
            ctx.fillStyle = "rgba(255, 255, 255, 0)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(sourceImage, 0, 0, 2000, 2000);

            if (downloadObject) {
              img.src = can.toDataURL();
              var a = document.createElement("a");
              a.download = filename + ".png";
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
            document.getElementById('twitter-image').value = imgData;
            //console.log(imgData);

            //if(emailObject) {
            callbackFunction();
            //}
            document.getElementById('tweetPreviewImg').src = svgDataURL(svg);
          };

          sourceImage.src = svg ? svgDataURL(svg) : div.getAttribute('data-svgSource');


          // Need to remove antenna for export, display none doesnt work
          if ($('#bot').hasClass('hide-antenna')) {
            antenna.html(antennaContents);
            // antennaContents = $('#antenna-holder').html();
            // antenna.empty();
          }

        } catch (e) {
          console.log(e)
        }
      });
    }

    function binEncode(data) {
      var binArray = [];
      var datEncode = "";

      for (i = 0; i < data.length; i++) {
        binArray.push(data[i].charCodeAt(0).toString(2));
      }
      for (j = 0; j < binArray.length; j++) {
        var pad = padding_left(binArray[j], '0', 8);
        datEncode += pad + ' ';
      }

      function padding_left(s, c, n) {
        if (!s || !c || s.length >= n) {
          return s;
        }
        var max = (n - s.length) / c.length;
        for (var i = 0; i < max; i++) {
          s = c + s;
        }
        return s;
      }

      return binArray;
    }

    function downloadImg() {
      //console.log('download image');
    }

    function tweetImg() {
      //console.log('tweet image');
      postToTwitter();
    }


    var loginWindow;

    $('.js-stop-tweet').click(function () {
      $('#share-modal').removeClass('is-working');
      loginWindow.close();
    });


    function postToTwitter() {
      $('#share-modal').addClass('is-working');
      //console.log('start tweet process');
      loginWindow = window.open('', "_blank", "width=400,height=400,status=yes,menubar=no,titlebar=no,toolbar=no,location=no");
      const form = document.getElementById("share-on-twitter");
      const mediab64 = document.getElementById('twitter-image').value;
      const postUrl = 'https://create-dotnet-bot.azurewebsites.net/api/auth';
      window.fetch(postUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({media_id: mediab64})
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log('Response = ' + JSON.stringify(data.success));
          // console.log(data.tokenResponse.oAuthToken);
          // console.log('Admin authorized, now authorizing user');
          //console.log(data);
          //console.log('vv')
          const tweetToken = data.tokenResponse.oAuthToken;
          const url = 'https://twitter.com/oauth/authenticate?oauth_token=' + tweetToken;
          const callbackUrl = window.location.origin + '/close';
          //var login = window.open(url, "_blank", "width=400,height=400,status=yes");
          loginWindow.location.href = url;

          // Send message to child window and check for twitter tokens
          function childRequest() {
            const message = 'Checking for tokens...';
            //console.log('Sending message: ' + message);
            loginWindow.postMessage(message, callbackUrl); //send the message and target URI
          }

          var credsCheck = setInterval(childRequest, 2000);


          // listen for message back from child window
          window.addEventListener('message', function (event) {
            //if(event.origin !== '') return;
            //console.log('Response from child:  ', event.data);
            if (event.data[0] === tweetToken) {
              //console.log('Tokens match');
              clearInterval(credsCheck);
              loginWindow.close();
              previewTweet(event.data[0], event.data[1]);
              //console.log('data from close = ' + event.data[0] + ' and ' + event.data[1]);
            } else {
              clearInterval(credsCheck);
              loginWindow.close();
              // exportModal.classList.remove('posting');
              // exportModal.classList.add('error');
            }
          }, false);


          function previewTweet(auth, veri) {
            //console.log("Preview Tweet");
            $('#share-modal').removeClass('is-working');
            $('#tweet-preview').removeClass('d-none');
            document.getElementById('tweet').onclick = function (e) {
              e.preventDefault();
              var text = document.getElementById('tweet-text').value;
              callback(auth, veri, text);
            };
          }


          function callback(auth, veri, text) {
            $('#tweet-preview').addClass('is-working');
            //exportModal.classList.remove('previewing');
            var postUrl = 'https://create-dotnet-bot.azurewebsites.net/api/tweet';
            window.fetch(postUrl, {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                oauth_token: auth,
                oauth_token_secret: data.tokenResponse.oAuthTokenSecret,
                oauth_verifier: veri,
                media_id: mediab64,
                tweetText: text
              })
            }).then((res) => res.json())
              .then((data) => {

                // console.log('++++++++++++++++++');
                // console.log('response = ' + JSON.stringify(data));
                // //console.log('response = ' + JSON.stringify(data.msg));
                // console.log('++++++++++++++++++');

                if (data.success === true) {
                  setTimeout(function () {
                    $('#tweet-preview').removeClass('is-working');
                    $('#tweet-preview').addClass('d-none');
                    $('#share-modal').addClass('success');
                    var url = data.url,
                      params = data.params;
                  }, 2300);

                } else {
                  setTimeout(function () {
                    console.log('There was an issue');
                    $('#tweet-preview').removeClass('is-working');
                    $('#share-modal').addClass('error');
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
