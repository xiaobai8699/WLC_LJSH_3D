
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { ResourceTracker } from '../components/ResourceTracker';

export class Loader {

    resourceTrackerMap: Map<string, any> = new Map();

    load = (name: string, decompress: boolean = true, progress:any,success:Function, error:any ) => {

        const loader = new GLTFLoader();

        if (decompress) {

            const dracoLoader = new DRACOLoader().setDecoderPath('./js/lib/draco/');
            loader.setDRACOLoader(dracoLoader);

        }

        loader.load(

            name,

            (gltf: GLTF) => {

                const rt = new ResourceTracker();
                rt.track(gltf.scene);
                this.resourceTrackerMap.set(name, rt);

                success(gltf);
            },

            progress, // p means progress

            error  // e means error
        );

    }

    unload = (name: string) => {

        const rt: ResourceTracker = this.resourceTrackerMap.get(name);
        if (rt) {
            rt.dispose();
            this.resourceTrackerMap.delete(name);
        }

    }

}