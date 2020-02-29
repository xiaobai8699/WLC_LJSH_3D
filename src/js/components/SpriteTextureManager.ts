import { Texture, TextureLoader, Vector2 } from "three";

export class SpriteTextureManager {

    textureMap: Map<string, Texture> = new Map();

    public load = (name: string) => {

        const self = this;

        return new Promise((resolve, reject) => {

            const texture: Texture = self.textureMap.get(name);
            if (texture) {
                resolve(texture);

            } else {

                var loader = new TextureLoader();
                loader.load(

                    `./asset/texture/plant/${name}.png`,

                    function (texture) {
                        self.textureMap.set(name, texture);
                        resolve(texture);
                    },

                    undefined,

                    function (err) {
                        reject(err);
                        console.error(`[SpriteTextureManager] An error happened: ${JSON.stringify(err)}`);
                    }
                );

            }

        });
    }


    //根据本项目精灵图的情况，x和y的取之限制在[1,8]区间
    public show = (name: string, x: number, y: number) => {

        const texture: Texture = this.textureMap.get(name);
        if (!texture) {
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

    }



    dispose = () => {

        this.textureMap.clear();
        this.textureMap = null;

    }

}