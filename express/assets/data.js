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
      lvl: 2,
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
            yaw: 0.82,
            pitch: -0.052,
            rotation: 0,
            target: "booth",
            perspective: { radius: 1200, extraTransforms: "rotateY(-45deg)" }
        },
        {
            yaw: -0.82,
            pitch: -0.052,
            rotation: 0,
            target: "hall-of-fame",
            perspective: { radius: 1200, extraTransforms: "rotateY(-45deg)" }
        },
        {
            yaw: 0, 
            pitch: -0.052,
            rotation: 0,
            target: 'hall-wisuda',
            perspective: { radius: 800 }
        }
      ],
      infoHotspots: [],
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
        lvl: 1,
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
            yaw: -3.08, 
            pitch: -0.15,
            rotation: 0.05,
            target: "lobby",
            perspective: { radius: 1500},
          }
        ],
        infoHotspots: [],
        externalLinkHostspot: []
    },
    {
      id: "hall-of-fame",
      name: "Hall Of Fame",
      lvl: 1,
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
              yaw: 3.09,
              pitch: -0.062,
              rotation: 0,
              target: "lobby",
              perspective: { radius: 0 },
          }
      ],
      infoHotspots: [
        {
          yaw: 1.38,
          pitch: -0.045,
          rotation: 0,
          title: 'Fame 4',
          text: 'On Progress',
          // target: "hall-wisuda",
          perspective: { radius: 0 }
        },
        {
          yaw: 0.53,
          pitch: -0.045,
          rotation: 0,
          title: 'Fame 3',
          text: 'On Progress',
          // target: "hall-wisuda",
          perspective: { radius: 0 }
        },
        {
          yaw: -0.43,
          pitch: -0.045,
          rotation: 0,
          title: 'Fame 2',
          text: 'On Progress',
          // target: "hall-wisuda",
          perspective: { radius: 0 }
        },
        {
          yaw: -1.38,
          pitch: -0.045,
          rotation: 0,
          title: 'Fame 1',
          text: 'On Progress',
          // target: "hall-wisuda",
          perspective: { radius: 0 }
        }        
      ],
      externalLinkHostspot: []
    },
    {
      id: "booth",
      name: "Booth",
      lvl: 1,
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
              yaw: 3.53,
              pitch: -0.045,
              rotation: 0,
              target: "lobby",
              perspective: { radius: 1600 },
          },
      ],
      infoHotspots: [
        {
          yaw: 2.53,
          pitch: -0.045,
          rotation: 0,
          title: 'Booth 4',
          text: 'On Progress',
          // target: "hall-wisuda",
          perspective: { radius: 0 }
        },
        {
          yaw: 1.03,
          pitch: -0.045,
          rotation: 0,
          title: 'Booth 3',
          text: 'On Progress',
          // target: "hall-wisuda",
          perspective: { radius: 0 }
        },
        {
          yaw: -0.43,
          pitch: -0.045,
          rotation: 0,
          title: 'Booth 2',
          text: 'On Progress',
          // target: "hall-wisuda",
          perspective: { radius: 0 }
        },
        {
          yaw: -2.38,
          pitch: -0.045,
          rotation: 0,
          title: 'Booth 1',
          text: 'On Progress',
          // target: "hall-wisuda",
          perspective: { radius: 0 }
        }
      ],
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