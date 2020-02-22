
import {Clock} from 'three';
import {FPSControls} from './components/FPSControls/FPSControls';
import {Core} from './core/Core';
import {Loader} from './core/Loader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import {ThreeUtils} from './utils/ThreeUtils';
import * as Stats from 'stats.js';

export class App {

    core: Core = new Core();

    loader:Loader = new Loader();

    stats: Stats = new Stats();

    fpsControl: FPSControls = new FPSControls(this.core.camera, this.core.renderer.domElement);

    clock: Clock = new Clock();

    start = ()=>{

        document.body.appendChild(this.stats.dom);

        this.core.renderer.setAnimationLoop(this.animationLoop);

        this.loader.load(
            
            './asset/model/model.glb',

            true,

            undefined,

            (glft:GLTF)=>{

                this.core.scene.add(glft.scene);

                console.log(`scene:${JSON.stringify(glft.scene.position)}`)
               // ThreeUtils.cameraPositionToFit(this.core.camera, glft.scene);
            },


            (error:ErrorEvent)=>{

                console.error(error);

            });
    }

    animationLoop = ()=>{

        this.stats.begin();
        this.fpsControl.update(this.clock.getDelta());
        this.core.renderer.render(this.core.scene, this.core.camera);
        this.stats.end();

        console.log(`${JSON.stringify(this.core.camera.position)}`);
    }
}

new App().start();