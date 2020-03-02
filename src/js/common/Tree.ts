
import {TreeTextureManager} from './TreeTextureManager';
import { 
    Camera, 
    Scene,
    Sprite,
    SpriteMaterial
} from 'three';

export class Tree {

    spriteTextureManager: TreeTextureManager = new TreeTextureManager();

    pathArr: Array<string> = [];

    camera: Camera;

    scene: Scene;

    constructor(scene: Scene, camera: Camera) {

        this.camera = camera;
        this.scene = scene;
        
    }

   private async loadAllTreeTexture() {

        for(let i = 1; i <= 6; i++) {

            const path = `./asset/texture/plant/tree${i}_mobile.png`;
            this.pathArr[i]  = path;

             await this.spriteTextureManager.load(path);

        }

    }

   private addTreesToScene = () => {

       const texture = this.spriteTextureManager.show(this.pathArr[1],7,8)

         for(let x = 0; x < 100; x++){
             for(let z = 0; z < 100; z++) {

                //@ts-ignore
                 const mat = new SpriteMaterial({ map: texture, color: 0xffffff });
                 const sprite = new Sprite(mat);
                 sprite.position.set(2741-(x*3) , 0 ,-1315 + (z*3));
                 sprite.scale.set(3,3,1);
                 this.scene.add(sprite);

            }
         } 

    }

   public create(){

        const self = this;
        this.loadAllTreeTexture().then(()=>{
            self.addTreesToScene();
        });

    }

    update = (delta: number) => {



    }

}