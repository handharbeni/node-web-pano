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
var data = {
  scenes: [
    {
      id: "lobby",
      name: "Lobby",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 3072 }
      ],
      // preview: "{ cubeMapPreviewUrl: 'http://localhost:3000/assets/image/lobby/preview.jpg'}",
      preview: "preview.jpg",
      faceSize: 4096,
      initialViewParameters: { pitch: 0, yaw: 0, fov: Math.PI },
      linkHotspots: [
        {
            yaw: 0.76, 
            pitch: -0.052,
            rotation: 0,
            target: "booth",
            perspective: { radius: 0 }
        },
        {
            yaw: -0.80,
            pitch: -0.052,
            rotation: 0,
            target: "hall-of-fame",
            perspective: { radius: 0 }
        }
      ],
      infoHotspots: [
        {
            yaw: -0.013, 
            pitch: -0.052,
            rotation: 0,
            title: 'Hall Wisuda',
            text: 'On Progress',
            // target: "hall-wisuda",
            perspective: { radius: 0 }
        }
      ],
      externalLinkHostspot: [
        {
            yaw: 3.14,
            pitch: -0.0002,
            rotation: 0,
            target: "/",
            perspective: { radius: 900 }
        }
      ]
    },
    {
        id: "hall-wisuda",
        name: "Hall Wisuda",
        levels: [
          { tileSize: 256, size: 256, fallbackOnly: true },
          { tileSize: 512, size: 3072 }
        ],
        // preview: "{ cubeMapPreviewUrl: 'http://localhost:3000/assets/image/lobby/preview.jpg'}",
        preview: "preview.jpg",
        faceSize: 4096,
        initialViewParameters: { pitch: 0, yaw: 0, fov: Math.PI },
        linkHotspots: [
          {
            yaw: 0.79, 
            pitch: -0.002,
            rotation: 0,
            target: "hall-of-fame",
            perspective: { radius: 2640, extraTransforms: "rotateY(45deg)" },
          }
        ],
        infoHotspots: [],
        externalLinkHostspot: []
    },
    {
      id: "hall-of-fame",
      name: "Hall Of Fame",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 3072 }
      ],
      // preview: "{ cubeMapPreviewUrl: 'http://localhost:3000/assets/image/lobby/preview.jpg'}",
      preview: "preview.jpg",
      faceSize: 4096,
      initialViewParameters: { pitch: 0, yaw: 0, fov: Math.PI },
      linkHotspots: [
          {
              yaw: 3.29,
              pitch: -0.062,
              rotation: 0,
              target: "lobby",
              perspective: { radius: 0 },
          }
      ],
      infoHotspots: [],
      externalLinkHostspot: []
    },
    {
      id: "booth",
      name: "Booth",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 3072 }
      ],
      // preview: "{ cubeMapPreviewUrl: 'http://localhost:3000/assets/image/lobby/preview.jpg'}",
      preview: "preview.jpg",
      faceSize: 4096,
      initialViewParameters: { pitch: 0, yaw: 0, fov: Math.PI },
      linkHotspots: [
          {
              yaw: 3.59,
              pitch: -0.145,
              rotation: 0,
              target: "lobby",
              perspective: { radius: 1600 },
          }
      ],
      infoHotspots: [],
      externalLinkHostspot: []
    }
  ],
  name: "Virtual Tour PRASMUL",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: false,
    fullscreenButton: false,
    viewControlButtons: false
  }
};