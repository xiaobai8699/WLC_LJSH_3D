/*
 * @Author: Li Hong (lh.work@qq.com) 
 */

export class KeyboardState {

    private modifiersSet: Set<String>;

    private keyCodeAliasMap: Map<String, number>;

    private modifiersPressedFlagMap: Map<String, boolean> = new Map();

    private keyCodePressedFlagMap: Map<number, boolean> = new Map();

    private static readonly ShiftKey = "shift";
    private static readonly CtrlKey = "ctrl";
    private static readonly AltKey = "alt";
    private static readonly MetaKey = "meat"; // 在Mac上对应command键

    public static readonly LEFT = "left";     // KCA 是 Key Code Alias的简写
    public static readonly RIGHT = "right";
    public static readonly FRONT = "front";
    public static readonly BACK = "back";

    constructor() {

        this.modifiersSet = new Set([
            KeyboardState.ShiftKey,
            KeyboardState.CtrlKey,
            KeyboardState.AltKey,
            KeyboardState.MetaKey]);

        this.keyCodeAliasMap = new Map();
        this.keyCodeAliasMap.set(KeyboardState.LEFT, 65); //A
        this.keyCodeAliasMap.set(KeyboardState.RIGHT, 68); //D
        this.keyCodeAliasMap.set(KeyboardState.FRONT, 87); //W
        this.keyCodeAliasMap.set(KeyboardState.BACK, 83); //S

        window.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('keyup', this.onKeyUp, false);

    }

    public dispose = () => {

        window.removeEventListener('keydown', this.onKeyDown, false);
        window.removeEventListener('keyup', this.onKeyUp, false);

    }

    private onKeyDown = (event: KeyboardEvent) => {

        event.preventDefault();
        this.onKeyChange(event, true);
    }

    private onKeyUp = (event: KeyboardEvent) => {

        this.onKeyChange(event, false);

    }

    private onKeyChange = (event: KeyboardEvent, isPressed: boolean) => {

        this.keyCodePressedFlagMap.set(event.keyCode, isPressed);

        this.modifiersPressedFlagMap.set(KeyboardState.ShiftKey, event.shiftKey);
        this.modifiersPressedFlagMap.set(KeyboardState.AltKey, event.altKey);
        this.modifiersPressedFlagMap.set(KeyboardState.CtrlKey, event.ctrlKey);
        this.modifiersPressedFlagMap.set(KeyboardState.MetaKey, event.metaKey);

    }

    // keyDesc, 格式为: [modifiers]+key,例如: shift+A,或 A 或 KeyboardState.LEFT
    public pressed = (keyDesc: string) => {

        var keyArr = keyDesc.split("+");

        for (let i = 0; i < keyArr.length; i++) {

            const key = keyArr[i];

            let isPressed: boolean = false;

            if (this.modifiersSet.has(key)) {

                isPressed = this.modifiersPressedFlagMap.get(key);

            } else if (this.keyCodeAliasMap.has(key)) {

                let keyCode: number = this.keyCodeAliasMap.get(key);
                isPressed = this.keyCodePressedFlagMap.get(keyCode);

            } else {

                let keyCode = key.charCodeAt(0);
                isPressed = this.keyCodePressedFlagMap.get(keyCode);

            }

            if (!isPressed) return false;
        }

        return true;

    }
}
