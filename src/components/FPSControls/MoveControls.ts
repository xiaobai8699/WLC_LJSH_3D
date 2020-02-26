
import {KeyboardState} from '../KeyboardState';
import {
    Object3D, 
    MeshStandardMaterial,
    BoxGeometry,        
    Mesh, 
    Scene } from 'three';

export class MoveControls {

    target: Object3D;

    private keyboardState: KeyboardState;

    public isMoving: boolean = false;

    constructor(scene?: Scene, target?: Object3D) {

        this.keyboardState = new KeyboardState();

        if(!target) {
            this.target = new Object3D();
            scene.add(this.target);
        }
    }

    public update = (delta: number) => {

        var speed = delta * 20;

        this.isMoving = false;
        
        if (this.keyboardState.pressed(KeyboardState.LEFT)) {

            this.isMoving = true;
            this.target.translateX(-speed);

        } 

        if (this.keyboardState.pressed(KeyboardState.RIGHT)) {

            this.isMoving = true;
            this.target.translateX(speed);

        }

        if (this.keyboardState.pressed(KeyboardState.FRONT)){

            this.isMoving = true;
            this.target.translateZ(-speed);

        } 

        if (this.keyboardState.pressed(KeyboardState.BACK))  {

            this.isMoving = true;
            this.target.translateZ(speed);

        }

    }


    public dispose = () => {

        this.keyboardState.dispose();

    }
}