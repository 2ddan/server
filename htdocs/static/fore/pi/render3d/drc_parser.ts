import { CreateDecoderModule } from '../polyfill/drc_decoder';
import { Json } from '../lang/type';
import { THREE } from '../render3d/three';

let DecoderModule;
const decoderType = {};

export const decodeDrc = (rawBuffer: ArrayBuffer, attributeIdMap: Json, callback: Function, dracoDecoderType?: Json) => {
	attributeIdMap = attributeIdMap|| {};
	dracoDecoderType = dracoDecoderType?dracoDecoderType: decoderType;
	getDecoder(this, dracoDecoderType,(dracoDecoder) => {decodeDrcInternal(rawBuffer, attributeIdMap, dracoDecoder, callback);});
}

const decodeDrcInternal = (rawBuffer: ArrayBuffer, attributeIdMap: Json, dracoDecoder, callback) => {
	let buffer = new dracoDecoder.DecoderBuffer();
	buffer.Init(new Int8Array(rawBuffer), rawBuffer.byteLength);
	let decoder = new dracoDecoder.Decoder();
	let geometryType = decoder.GetEncodedGeometryType(buffer);
	if (geometryType !== dracoDecoder.TRIANGULAR_MESH) {
	  throw "drc_loader: 类型不支持";
	} 
	callback(convertDracoGeometryTo3JS(dracoDecoder, decoder,
		geometryType, buffer, attributeIdMap));
}

const addAttributeToGeometry = (geometry: THREE.BufferGeometry, name: string, attribute, attributeData, numPoints) => {
	if (attribute.ptr === 0) 
		throw 'THREE.DRACOLoader: No attribute ' + name;
	const numComponents = attribute.num_components();
	const numValues = numPoints * numComponents;
	let buffer;
	
	buffer = new Float32Array(numValues);
	if(name === "skinIndex")
		for (var i = 0; i < numValues; i++) {	
				buffer[i] = Math.round(attributeData.GetValue(i));//skinIndex应该是整数
		}
	else{
		for (var i = 0; i < numValues; i++) {	
			buffer[i] = attributeData.GetValue(i);
		}	
	}
	geometry.addAttribute(name, new THREE.BufferAttribute(buffer, numComponents));
}

const convertDracoGeometryTo3JS = (dracoDecoder, decoder, geometryType, buffer, attributeIdMap) => {
	const start_time = performance.now();
	const dracoGeometry = new dracoDecoder.Mesh();
	const decodingStatus = decoder.DecodeBufferToMesh(buffer, dracoGeometry);
	if (!decodingStatus.ok() || dracoGeometry.ptr == 0){
		dracoDecoder.destroy(decoder);
		dracoDecoder.destroy(dracoGeometry);
		throw 'THREE.DRACOLoader: Decoding failed: ' + decodingStatus.error_msg();
	}
	const decode_end = performance.now();

	dracoDecoder.destroy(buffer);
	const numFaces = dracoGeometry.num_faces();
	const numPoints = dracoGeometry.num_points();
	let attributeData, attribute, geometry = new THREE.BufferGeometry();;
	
	for (let name in attributeIdMap) {
		attribute = decoder.GetAttribute(dracoGeometry, attributeIdMap[name]);
		attributeData = new dracoDecoder.DracoFloat32Array();
		decoder.GetAttributeFloatForAllPoints(dracoGeometry, attribute, attributeData);
		addAttributeToGeometry(geometry, name, attribute, attributeData, numPoints);
		dracoDecoder.destroy(attributeData);
	}

	const numIndices = numFaces * 3;
	let indexBuffer, ia, firstIndex;
	indexBuffer = new Uint32Array(numIndices);
	ia = new dracoDecoder.DracoInt32Array();
	for (var i = 0; i < numFaces; ++i) {
		decoder.GetFaceFromMesh(dracoGeometry, i, ia);
		firstIndex = i * 3;
		indexBuffer[firstIndex] = ia.GetValue(0);
		indexBuffer[firstIndex + 1] = ia.GetValue(1);
		indexBuffer[firstIndex + 2] = ia.GetValue(2);
	}
	dracoDecoder.destroy(ia);
	if(numIndices < 65536){
		let temp = indexBuffer;
		indexBuffer = new Uint16Array(temp.length);
		for(let i = 0; i < temp.length; i++){
			indexBuffer[i] = temp[i];
		}
	}
	geometry.setIndex(new THREE.BufferAttribute(indexBuffer, 1));

	dracoDecoder.destroy(decoder);
	dracoDecoder.destroy(dracoGeometry);

	console.log('Decode time: ' + (decode_end - start_time));
	console.log('Import time: ' + (performance.now() - decode_end));
	return geometry;
}

const getDecoder = (function() {
	let decoder;
	let decoderCreationCalled = false;
	return function(dracoDecoder, dracoDecoderType, loadCallback) {
		if (typeof decoder !== 'undefined') {
			// Module already initialized.
			if (typeof loadCallback !== 'undefined') {
				loadCallback(decoder);
			}
		}else {
			decoderCreationCalled = true;
			dracoDecoderType['onModuleLoaded'] = (module) => {
				decoder = module;
				loadCallback(decoder);
			}
			DecoderModule = CreateDecoderModule(dracoDecoderType);
		}
    };
})();
