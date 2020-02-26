/*
 * @Author: Li Hong (lh.work@qq.com) 
 */

import { 
    Clock,
    GridHelper ,
    MeshStandardMaterial,
    PlaneGeometry,
    Mesh,
    MathUtils} from 'three';
import { FPSControls } from './components/FPSControls/FPSControls'
import { Core } from './core/Core';
import { Loader } from './core/Loader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as Stats from 'stats.js';

export class App {

    core: Core = new Core();

    loader: Loader = new Loader();

    stats: Stats = new Stats();

    fpsControl: FPSControls = new FPSControls(this.core.scene, this.core.camera, this.core.renderer);

    clock: Clock = new Clock();

    start = () => {

        document.body.appendChild(this.stats.dom);

        this.core.renderer.setAnimationLoop(this.animationLoop);

        // this.loadModel();

        const groundMat =new MeshStandardMaterial({color:0xaaaaaa});
        const groundGeo = new PlaneGeometry(10000,10000);
        const groundMesh = new Mesh(groundGeo,groundMat);
        groundMesh.rotation.x = MathUtils.degToRad(-90);
        this.core.scene.add(groundMesh);

        function makeTreeInstance() {

        }
    }

    animationLoop = () => {

        this.stats.begin();
        this.fpsControl.update(this.clock.getDelta());

        // 用户移动或旋转才渲染，节省电量
        if(this.fpsControl.isActive()){
            this.core.renderer.render(this.core.scene, this.core.camera);
        }

        this.stats.end();

    }

    loadModel = () => {

        this.loader.load(

            './asset/model/model.glb',

            true,

            undefined,

            (glft: GLTF) => {

                this.core.scene.add(glft.scene);

                // ThreeUtils.cameraPositionToFit(this.core.camera, glft.scene);
            },


            (error: ErrorEvent) => {

                console.error(error);

            });
    }
}

new App().start();