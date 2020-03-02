/*
 * @Author: Li Hong (lh.work@qq.com) 
 */

import {
    Clock,
    GridHelper,
    MeshStandardMaterial,
    PlaneGeometry,
    Mesh,
    MathUtils,
    TextureLoader,
    SpriteMaterial,
    Sprite,
    ImageLoader,
    CanvasTexture,
    Texture,
    DataTexture,
    RGBAFormat,
    Vector2
} from 'three';
import { FPSControls } from './js/components/FPSControls/FPSControls'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Core } from './js/common/Core';
import { Loader } from './js/common/Loader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import {TreeTextureManager} from './js/common/TreeTextureManager';
import {Tree} from './js/common/Tree';
import * as Stats from 'stats.js';

export class App {

    core: Core = new Core();

    loader: Loader = new Loader();

    stats: Stats = new Stats();

    // fpsControl: FPSControls = new FPSControls(this.core.scene, this.core.camera, this.core.renderer);

    orbitControls: OrbitControls = new OrbitControls(this.core.camera, this.core.renderer.domElement);

    clock: Clock = new Clock();

    texture: Texture;

    tree: Tree = null;

    constructor(){

        this.tree = new Tree(this.core.scene,this.core.camera);

    }

    async start() {

        document.body.appendChild(this.stats.dom);

        this.loadModel();
        this.tree.create();

        this.core.renderer.setAnimationLoop(this.animationLoop);

    }

    animationLoop = () => {

        this.stats.begin();
        // this.fpsControl.update(this.clock.getDelta());
        this.orbitControls.update();

        // 用户移动或旋转才渲染，节省电量
        // if (this.fpsControl.isActive()) {
        //     this.core.renderer.render(this.core.scene, this.core.camera);
        // }
        // this.texture.needsUpdate = true;
        this.core.renderer.render(this.core.scene, this.core.camera);
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