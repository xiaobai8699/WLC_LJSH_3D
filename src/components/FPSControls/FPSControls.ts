
import {
    Scene,
    Camera,
    WebGLRenderer,
    Vector3,
    Object3D,
    Euler
}from 'three';
import {RotateControls} from './RotateControls';
import {MoveControls} from './MoveControls';

export class FPSControls {

    private rotateCameraControls: RotateControls;

    private rotateHeroControls: RotateControls;

    private moveControls: MoveControls;

    constructor (scene: Scene, camera: Camera, renderer: WebGLRenderer) {

        this.moveControls = new MoveControls(scene);

        this.rotateHeroControls = new RotateControls(this.moveControls.target, renderer.domElement);
        this.rotateHeroControls.disableXAxis = true;

        this.rotateCameraControls = new RotateControls(camera, renderer.domElement);
        this.rotateCameraControls.disableYAxis = true;

        this.moveControls.target.add(camera);

        this.moveControls.target.position.set(2741, 2, -1310);
        camera.position.set(0,0,0);

    }

    
    public update = (delta: number) => {

        this.moveControls.update(delta);
        this.rotateHeroControls.update(delta);
        this.rotateCameraControls.update(delta);

    }

    public dispose = () => {

        this.rotateCameraControls.dispose();
        this.moveControls.dispose();
    }
}