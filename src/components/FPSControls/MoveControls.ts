
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
            const mat = new MeshStandardMaterial({color:0xFF0000});
            const geo = new BoxGeometry(1,1,1);
            this.target = new Mesh(geo, mat);
            scene.add(this.target);
        }
    }

    public update = (delta: number) => {

        var speed = delta * 20;

        if (this.keyboardState.pressed(KeyboardState.LEFT)) this.target.translateX(- speed);

        if (this.keyboardState.pressed(KeyboardState.RIGHT)) this.target.translateX(speed);

        if (this.keyboardState.pressed(KeyboardState.FRONT)) this.target.translateZ(- speed);

        if (this.keyboardState.pressed(KeyboardState.BACK))  this.target.translateZ(speed);

    }


    public dispose = () => {

        this.keyboardState.dispose();

    }
}