let scene_load = new THREE.Scene();
scene_load.background = new THREE.Color(0xffffff);
let camera_load = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera_load.position.z = 15;

let renderer_load = new THREE.WebGLRenderer({antialias: true});
renderer_load.shadowMap.enabled = true;
renderer_load.setSize(window.innerWidth, window.innerHeight);

document.getElementById("loading-page").appendChild(renderer_load.domElement);

window.addEventListener("resize", function() {

    let w = window.innerWidth;
    let h = window.innerHeight;

    renderer_load.setSize(w, h);

    camera_load.aspect = w / h;
    camera_load.updateProjectionMatrix();
});

var update = () => {

    logo.rotation.y += 0.008;
};

var render = () => {

    renderer_load.render(scene_load, camera_load);
};

var animate_load = () => {

    requestAnimationFrame(animate_load);

    update();
    render();
}

animate_load();