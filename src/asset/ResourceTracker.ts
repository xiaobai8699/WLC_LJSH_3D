
import {
    Object3D,
    Mesh,
    Material,
    Texture
} from 'three';

export class ResourceTracker {

    resources: Set<any>;

    constructor(){
        this.resources = new Set();
    }

    track = (resource: any) => {

        if(!resource){
            return;
        }

        // 处理children属性和material是数组的情况
        if(Array.isArray(resource)){

            resource.forEach(res => this.track(res));
            return resource;

        }

        if(resource.dispose || resource instanceof Object3D){
            this.resources.add(resource);
        }

        if(resource instanceof Object3D) {
            this.resources.add(resource.children);
        }

        if(resource instanceof Mesh) {

            this.resources.add(resource.geometry);
            this.resources.add(resource.material);

        } else if(resource instanceof Material) {

            // 材质拥有多种纹理，需遍历后，跟中材质的所有纹理
            for(const value of Object.values(resource)){

                if(value instanceof Texture){
                    this.track(value);
                }
            }

            const res = <any>resource; // 忽略ts类型检查
            if(res.uniforms){
                for(const value of res.uniforms){
                    if(value){
                        const uniformValue = value.value;
                        if(uniformValue instanceof Texture || Array.isArray(uniformValue)){
                            this.track(uniformValue);
                        }
                    }
                }
            }
        }

        return resource;

    }

    untrack(resource: any){
        this.resources.delete(resource);
    }

    dispose = ()=> {

        for(const resource of this.resources){
            
            if(resource instanceof Object3D){
                if(resource.parent){
                    resource.parent.remove(resource);
                }
            }

            if(resource.dispose){
                resource.dispose();
            }
        }

        this.resources.clear();
    }
}