/*
 * @Author: Li Hong (lh.work@qq.com) 
 */

import {
    Camera,
    Euler,
    MathUtils,
    Object3D,
    Vector3,
} from 'three';

import {MouseState} from '../MouseState';

export class RotateControls {

    public target: Object3D;
    private domElement: HTMLElement;

    mouseState: MouseState;

    constructor(target: Object3D, domElement: HTMLElement) {

        this.target = target;
        this.domElement = domElement;

        this.mouseState = new MouseState(domElement);
        this.mouseState.onMouseDown = this.onMouseDown;
        this.mouseState.onMouseUp = this.onMouseUp;
        this.mouseState.onMouseMove = this.onMouseMove;

    }

    private euler: Euler = new Euler(0, 0, 0, "YXZ");

    private mouseDragOn: boolean = false;

    private startTime: number = 0;
    private startEuler: Euler = new Euler(0, 0, 0, "YXZ");

    private startMouseX: number = 0;
    private rotatedRad: number = 0;
    private rotateSpeed: number = 0.0;

    public disableYAxis: boolean = false;
    public disableXAxis: boolean = false;

    private onMouseDown = (event: MouseEvent) => {

        // this.domElement.focus();

        event.preventDefault();
        event.stopPropagation();

        this.mouseDragOn = true;

        this.rotatedRad = 0;
        this.rotateSpeed = 0;

        this.startTime = Date.now();
        this.startEuler.setFromQuaternion(this.target.quaternion);

        this.startMouseX = event.pageX - this.domElement.offsetLeft - (this.domElement.offsetWidth / 2);

    };

    public isRotating: boolean = false;

    private endMouseX: number = 0;

    private onMouseUp = (event: MouseEvent) => {

        event.preventDefault();
        event.stopPropagation();

        this.mouseDragOn = false;

        this.endMouseX = event.pageX - this.domElement.offsetLeft - (this.domElement.offsetWidth / 2);

        this.isRotating = false;

        this.calculateSpeed();

    }

    public minXRotate = MathUtils.degToRad(-45);
    public maxXRotate = MathUtils.degToRad(45);

    private onMouseMove = (event: any) => {

        if (!this.mouseDragOn) return;

        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        this.euler.setFromQuaternion(this.target.quaternion);

        if(!this.disableYAxis) {
            this.euler.y -= movementX * 0.002;
        }
        
        if(!this.disableXAxis) {
            this.euler.x -= movementY * 0.002;
            this.euler.x = Math.max(this.minXRotate, Math.min(this.maxXRotate, this.euler.x));
        }

        this.target.quaternion.setFromEuler(this.euler);

        this.isRotating = true;
    }

    private isRotateLeft: boolean = false;

    private calculateSpeed = () => {

        const endEuler = new Euler(0, 0, 0, "YXZ");
        endEuler.setFromQuaternion(this.target.quaternion);
        const start = this.startEuler.y;
        const end = endEuler.y;

        this.isRotateLeft = this.startMouseX > this.endMouseX;

        if (this.isRotateLeft) {

            if (start >= 0 && end >= 0) {
                this.rotatedRad = end - start;

            }
            else if (start >= 0 && end < 0) {
                this.rotatedRad = (Math.PI - start) + (Math.PI - Math.abs(end));

            }
            else if (start < 0 && end < 0) {
                this.rotatedRad = Math.abs(start) - Math.abs(end);

            } else if (start < 0 && end >= 0) {
                this.rotatedRad = Math.abs(start) + end;

            }
        }
        else {

            if (start <= 0 && end < 0) {
                this.rotatedRad = Math.abs(end) - Math.abs(start);

            }
            else if (start <= 0 && end > 0) {
                this.rotatedRad = (Math.PI - Math.abs(start)) + (Math.PI - end);

            }
            else if (start > 0 && end > 0) {
                this.rotatedRad = start - end;

            } else if (start > 0 && end < 0) {
                this.rotatedRad = start + Math.abs(end);

            }
        }

        this.rotatedRad = Math.abs(this.rotatedRad);
        const duration = Date.now() - this.startTime;
        this.rotateSpeed = (this.rotatedRad / duration) * 2

    }

    public update = (delta: number) => {
        
        if (this.rotateSpeed > 0.001) {

            this.euler.setFromQuaternion(this.target.quaternion);

            this.rotateSpeed -= 0.0001;
            if (this.isRotateLeft) {
                this.euler.y += this.rotateSpeed
            } else {
                this.euler.y -= this.rotateSpeed;
            }
            this.target.quaternion.setFromEuler(this.euler);

            this.isRotating = true;

        }else if(!this.mouseDragOn) {

            this.isRotating = false;
        }
    }

    public dispose = () => {

        this.mouseState.dispose();

    }
}