
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

    constructor(scene?: Scene, target?: Object3D) {

        this.keyboardState = new KeyboardState();

        if(!target) {
            this.target = new Object3D();
            scene.add(this.target);
        }
    }

    public update = (delta: number) => {

        var speed = delta * 20;

        if (this.keyboardState.pressed(KeyboardState.LEFT)) this.target.translateX(-speed);

        if (this.keyboardState.pressed(KeyboardState.RIGHT)) this.target.translateX(speed);

        if (this.keyboardState.pressed(KeyboardState.FRONT)) this.target.translateZ(-speed);

        if (this.keyboardState.pressed(KeyboardState.BACK))  this.target.translateZ(speed);

    }


    public dispose = () => {

        this.keyboardState.dispose();

    }
}