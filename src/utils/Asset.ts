/*
 * @Author: Li Hong (lh.work@qq.com) 
 * @Date: 2019-12-30 17:50:19 
 * @Last Modified by: Li Hong (lh.work@qq.com)
 * @Last Modified time: 2020-01-17 14:08:35
 */


export class Asset {

    static readonly path: string = "./asset/";

    static readonly nspLogName: string = "logo_D";

    static readonly audioUrl: string = `${Asset.path}audio/plws.mp3`;

    static readonly videoUrl: string = `${Asset.path}video/nsp_2020.01.20.mp4`; //注意：video标签会存在跨域播放的问题，视频须放在我们自己的服务器上

    static readonly logoUrl: string = `${Asset.path}image/others/nsplog.png`;


    static modelUrl(name: string): string {
        return `${Asset.path}model/${name}`
    }

    static staticVisitorUrl(name: string): string {

        return `${this.path}image/visitor/static/${name}.png`;
        
    }
    
    static dynamicVisitorUrl(name: string) {

        return `${this.path}image/visitor/dynamic/bigsize/${name}.png`;

    }

    static skyboxUrl(name: string) {

        return `${this.path}texture/skybox/letter/${name}.png`;

    }

    static mapUrl(name: string) {
        
        return `${this.path}image/map/${name}.png`;

    }

    static kepuUrl(name: string) {
        
        return `${this.path}image/kepu/${name}.png`;

    }
}
