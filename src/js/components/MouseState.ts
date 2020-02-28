
export class MouseState {

    private domElement: any = null;

    public onMouseDown: Function;

    public onMouseUp: Function;

    public onMouseMove: Function;

    constructor (domElement: HTMLElement) {

        this.domElement = domElement ? domElement : document;
        
        this.addEventListener();

    }

    private mouseDown = (e: MouseEvent) => {

        if(this.onMouseDown) {
            this.onMouseDown(e);
        }

    }

    private mouseUp = (e: MouseEvent) => {

        if(this.onMouseUp) {
            this.onMouseUp(e);
        }

    }

    private mouseMove = (e: MouseEvent) => {

        if(this.onMouseMove) {
            this.onMouseMove(e);
        }

    }

    private contextmenu = (event: MouseEvent) => {

        event.preventDefault();

    }

    private addEventListener = () => {

        this.domElement.addEventListener('contextmenu', this.contextmenu, false);
        this.domElement.addEventListener('mousemove', this.mouseMove, false);
        this.domElement.addEventListener('mousedown', this.mouseDown, false);
        this.domElement.addEventListener('mouseup', this.mouseUp, false);

    }

    public dispose = () => {

        this.domElement.removeEventListener('contextmenu', this.contextmenu, false);
        this.domElement.removeEventListener('mousedown', this.mouseDown, false);
        this.domElement.removeEventListener('mousemove', this.mouseMove, false);
        this.domElement.removeEventListener('mouseup', this.mouseUp, false);

    }
}