particlesJS('particles-js',
  {
    "particles" : {
        "number" : {
            "value": 40,    //粒子的数量
            "density": {    //粒子的稀密程度
                "enable": true,
                "value_area": 800
            }
        },
      "color": {  //粒子颜色 #b61924 {r:182, g:25, b:36}  {h:356, s:76, l:41}  ["#b61924", "#333333"] "random"
        "value": "random"
      },
      "shape": {  
        "type": "circle",  //粒子形状 circle edge triangle polygon star image
        "stroke": { //边框参数
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 6  //多边形边数
        },
        "image": {
          "src": "images/github.png",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.7,
        "random": false,
        "anim": {
          "enable": false,
          "speed": .1,
          "opacity_min": 0.1,
          "sync": true
        }
      },
      "size": {
        "value": 14, //节点大小
        "random": true,
        "anim": { //节点变化
          "enable": true,
          "speed": 1,
          "size_max": 14,
          "size_min": 10,
          "sync": false
        }
      },
      "line_linked": {  //连接线
        "enable": true,
        "distance": 100,//距离多少开始连接
        "color": "#aaa",
        "opacity": 1,
        "width": 1
      },
      "move": {    //移动效果
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": { //交互效果
      "detect_on": "window", //canvas window
      "events": {
        "onhover": {//鼠标交互效果
          "enable": true,
          "mode": "bubble" //  "grab" "bubble" "repulse" ["grab", "bubble"]
        },
        "onclick": {
          "enable": true,
          "mode": "bubble" //"push" "remove" "bubble" "repulse" ["push", "repulse"]
        },
        "resize": true
      },
      "modes": {//鼠标交互效果参数
        "grab": {
          "distance": 100,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 100,
          "size": 20,
          "duration": 2,
          "opacity": .5,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    }
    
  }
);