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
      lvl: 1,
      name: "Lobby",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 3072 }
      ],
      preview: "preview.jpg",
      faceSize: 4096,
      initialViewParameters: { pitch: 0, yaw: 0, fov: Math.PI },
      linkHotspots: [
        {
            yaw: 0.73,
            pitch: -0.002,
            rotation: 0,
            target: "hall-of-memory",
            perspective: { radius: 1200, extraTransforms: "rotateY(-45deg)" }
        },
        {
            yaw: -0.7,
            pitch: -0.002,
            rotation: 0,
            target: "hall-of-fame",
            perspective: { radius: 1200, extraTransforms: "rotateY(-45deg)" }
        },
        {
            yaw: 0, 
            pitch: -0.002,
            rotation: 0,
            target: 'hall-of-commencement',
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
      ],
      embedHotspot: [],
      menuEmbedHotspot: [],
      initialEmbed: []
    },
    {
        id: "hall-of-commencement",
        name: "Hall of Commencement",
        lvl: 1,
        levels: [
          { tileSize: 256, size: 256, fallbackOnly: true },
          { tileSize: 512, size: 3072 }
        ],
        preview: "preview.jpg",
        faceSize: 4096,
        initialViewParameters: { pitch: -0.27, yaw: 0, fov: Math.PI },
        linkHotspots: [
          {
            yaw: -3.119, 
            pitch: -0.017,
            rotation: 0.05,
            target: "lobby",
            perspective: { radius: 1500 },
          }
        ],
        infoHotspots: [],
        externalLinkHostspot: [],
        embedHotspot: [],
        initialEmbed: [
          {
            id: 'wisudaembed',
            icon: 'https://wisuda2020-prasetiyamulya.com/assets/icon/bumper.gif',
            // https://4t3mkldl.tinifycdn.com/assets/icon/info.png  
            // src: 'http://wisuda2020-prasetiyamulya.com/live-video',
            src: 'https://www.youtube.com/embed/2qnWslJHUV8?autoplay=0&rel=0&showinfo=0&modestbranding=1&enablejsapi=1&controls=1&playsinline=1&origin=http://www.wisuda2020-prasetiyamulya.com&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&showinfo=0',
            type: "youtube",
            yaw: -0.035, 
            pitch: -0.27,
            perspective: { radius: 2200, extraTransforms: "rotate(-0.5deg)" },
            target: "#"
          }
        ]
    },
    {
      id: "hall-of-fame",
      name: "Hall Of Fame",
      lvl: 1,
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 3072 }
      ],
      preview: "preview.jpg",
      faceSize: 4096,
      initialViewParameters: { pitch: 0, yaw: 0, fov: Math.PI },
      linkHotspots: [
          {
              yaw: -2.55,
              pitch: -0.062,
              rotation: 0,
              target: "lobby",
              perspective: { radius: 0 },
          }
      ],
      infoHotspots: [],
      externalLinkHostspot: [],
      embedHotspot: [],
      menuEmbedHotspot: [],
      initialEmbed: [
        {
          id: 'hofgallery',
          icon: 'https://wisuda2020-prasetiyamulya.com/assets/icon/icon-loker.jpeg',
          src: 'https://www.wisuda2020-prasetiyamulya.com/proxy/Welcome/loker',
          type: "web",
          yaw: 0, 
          pitch: 0.1,
          perspective: { radius: 1600},
          target: "#"
        }
      ]
    },
    {
      id: "hall-of-memory",
      name: "Hall of Memory",
      lvl: 1,
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 3072 }
      ],
      preview: "preview.jpg",
      faceSize: 4096,
      initialViewParameters: { pitch: 0, yaw: 0, fov: Math.PI },
      linkHotspots: [
          {
              yaw: -3.22,
              pitch: -0.045,
              rotation: 0,
              target: "lobby",
              perspective: { radius: 1600 },
          },
          {
            yaw: 2.2,
            pitch: -0.045,
            rotation: 0,
            target: "hall-of-memory-right",
            perspective: { radius: 1600 },
          },
          {
            yaw: 0,
            pitch: -0.045,
            rotation: 0,
            target: "hall-of-memory-front",
            perspective: { radius: 1600 },
          },
          {
            yaw: -2.2,
            pitch: -0.045,
            rotation: 0,
            target: "hall-of-memory-left",
            perspective: { radius: 1600 },
          }
      ],
      infoHotspots: [],
      externalLinkHostspot: [],
      embedHotspot: [],
      menuEmbedHotspot: [],
      initialEmbed: []
    },
    {
      id: "hall-of-memory-front",
      name: "Hall of Memory Front",
      lvl: 1,
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 3072 }
      ],
      preview: "preview.jpg",
      faceSize: 4096,
      initialViewParameters: { pitch: -0.27, yaw: 0, fov: Math.PI },
      linkHotspots: [
        {
          yaw: 2.6,
          pitch: -0.045,
          rotation: 0,
          target: "hall-of-memory-right",
          perspective: { radius: 1600 },
        },
        {
          yaw: -3.19,
          pitch: -0.045,
          rotation: 0,
          target: "hall-of-memory",
          perspective: { radius: 1600 },
        },
        {
          yaw: -2.6,
          pitch: -0.045,
          rotation: 0,
          target: "hall-of-memory-left",
          perspective: { radius: 1600 },
        }        
      ],
      infoHotspots: [],
      externalLinkHostspot: [],
      embedHotspot: [],
      menuEmbedHotspot: [],
      initialEmbed: [
        {
          id: 'hofgallery',
          icon: 'https://wisuda2020-prasetiyamulya.com/assets/icon/info.png',
          src: 'https://www.wisuda2020-prasetiyamulya.com/proxy/Welcome/galery',
          type: "web",
          yaw: 0, 
          pitch: -0.7,
          perspective: { radius: 600, extraTransforms: "rotate(-1deg)" },
          target: "#"
        }
      ]
    },
    {
      id: "hall-of-memory-left",
      name: "Hall of Memory Left",
      lvl: 1,
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 3072 }
      ],
      preview: "preview.jpg",
      faceSize: 4096,
      initialViewParameters: { pitch: 0, yaw: 0, fov: Math.PI },
      linkHotspots: [
        {
          yaw: -1.2,
          pitch: -0.045,
          rotation: 0,
          target: "hall-of-memory-right",
          perspective: { radius: 1600 },
        },
        {
          yaw: -0.7,
          pitch: -0.045,
          rotation: 0,
          target: "hall-of-memory",
          perspective: { radius: 1600 },
        },
        {
          yaw: -2.7,
          pitch: -0.045,
          rotation: 0,
          target: "hall-of-memory-front",
          perspective: { radius: 1600 },
        }      
      ],
      infoHotspots: [],
      externalLinkHostspot: [],
      embedHotspot: [],
      menuEmbedHotspot: [],
      initialEmbed: [
        {
          id: 'hofgallery',
          icon: 'https://wisuda2020-prasetiyamulya.com/assets/icon/info.png',
          src: 'https://www.wisuda2020-prasetiyamulya.com/proxy/Welcome/about',
          type: "web",
          yaw: 0, 
          pitch: 0.1,
          perspective: { radius: 600, extraTransforms: "rotate(-1deg)" },
          target: "#"
        }
      ]
    },
    {
      id: "hall-of-memory-right",
      name: "Hall of Memory Right",
      lvl: 1,
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 3072 }
      ],
      preview: "preview.jpg",
      faceSize: 4096,
      initialViewParameters: { pitch: 0, yaw: 0, fov: Math.PI },
      linkHotspots: [
        {
          yaw: 2.2,
          pitch: -0.045,
          rotation: 0,
          target: "hall-of-memory-left",
          perspective: { radius: 1600 },
        },
        {
          yaw: 1.2,
          pitch: -0.045,
          rotation: 0,
          target: "hall-of-memory",
          perspective: { radius: 1600 },
        },
        {
          yaw: -3,
          pitch: -0.045,
          rotation: 0,
          target: "hall-of-memory-front",
          perspective: { radius: 1600 },
        }             
      ],
      infoHotspots: [],
      externalLinkHostspot: [],
      embedHotspot: [],
      menuEmbedHotspot: [],
      initialEmbed: [
        {
          id: 'homgame',
          icon: 'https://wisuda2020-prasetiyamulya.com/assets/icon/icon-game.jpeg',
          src: 'https://wisuda2020-prasetiyamulya.com/game',
          type: "web",
          yaw: -0.002, 
          pitch: -0.002,
          perspective: { radius: 1100},
          target: "#"
        }
      ]
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