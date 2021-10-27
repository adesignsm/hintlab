var scene, mouse, camera, renderer, controls;
var model1, model2;
var DISC;

var track = new Audio("test.mp3");

var viewport_mobile = window.matchMedia("(max-width: 600px)");
var viewport_desktop = window.matchMedia("(min-width:1025px)");
var resolution_trig; //1 = desktop || 0 = mobile

var nav_list = document.getElementById("nav-list");

window.onload = function() {

    track.load();

    if (viewport_mobile.matches) {

        console.log("mobile");
        camera.position.x = 160;
        camera.position.y = -30;
        camera.position.z = 270;

        document.removeEventListener("mousemove", onMouseMove, false);

        controls.target = new THREE.Vector3(-10, -30, 0);
        controls.update();

        nav_list.children[5].remove();

    } else if (viewport_desktop.matches) {

        // document.addEventListener("mousemove", onMouseMove, false);

        //move 3d model closer to camera
        console.log("desktop");
        camera.position.x = 45;
        camera.position.y = -30;
        camera.position.z = 80; //brings closer to camera

        controls.target = new THREE.Vector3(-10, -30, 0); //x y z
        controls.update();

        //DOM stuff: NAV MENU
        console.log(nav_list.children);

        //change inner text
        //remove an li element
        nav_list.children[2].innerHTML = "SHOP";
        nav_list.children[3].innerHTML = "ABOUT";
        nav_list.children[4].innerHTML = "SEARCH";
        nav_list.children[5].innerHTML = "SHOPPING BAG(0)";
        nav_list.children[1].remove();

        //add hintlab link title
    }
}

function onMouseMove(event) {

    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;

    camera.position.x = (mouseX - camera.position.x) * 0.05;
    camera.position.y = (mouseY - camera.position.y) * 0.05;

    mouse.x = (event.clientX / window.innerWidth) * 2 + 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

    camera.updateProjectionMatrix();
}   

init();
animate();

function init() {

    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xcccccc));

    mouse = new THREE.Vector3();

    camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 1, 10000);

    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById("hero-canvas-container").appendChild(renderer.domElement);

    window.addEventListener("resize", function() {

        var width = window.innerWidth;
        var height = window.innerHeight;

        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    const light = new THREE.PointLight(0xffffff, 0.5, 100);
    light.position.set(-15, 15, 50);
    scene.add( light );

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.enablePan = true;
    controls.enableRotate = true;
    controls.zoomSpeed = 0.3;

    var loader = new THREE.FBXLoader();

    loader.load("./assets/models/VERSION_3.fbx", function(model1) {

        model1.rotation.x = 5.2;
        model1.rotation.y = 1.5;
        model1.rotation.z = -0.05;

        model1.position.y = 25;
        model1.position.x = -10;

        scene.add(model1);

        model1.applyMatrix(new THREE.Matrix4().makeScale(1, -1, 1));

        loader.load("./assets/models/CD_DISC.fbx", function(model2) {

            model2.position.y = 17;
            model2.position.x = 0;
            model2.position.z = 23;
            model1.add(model2);

            model2.name = "DISC";

            DISC = model2;
        });

    }, undefined, function(error) {

        console.error(error);
    });
}

function animate() {

    requestAnimationFrame(animate);
    render();
};

var render_trig = render();
var DISC_flag = 0;
var DISC_SPEED;
var interval_timer;

function render() {

    if (viewport_mobile.matches) {

        controls.minDistance = 120;
        controls.update();
        controls.zoomIn();
    }

    renderer.render(scene, camera);

    function DISC_ROTATE() {

        setInterval(function() {

            DISC.rotation.y += DISC_SPEED;

        }, interval_timer);
    }

    return {
        DISC_ROTATE: DISC_ROTATE
    };
};

document.getElementById("controls-play-pause").addEventListener("mouseup", function(event) {

    if (DISC_flag == 0) {

        track.play();

        interval_timer = 15;
        DISC_SPEED = 0.02;
        render_trig.DISC_ROTATE();

        DISC_flag = 1;

        document.getElementById("controls-play-pause").innerHTML = "PAUSE MIX";
    
    } else if (DISC_flag == 1) {

        track.pause();
        
        interval_timer = 10000000;
        DISC_SPEED = 0;
        DISC_flag = 0;

        document.getElementById("controls-play-pause").innerHTML = "PLAY MIX";
    }

    console.log(DISC_SPEED);
});

$(document).ready(function(){

    $(".hamburger").click(function(){

      $(this).toggleClass("is-active");
    });
});

//MENU animations

var menu_flag = 0;

$("#menu-icon").on("click", function() {

    if (menu_flag == 0) {

        $("nav").stop().animate({top: "10px"}, 500);
        $("#nav-bar").stop().animate({top: "112px"}, 500);
        $("#opacity").fadeIn(450);
        
        $('body, html').css("overflow-y", "hidden");

        menu_flag = 1;
    
    } else if (menu_flag == 1) {

        $("nav").stop().animate({top: "-100px"}, 500);
        $("#nav-bar").stop().animate({top: "0px"}, 500);
        $("#opacity").fadeOut(450);
        
        $('body, html').css("overflow-y", "scroll");
        
        menu_flag = 0;
    }
});