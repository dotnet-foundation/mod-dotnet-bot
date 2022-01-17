'use strict';

const $ = require('jquery');
const App = require('./modules/app.js');
const Viewport = require('./modules/viewport.js');
const Controls = require('./modules/controls.js');
const Objects = require('./modules/objects.js');
const Save = require('./modules/save.js');

$(function () {
//create the app.
  let app = new App();
  let viewport = new Viewport();
  let controls = new Controls();
  let objects = new Objects();
  let save = new Save();
});

var currentYear= new Date().getFullYear();
document.getElementById("currentYear").innerHTML = currentYear;