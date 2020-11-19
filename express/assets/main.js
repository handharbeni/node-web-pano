/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Create viewer.
var viewer = new Marzipano.Viewer(document.getElementById('pano'));

// Create source.
//http://1909741816.rsc.cdn77.org/
var baseUrl = "http://1909741816.rsc.cdn77.org/";
// baseUrl = "http://localhost:3000/"
var source = Marzipano.ImageUrlSource.fromString(baseUrl+"assets/image/lobi/{f}/{y}{x}.jpg");

// Create geometry.
var geometry = new Marzipano.CubeGeometry([
  { tileSize: 512, size: 3072, fallbackOnly: false }
]);


// Create view.
var limiter = Marzipano.RectilinearView.limit.traditional(4086, 200*Math.PI/359);

var view = new Marzipano.RectilinearView({ pitch: 0, yaw: 0, fov: Math.PI }, limiter);

// Create scene.
var scene = viewer.createScene({
  source: source,
  geometry: geometry,
  view: view,
  pinFirstLevel: true
});

// Display scene.
scene.switchTo();

// Get the hotspot container for scene.
var container = scene.hotspotContainer();

// Create hotspot with different sources.
container.createHotspot(document.getElementById('iframespotright'),  { yaw: 0.79, pitch: -0.002 },
  { perspective: { radius: 2640, extraTransforms: "rotateY(45deg)" }});
  container.createHotspot(document.getElementById('iframespotleft'),  { yaw: -0.79, pitch: -0.002 },
  { perspective: { radius: 2640, extraTransforms: "rotateY(-45deg)" }});
// container.createHotspot(document.getElementById('iframeselect'), { yaw: 0.70, pitch: -0.239 },
//   { perspective: { extraTransforms: "rotateY(45deg)" }});

// HTML sources.
var hotspotHtml = {
  zoom: '<iframe id="youtube" width="480" height="1280" src="https://www.youtube.com/embed/a4YjKmsXyds?rel=0&amp;controls=0&amp;showinfo=0&amp;" frameborder="0" allowfullscreen></iframe>',
  youtube: '<iframe id="youtubeWithControls" width="1280" height="480" src="https://www.youtube.com/embed/a4YjKmsXyds?rel=0&amp;controls=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'
};

// Switch sources when clicked.
function switchHotspot(id) {
  var wrapper = document.getElementById('iframespotright');
  wrapper.innerHTML = hotspotHtml[id];
}

var switchElements = document.querySelectorAll('[data-source]');
for (var i = 0; i < switchElements.length; i++) {
  var element = switchElements[i];
  addClickEvent(element);
}

function addClickEvent(element) {
  element.addEventListener('click', function() {
    switchHotspot(element.getAttribute('data-source'));
  });
}