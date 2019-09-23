/**
 * 
 */// tslint:disable-next-line:no-reference
/// <reference path="./babylon.d.ts"/>

export class Geometry extends BABYLON.Geometry {
    public dispose(): void {
        (<any>this.getScene().getEngine().constructor).loader.releaseGeometry(this.id + this.pi_indices);
    }
}