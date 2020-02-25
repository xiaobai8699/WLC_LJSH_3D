/*
 * @Author: Li Hong (lh.work@qq.com) 
 */

import {
    Camera,
    Euler,
    MathUtils,
} from 'three';

import {KeyboardState} from './KeyboardState';

export class FPSControls {

    private camera: Camera;
    private domElement: HTMLElement;

    private keyboardState: KeyboardState = new KeyboardState();

    constructor(camera: Camera, domElement: HTMLElement) {

        this.camera = camera;
        this.domElement = domElement;

        this.addEventListener();
    }

    private euler: Euler = new Euler(0, 0, 0, "YXZ");

    private mouseDragOn: boolean = false;

    private startTime: number = 0;
    private startEuler: Euler = new Euler(0, 0, 0, "YXZ");

    private startMouseX: number = 0;
    private rotatedRad: number = 0;
    private rotateSpeed: number = 0.0;

    private onMouseDown = (event: MouseEvent) => {

        // this.domElement.focus();

        event.preventDefault();
        event.stopPropagation();

        this.mouseDragOn = true;

        this.rotatedRad = 0;
        this.rotateSpeed = 0;

        this.startTime = Date.now();
        this.startEuler.setFromQuaternion(this.camera.quaternion);

        this.startMouseX = event.pageX - this.domElement.offsetLeft - (this.domElement.offsetWidth / 2);

    };

    private endMouseX: number = 0;

    private onMouseUp = (event: MouseEvent) => {

        event.preventDefault();
        event.stopPropagation();

        this.mouseDragOn = false;

        this.endMouseX = event.pageX - this.domElement.offsetLeft - (this.domElement.offsetWidth / 2);

        this.continueMovement();

    }

    private isRotateLeft: boolean = false;

    private continueMovement = () => {

        const endEuler = new Euler(0, 0, 0, "YXZ");
        endEuler.setFromQuaternion(this.camera.quaternion);
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

    private minXRotate = MathUtils.degToRad(0);
    private maxXRotate = MathUtils.degToRad(20);

    private onMouseMove = (event: any) => {

        if (!this.mouseDragOn) return;

        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        this.euler.setFromQuaternion(this.camera.quaternion);

        this.euler.y -= movementX * 0.002;
        this.euler.x -= movementY * 0.002;

        this.euler.x = Math.max(this.minXRotate, Math.min(this.maxXRotate, this.euler.x));

        this.camera.quaternion.setFromEuler(this.euler);

    }


    public movementSpeed: number = 20;

    public update = (delta: number) => {

        var actualMoveSpeed = delta * this.movementSpeed;

        if (this.keyboardState.pressed(KeyboardState.LEFT)) this.camera.translateX(- actualMoveSpeed);
        if (this.keyboardState.pressed(KeyboardState.RIGHT)) this.camera.translateX(actualMoveSpeed);
        if (this.keyboardState.pressed(KeyboardState.FRONT)) this.camera.translateZ(- actualMoveSpeed);
        if (this.keyboardState.pressed(KeyboardState.BACK)) this.camera.translateZ(actualMoveSpeed);
    
        if (this.rotateSpeed > 0.001) {

            this.euler.setFromQuaternion(this.camera.quaternion);

            this.rotateSpeed -= 0.0001;
            if (this.isRotateLeft) {
                this.euler.y += this.rotateSpeed 
            } else {
                this.euler.y -= this.rotateSpeed;
            }
            this.camera.quaternion.setFromEuler(this.euler);
        }

    }


    private contextmenu = (event: MouseEvent) => {

        event.preventDefault();

    }

    private addEventListener = () => {

        this.domElement.addEventListener('contextmenu', this.contextmenu, false);
        this.domElement.addEventListener('mousemove', this.onMouseMove, false);
        this.domElement.addEventListener('mousedown', this.onMouseDown, false);
        this.domElement.addEventListener('mouseup', this.onMouseUp, false);
    }

    public dispose = () => {

        this.domElement.removeEventListener('contextmenu', this.contextmenu, false);
        this.domElement.removeEventListener('mousedown', this.onMouseDown, false);
        this.domElement.removeEventListener('mousemove', this.onMouseMove, false);
        this.domElement.removeEventListener('mouseup', this.onMouseUp, false);

    }
}