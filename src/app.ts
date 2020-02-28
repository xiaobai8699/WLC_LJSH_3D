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
    RGBAFormat
} from 'three';
import { FPSControls } from './js/components/FPSControls/FPSControls'
import { Core } from './js/common/Core';
import { Loader } from './js/common/Loader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as Stats from 'stats.js';

export class App {

    core: Core = new Core();

    loader: Loader = new Loader();

    stats: Stats = new Stats();

    fpsControl: FPSControls = new FPSControls(this.core.scene, this.core.camera, this.core.renderer);

    clock: Clock = new Clock();

    texture: Texture;

    start = () => {

        document.body.appendChild(this.stats.dom);


        this.loadModel();


        const scene = this.core.scene;
        const self = this;

        function makeSpriteCanvas(imageName: string) {

            const loader = new ImageLoader();
            loader.load(`./asset/texture/plant/${imageName}.png`, image => {

                const size = 512 / 8;

                const ctx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d');
                ctx.canvas.width = size;
                ctx.canvas.height = size;
                ctx.drawImage(image, 0, 6*size, size, size, 0, 0, size, size);

                self.texture = new DataTexture(ctx.getImageData(0, 0, size, size).data, size, size);

                const mat = new SpriteMaterial({ map: self.texture, color: 0xffffff });
                    const sprite = new Sprite(mat);
                    sprite.position.set(0,1,0);
                    //  sprite.scale.set(1, 1, 0);
                    scene.add(sprite);

                let now = Date.now();
                const count = 100;
                for(let x = -count/2; x < count/2; x++){
                    for(let y =0 ; y< count; y++) {
                        const mat = new SpriteMaterial({ map: self.texture, color: 0xffffff });
                    const sprite = new Sprite(mat);
                    sprite.position.set(x+2741 , y ,-1310);
                    //  sprite.scale.set(1, 1, 0);
                    scene.add(sprite);
                    }
                }
                console.log(`Time:${Date.now()-now}`);

            });

        }

        makeSpriteCanvas('tree1_mobile');
        this.core.renderer.setAnimationLoop(self.animationLoop);

    }

    animationLoop = () => {

        this.stats.begin();
        this.fpsControl.update(this.clock.getDelta());

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