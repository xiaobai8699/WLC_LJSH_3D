
import * as THREE from 'three';
import { Asset } from './Asset';

export class Core {

    scene: THREE.Scene;

    camera: THREE.PerspectiveCamera;

    renderer: THREE.WebGLRenderer;

    constructor() {

        this.initSence();
        this.initCamera();
        this.initRenderer();
        this.addLights();

        window.addEventListener("resize", this.onWindowResize, false);
    }

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
        this.camera.far = 500;
        this.camera.aspect = window.innerWidth / window.innerHeight;

        this.camera.position.set(2741, 1.75, -1310);

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
        aLight.intensity = 1.2;
        this.scene.add(aLight);

        /*const dLigth = new THREE.DirectionalLight();
        dLigth.position.set(0, 60, 0);
        dLigth.intensity = 2;
        this.scene.add(dLigth);*/

    }

    onWindowResize = () => {

        const w = window.innerWidth;
        const h = window.innerHeight;

        this.renderer.setSize(w, h);

        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();

    }
}
