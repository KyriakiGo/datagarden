// function webgl_detect(return_context)
// {
//     if (!!window.WebGLRenderingContext) {
//         var canvas = document.createElement("canvas"),
//              names = ["webgl2", "webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
//            context = false;
//
//         for(var i=0;i< names.length;i++) {
//             try {
//                 context = canvas.getContext(names[i]);
//                 if (context && typeof context.getParameter == "function") {
//                     // WebGL is enabled
//                     if (return_context) {
//                         // return WebGL object if the function's argument is present
//                         return {name:names[i], gl:context};
//                     }
//                     // else, return just true
//                     return true;
//                 }
//             } catch(e) {}
//         }
//
//         // WebGL is supported, but disabled
//         return false;
//     }
//
//     // WebGL not supported
//     return false;
// }

AFRAME.registerComponent('model-opacity', {
  schema: {default: 1.0},
  init: function () {
    this.el.addEventListener('model-loaded', this.update.bind(this));
  },
  update: function () {
    var mesh = this.el.getObject3D('mesh');
    var data = this.data;
    if (!mesh) { return; }
    mesh.traverse(function (node) {
      if (node.isMesh) {
        node.material.opacity = data;
        node.material.transparent = data < 1.0;
        node.material.needsUpdate = true;
      }
    });
  }
});

AFRAME.registerComponent('fade-time', {
  schema: {default: 1000},
});


// Setup for a-frame
AFRAME.registerComponent('samplehandler', {
    init: function () {
        console.log("samplehandler init...")
        let marker = this.el;
        //let marker = this.el.sceneEl;

        marker.addEventListener('markerFound', function () {
          //if
          var text = document.querySelector("#text");
            var model = document.querySelector("#flower");
            var opacity = model.getAttribute('model-opacity');
            var fade = model.getAttribute('fade-time');
            console.log("Opacity "+opacity);
            if(opacity==0){
            // if(model)
            console.log("markerFound...");
            // var model = document.querySelector("#flower");
            text.emit('fade-in');
            model.emit('fade-in')
            console.log("visiblity  true");
            setTimeout(() => {
            model.emit('fade-out')
            text.emit('fade-out');
  console.log("visiblity  false");
}, fade)
};
console.clear()
        }.bind(this));

        marker.addEventListener('markerLost', function() {
            console.log("markerLost...");
            console.clear()
        }.bind(this));
    }
});




window.onload = function() {
    console.log("window loaded...");
};



// var m = document.querySelector("a-nft")
// m.addEventListener("markerFound", (e)=>{
//    console.log("found")
// })
//
// m.addEventListener("markerLost", (e)=>{
//    console.log("lost")
// })
