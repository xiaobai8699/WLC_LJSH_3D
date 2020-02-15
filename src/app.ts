
import * as THREE from 'three';
import { Asset } from './utils/Asset';
import {FPSControls} from './components/FPSControls/FPSControls';

export class App {

    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;

    renderer: THREE.WebGLRenderer;

    fpsControls: FPSControls;

    clock: THREE.Clock;

    initSence = () => {

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load(
            [
                Asset.skyboxUrl('px'),
                Asset.skyboxUrl('nx'),
                Asset.skyboxUrl('py'),
                Asset.skyboxUrl('ny'),
                Asset.skyboxUrl('pz'),
                Asset.skyboxUrl('nz')
            ]
        );

        this.scene = new THREE.Scene();
        this.scene.background = texture;
    }

    initCamera = () => {

        this.camera = new THREE.PerspectiveCamera();
        this.camera.near = 0.1;
        this.camera.far = 64;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.position.set(0, 1.6, 0);
        this.scene.add(this.camera);

    }

    initRenderer = () => {
        const canvas: HTMLCanvasElement = document.querySelector("#app");
        const opt = {
            canvas,
            antialias: true,
            logarithmicDepthBuffer: true,
            autoUpdate: false
        };
        this.renderer = new THREE.WebGLRenderer(opt);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    addLights = () => {

        let aLight = new THREE.AmbientLight("#FFFFFF");
        aLight.intensity = 1.5;
        this.scene.add(aLight);

        const dLigth = new THREE.DirectionalLight();
        dLigth.position.set(0, 6, 0);
        this.scene.add(dLigth);

    }

    start = () => {
        this.initSence();
        this.initCamera();
        this.initRenderer();
        this.addLights();

        const mat = new THREE.MeshStandardMaterial({color:0xff0000});
        mat.wireframe = true;
        const geo = new THREE.BoxGeometry(1,1,1);
        const mesh = new THREE.Mesh(geo, mat);

        mesh.position.set(0,0.5,-8);
        this.scene.add(mesh);


        this.fpsControls = new FPSControls(this.camera,this.renderer.domElement);
    //  this.fpsControls.constrainVertical = true;
    //     this.fpsControls.verticalMin = THREE.MathUtils.degToRad(135);
    //     this.fpsControls.verticalMax = THREE.MathUtils.degToRad(45);
        this.clock = new THREE.Clock();

        this.renderer.setAnimationLoop(this.animationLoop);
    }

    animationLoop = () => {
        this.fpsControls.update(this.clock.getDelta());
        this.renderer.render(this.scene, this.camera);
    }
}

new App().start();