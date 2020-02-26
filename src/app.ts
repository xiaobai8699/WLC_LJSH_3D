/*
 * @Author: Li Hong (lh.work@qq.com) 
 */

import {Clock} from 'three';
import {FPSControls} from './components/FPSControls/FPSControls'
import {Core} from './core/Core';
import {Loader} from './core/Loader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import {ThreeUtils} from './utils/ThreeUtils';
import * as Stats from 'stats.js';

export class App {

    core: Core = new Core();

    loader:Loader = new Loader();

    stats: Stats = new Stats();

    fpsControl: FPSControls = new FPSControls(this.core.scene,this.core.camera,this.core.renderer);

    clock: Clock = new Clock();

    start = ()=>{

        document.body.appendChild(this.stats.dom);

        this.core.renderer.setAnimationLoop(this.animationLoop);

        this.loadModel();
    }

    animationLoop = ()=>{

        this.stats.begin();
        this.fpsControl.update(this.clock.getDelta());
        this.core.renderer.render(this.core.scene, this.core.camera);
        this.stats.end();

    }

    loadModel = () => {

        this.loader.load(
            
            './asset/model/model.glb',

            true,

            undefined,

            (glft:GLTF)=>{

                this.core.scene.add(glft.scene);

               // ThreeUtils.cameraPositionToFit(this.core.camera, glft.scene);
            },


            (error:ErrorEvent)=>{

                console.error(error);

            });
    }
}

new App().start();