import { newloadMesh, newloadPlane, newloadShape } from "../load"
import { THREE } from "../three"
import { Renderer } from "../renderer"
import { ResTab } from "../../util/res_mgr"

export class RendererModule {
	mesh: THREE.Mesh;

	map: THREE.Texture;
	geometry: THREE.BufferGeometry;


	constructor(config, renderer: Renderer, resTab: ResTab) {
		if (!config.meshRender) return;
		let geo = config.geometry;
		if (geo.type === "BufferGeometry") 
			this.mesh = newloadMesh(renderer, config.geometry, config.meshRender, resTab);
		else if (geo.type === "Plane") {
			this.mesh = newloadPlane(renderer, geo, config.meshRender, resTab);
		} else 
			this.mesh = newloadShape(renderer, geo, config.meshRender, resTab);
	}

	update() {
		if (this.geometry && this.map) {
			return true;
		}

		if (!this.geometry && this.mesh.geometry) {
			this.geometry = this.mesh.geometry;
		}

		if (!this.map && this.mesh.material && this.mesh.material[0].map) {
			this.map = this.mesh.material[0].map;
			if (! (this.map instanceof THREE.Texture) ) {
				this.map = undefined;
			}
		}
		
		return this.geometry && this.map;
	}
}