export type initFunction = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera)
	=> Promise<() => void>