import { Texture, TextureLoader, Vector2 } from "three";

export class TreeTextureManager {

    textureCache: Map<string, Texture> = new Map();

    public load = (path: string) => {

        let texture: Texture = this.textureCache.get(path);
        if (texture) {
            return texture;
        }

        const self = this;

        return new Promise((resolve, reject) => {

            let loader = new TextureLoader();
            texture = loader.load(
                path,
    
                texture => {
                    if (texture) {
                        self.textureCache.set(path, texture);
                    }

                    resolve(texture);
                },
    
                undefined,
    
                err => {
                    reject(err);
                });
        });
    }


    public get = (path: string) => {
        return this.textureCache.get(path);
    }

    //根据本项目精灵图的情况，x和y的取之限制在[1,8]区间
    public show = (name: string, x: number, y: number) => {

        const texture: Texture = this.textureCache.get(name);
        if (!texture) {
            console.error(`[TreeTextureManager.ts]: not found ${name}`)
            return;
        }

        const width = 512;
        const height = 512;
        const xCount = 8;
        const yCount = 8;
        const xUnit = (width / xCount) / width;
        const yUnit = (height / yCount) / height;


        if (x < 1 || x > xCount) throw "x轴偏移过大";
        if (y < 1 || y > yCount) throw "y轴偏移过大";

        const actualX = x - 1;
        const actualY = y - 1;
        const yOffset = yCount - y; //将Y轴坐标的值进行反转,让坐标原点从左下角变为在左上角

        texture.offset = new Vector2(actualX * xUnit, yOffset * yUnit);
        texture.repeat = new Vector2(xUnit, yUnit); //放大精灵图

        return texture;
    }



    dispose = () => {

        this.textureCache.clear();
        this.textureCache = null;

    }

}