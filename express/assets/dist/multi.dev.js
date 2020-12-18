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

(function () {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var animatedModal = window.animatedModal;
  var host = "https://wisuda2020-prasetiyamulya.com/"; // host = "http://localhost:3000/";

  var baseUrl = host; // baseUrl = "http://localhost:3000/";

  var data = window.data; // Grab elements from DOM.

  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');
  var sceneListElement = document.querySelector('#sceneList');
  var sceneElements = document.querySelectorAll('#sceneList .scene');
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreenToggle'); // Detect desktop or mobile mode.

  if (window.matchMedia) {
    var setMode = function setMode() {
      if (mql.matches) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
      }
    };

    var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add('desktop');
  } // Detect whether we are on a touch device.


  document.body.classList.add('no-touch');
  window.addEventListener('touchstart', function () {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  }); // Use tooltip fallback mode on IE < 11.

  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  } // Viewer options.


  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  }; // Initialize viewer.

  var viewer = new Marzipano.Viewer(panoElement, viewerOpts); // Create scenes.

  var scenes = data.scenes.map(function (data) {
    var urlPrefix = baseUrl;
    var previewUrl = urlPrefix + "assets/image/" + data.id + "/" + data.lvl + "/" + data.preview;
    var source = Marzipano.ImageUrlSource.fromString(urlPrefix + "assets/image/" + data.id + "/" + data.lvl + "/{f}/image_{y}_{x}.jpeg", {
      cubeMapPreviewUrl: previewUrl
    });
    var geometry = new Marzipano.CubeGeometry(data.levels);
    var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 200 * Math.PI / 359);
    var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);
    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: false
    });
    data.embedHotspot.forEach(function (hotspot) {
      var element = createEmbededHotspot(hotspot);
      scene.hotspotContainer().createHotspot(element, {
        yaw: hotspot.yaw,
        pitch: hotspot.pitch
      }, {
        perspective: hotspot.perspective
      });
      console.log(hotspot.yaw, hotspot.pitch, hotspot.source[0].content);
      switchHotspotId(hotspot, hotspot.source[0].content);
    }); // Create link hotspots.

    data.linkHotspots.forEach(function (hotspot) {
      var element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, {
        yaw: hotspot.yaw,
        pitch: hotspot.pitch
      }, {
        perspective: hotspot.perspective
      });
    });
    data.initialEmbed.forEach(function (hotspot) {
      var element = createInitialEmbededHotspot(hotspot, data, scene);
      scene.hotspotContainer().createHotspot(element, {
        yaw: hotspot.yaw,
        pitch: hotspot.pitch
      }, {
        perspective: hotspot.perspective
      });
    });
    data.externalLinkHostspot.forEach(function (hotspot) {
      var element = createExternalLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, {
        yaw: hotspot.yaw,
        pitch: hotspot.pitch
      }, {
        perspective: hotspot.perspective
      });
    }); // Create info hotspots.

    data.infoHotspots.forEach(function (hotspot) {
      var element = createInfoHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, {
        yaw: hotspot.yaw,
        pitch: hotspot.pitch
      });
    });
    return {
      data: data,
      scene: scene,
      view: view
    };
  });

  function switchHotspot(source) {
    var newNode = document.createElement('div');
    newNode.innerHTML = source;
    document.getElementsByClassName('iframespot')[0].replaceChild(newNode, document.getElementsByClassName('iframespot')[0].firstChild);
  }

  function switchHotspotId(hotspot, source) {
    var newNode = document.createElement('div');
    newNode.innerHTML = source;
    document.getElementById(hotspot.idhotspot).childNodes[0].replaceChild(newNode, document.getElementById(hotspot.idhotspot).childNodes[0].firstChild);
  }

  function addClickEvent(source, element) {
    element.addEventListener('click', function () {
      switchHotspot(source);
    });
  }

  function removeClickEvent(element) {
    element.addEventListener('click', function () {
      removeEmbeded();
    });
  }

  function generateEmbedHotspot(data, scene) {
    data.embedHotspot.forEach(function (hotspot) {
      var element = createEmbededHotspot(hotspot);
      var menuElement = createMenuEmbededHotspot(hotspot);
      scene.hotspotContainer().createHotspot(element, {
        yaw: hotspot.yaw,
        pitch: hotspot.pitch
      }, {
        perspective: hotspot.perspective
      });
      scene.hotspotContainer().createHotspot(menuElement, {
        yaw: hotspot.sourceLocation.yaw,
        pitch: hotspot.sourceLocation.pitch
      }, {
        perspective: hotspot.sourceLocation.perspective
      });
    });
    switchHotspot(data.embedHotspot[0].source[0].content);
  } // Set up autorotate, if enabled.


  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI / 2
  });

  if (data.settings.autorotateEnabled) {
    autorotateToggleElement.classList.add('enabled');
  } // Set handler for autorotate toggle.


  autorotateToggleElement.addEventListener('click', toggleAutorotate); // Set up fullscreen mode, if supported.

  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled');
    fullscreenToggleElement.addEventListener('click', function () {
      screenfull.toggle();
    });
    screenfull.on('change', function () {
      if (screenfull.isFullscreen) {
        fullscreenToggleElement.classList.add('enabled');
      } else {
        fullscreenToggleElement.classList.remove('enabled');
      }
    });
  } else {
    document.body.classList.add('fullscreen-disabled');
  } // Set handler for scene list toggle.


  sceneListToggleElement.addEventListener('click', toggleSceneList); // Start with the scene list open on desktop.

  if (!document.body.classList.contains('mobile')) {
    showSceneList();
  } // Set handler for scene switch.


  scenes.forEach(function (scene) {
    var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
    el.addEventListener('click', function () {
      switchScene(scene); // On mobile, hide scene list after selecting a scene.

      if (document.body.classList.contains('mobile')) {
        hideSceneList();
      }
    });
  });

  function sanitize(s) {
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
  }

  function switchScene(scene) {
    stopAutorotate();
    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo(0);
    startAutorotate();
    updateSceneName(scene);
    updateSceneList(scene);
  }

  function updateSceneName(scene) {// sceneNameElement.innerHTML = sanitize(scene.data.name);
  }

  function updateSceneList(scene) {
    for (var i = 0; i < sceneElements.length; i++) {
      var el = sceneElements[i];

      if (el.getAttribute('data-id') === scene.data.id) {
        el.classList.add('current');
      } else {
        el.classList.remove('current');
      }
    }
  }

  function showSceneList() {
    sceneListElement.classList.add('enabled');
    sceneListToggleElement.classList.add('enabled');
  }

  function hideSceneList() {
    sceneListElement.classList.remove('enabled');
    sceneListToggleElement.classList.remove('enabled');
  }

  function toggleSceneList() {
    sceneListElement.classList.toggle('enabled');
    sceneListToggleElement.classList.toggle('enabled');
  }

  function startAutorotate() {
    if (!autorotateToggleElement.classList.contains('enabled')) {
      return;
    }

    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  }

  function stopAutorotate() {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  function toggleAutorotate() {
    if (autorotateToggleElement.classList.contains('enabled')) {
      autorotateToggleElement.classList.remove('enabled');
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add('enabled');
      startAutorotate();
    }
  }

  function createExternalLinkHotspotElement(hotspot) {
    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('link-hotspot');
    var icon = document.createElement('img');
    icon.src = 'https://wisuda2020-prasetiyamulya.com/assets/icon/link.png';
    icon.classList.add('link-hotspot-icon');
    var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];

    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];
      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    } // Add click event handler.


    wrapper.addEventListener('click', function () {
      window.location = hotspot.target;
    });
    stopTouchAndScrollEventPropagation(wrapper);
    var tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip');
    wrapper.appendChild(icon);
    return wrapper;
  }

  function createLinkHotspotElement(hotspot) {
    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('link-hotspot'); // Create image element.

    var icon = document.createElement('img');
    icon.src = 'https://wisuda2020-prasetiyamulya.com/assets/icon/link.png';
    icon.classList.add('link-hotspot-icon'); // Set rotation transform.

    var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];

    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];
      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    } // Add click event handler.


    wrapper.addEventListener('click', function () {
      switchScene(findSceneById(hotspot.target));
    }); // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.

    stopTouchAndScrollEventPropagation(wrapper); // Create tooltip element.

    var tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip');
    tooltip.innerHTML = findSceneDataById(hotspot.target).name;
    wrapper.appendChild(icon); // wrapper.appendChild(tooltip);

    return wrapper;
  }

  function createInitialEmbededHotspot(hotspot, data, scene) {
    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('a');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('initial-embed');
    wrapper.href = hotspot.target; // Create image element.

    var icon = document.createElement('img');
    icon.src = hotspot.icon; //http://wisuda2020-prasetiyamulya.com/assets/icon/bumper.gif';

    icon.classList.add('link-hotspot-icon'); // Set rotation transform.

    var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];

    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];
      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    } // Add click event handler.


    wrapper.addEventListener('click', function () {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      var content = document.getElementById("content");
      var contentweb = document.getElementById("content-web");

      if (hotspot.type == 'youtube') {
        contentweb.setAttribute('style', 'display: none;');
        content.setAttribute('style', 'display: block;');
        content.innerHTML = '<iframe class="vid" style="position: absolute; width: 100%; height: 100%; border: none" src="' + hotspot.src + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; loop" allowfullscreen onload="removeTop()"></iframe>';
      } else {
        content.setAttribute('style', 'display: none;');
        contentweb.setAttribute('style', 'display: block;');
        contentweb.innerHTML = '<iframe class="vid" style="position: absolute; width: 100%; height: 100%; border: none" src="' + hotspot.src + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; loop" allowfullscreen onload="removeTop()"></iframe>';
      } // generateEmbedHotspot(data, scene);

    }); // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.

    stopTouchAndScrollEventPropagation(wrapper); // Create tooltip element.

    var tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip'); // tooltip.innerHTML = findSceneDataById(hotspot.target).name;

    wrapper.appendChild(icon); // wrapper.appendChild(tooltip);

    return wrapper;
  }

  function createEmbededHotspot(hotspot) {
    var contentWrapper = document.createElement('div');
    contentWrapper.classList.add('message');
    var text = document.createTextNode("");
    contentWrapper.appendChild(text);
    var wrapper = document.createElement('div');
    wrapper.classList.add('iframespot');
    wrapper.setAttribute('id', hotspot.idhotspot);
    wrapper.appendChild(contentWrapper);
    wrapper.style.display = "none";
    return wrapper;
  }

  function updateEmbededHotspot(source) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('iframespot');
    var text = document.createTextNode(source);
    wrapper.appendChild(text);
    return wrapper;
  }

  function createMenuEmbededHotspot(hotspot) {
    var wrapper = document.createElement('ul');
    wrapper.classList.add('iframeselect');
    wrapper.style.display = "none";
    var i = 0;
    hotspot.source.forEach(function (list) {
      var childList = document.createElement('li');
      childList.setAttribute('data-source', list.name);
      var text = document.createTextNode(list.name);
      childList.appendChild(text);
      wrapper.appendChild(childList);

      if (list.name === "Close") {
        removeClickEvent(childList);
      } else {
        addClickEvent(list.content, childList);
      }
    });
    return wrapper;
  }

  function removeEmbeded() {
    document.getElementsByClassName('iframespot')[0].remove();
    document.getElementsByClassName("iframeselect")[0].remove();
  }

  function createInfoHotspotElement(hotspot) {
    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('info-hotspot'); // Create hotspot/tooltip header.

    var header = document.createElement('div');
    header.classList.add('info-hotspot-header'); // Create image element.

    var iconWrapper = document.createElement('div');
    iconWrapper.classList.add('info-hotspot-icon-wrapper');
    var icon = document.createElement('img');
    icon.src = 'https://wisuda2020-prasetiyamulya.com/assets/icon/info.png';
    icon.classList.add('info-hotspot-icon');
    iconWrapper.appendChild(icon); // Create title element.

    var titleWrapper = document.createElement('div');
    titleWrapper.classList.add('info-hotspot-title-wrapper');
    var title = document.createElement('div');
    title.classList.add('info-hotspot-title');
    title.innerHTML = hotspot.title;
    titleWrapper.appendChild(title); // Create close element.

    var closeWrapper = document.createElement('div');
    closeWrapper.classList.add('info-hotspot-close-wrapper');
    var closeIcon = document.createElement('img');
    closeIcon.src = 'https://wisuda2020-prasetiyamulya.com/assets/icon/close.png';
    closeIcon.classList.add('info-hotspot-close-icon');
    closeWrapper.appendChild(closeIcon); // Construct header element.

    header.appendChild(iconWrapper);
    header.appendChild(titleWrapper);
    header.appendChild(closeWrapper); // Create text element.

    var text = document.createElement('div');
    text.classList.add('info-hotspot-text');
    text.innerHTML = hotspot.text; // Place header and text into wrapper element.

    wrapper.appendChild(header);
    wrapper.appendChild(text); // Create a modal for the hotspot content to appear on mobile mode.

    var modal = document.createElement('div');
    modal.innerHTML = wrapper.innerHTML;
    modal.classList.add('info-hotspot-modal');
    document.body.appendChild(modal);

    var toggle = function toggle() {
      wrapper.classList.toggle('visible');
      modal.classList.toggle('visible');
    }; // Show content when hotspot is clicked.


    wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle); // Hide content when close icon is clicked.

    modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle); // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.

    stopTouchAndScrollEventPropagation(wrapper);
    return wrapper;
  } // Prevent touch and scroll events from reaching the parent element.


  function stopTouchAndScrollEventPropagation(element, eventList) {
    var eventList = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel', 'mousewheel'];

    for (var i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function (event) {
        event.stopPropagation();
      });
    }
  }

  function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === id) {
        return scenes[i];
      }
    }

    return null;
  }

  function findSceneDataById(id) {
    for (var i = 0; i < data.scenes.length; i++) {
      if (data.scenes[i].id === id) {
        return data.scenes[i];
      }
    }

    return null;
  } // Display the initial scene.


  switchScene(scenes[0]);
})();