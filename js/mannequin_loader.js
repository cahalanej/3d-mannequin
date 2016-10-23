var config = {};
config.mannequinLoader = {
	root: {
		name: 'root',
		parent: '',
		file_path: 'root.obj',
		positionX: 0,
		positionY: 24.279,
		positionZ: 0,
		is_joint: true
	},
	pelvis: {
		name: 'pelvis',
		parent: 'root',
		file_path: 'pelvis.obj',
		positionX: 0,
		positionY: -3.06,
		positionZ: 0,
		is_joint: false
	},
	torso: {
		name: 'torso',
		parent: 'root',
		file_path: 'torso.obj',
		positionX: 0,
		positionY: 4.135,
		positionZ: 0,
		is_joint: false
	},
	neck: {
		name: 'neck',
		parent: 'torso',
		file_path: 'neck.obj',
		positionX: 0,
		positionY: 4.225,
		positionZ: 0,
		is_joint: true
	},
	head: {
		name: 'head',
		parent: 'neck',
		file_path: 'head.obj',
		positionX: 0,
		positionY: 3.82,
		positionZ: 0,
		is_joint: false
	},
	left_shoulder: {
		name: 'left_shoulder',
		parent: 'torso',
		file_path: 'left_shoulder.obj',
		positionX: 4.145,
		positionY: 1.785,
		positionZ: 0,
		is_joint: true
	},
	left_upper_arm: {
		name: 'left_upper_arm',
		parent: 'left_shoulder',
		file_path: 'left_upper_arm.obj',
		positionX: 0.375,
		positionY: -3.845,
		positionZ: 0,
		is_joint: false
	},
	left_elbow: {
		name: 'left_elbow',
		parent: 'left_upper_arm',
		file_path: 'left_elbow.obj',
		positionX: 0,
		positionY: -3.7,
		positionZ: 0,
		is_joint: true
	},
	left_forearm: {
		name: 'left_forearm',
		parent: 'left_elbow',
		file_path: 'left_forearm.obj',
		positionX: 0,
		positionY: -3.45,
		positionZ: 0,
		is_joint: false
	},
	right_shoulder: {
		name: 'right_shoulder',
		parent: 'torso',
		file_path: 'right_shoulder.obj',
		positionX: -4.145,
		positionY: 1.785,
		positionZ: 0,
		is_joint: true
	},
	right_upper_arm: {
		name: 'right_upper_arm',
		parent: 'right_shoulder',
		file_path: 'right_upper_arm.obj',
		positionX: -0.375,
		positionY: -3.845,
		positionZ: 0,
		is_joint: false
	},
	right_elbow: {
		name: 'right_elbow',
		parent: 'right_upper_arm',
		file_path: 'right_elbow.obj',
		positionX: 0,
		positionY: -3.7,
		positionZ: 0,
		is_joint: true
	},
	right_forearm: {
		name: 'right_forearm',
		parent: 'right_elbow',
		file_path: 'right_forearm.obj',
		positionX: 0,
		positionY: -3.45,
		positionZ: 0,
		is_joint: false
	},
	left_hip: {
		name: 'left_hip',
		parent: 'pelvis',
		file_path: 'left_hip.obj',
		positionX: 1.395,
		positionY: -3.31,
		positionZ: 0,
		is_joint: true
	},
	left_upper_leg: {
		name: 'left_upper_leg',
		parent: 'left_hip',
		file_path: 'left_upper_leg.obj',
		positionX: -0.04,
		positionY: -4.37,
		positionZ: 0,
		is_joint: false
	},
	left_knee: {
		name: 'left_knee',
		parent: 'left_upper_leg',
		file_path: 'left_knee.obj',
		positionX: -0.045,
		positionY: -4.535,
		positionZ: 0,
		is_joint: true
	},
	left_shin: {
		name: 'left_shin',
		parent: 'left_knee',
		file_path: 'left_shin.obj',
		positionX: -0.05,
		positionY: -4.69,
		positionZ: 0,
		is_joint: false
	},
	right_hip: {
		name: 'right_hip',
		parent: 'pelvis',
		file_path: 'right_hip.obj',
		positionX: -1.395,
		positionY: -3.31,
		positionZ: 0,
		is_joint: true
	},
	right_upper_leg: {
		name: 'right_upper_leg',
		parent: 'right_hip',
		file_path: 'right_upper_leg.obj',
		positionX: 0.04,
		positionY: -4.37,
		positionZ: 0,
		is_joint: false
	},
	right_knee: {
		name: 'right_knee',
		parent: 'right_upper_leg',
		file_path: 'right_knee.obj',
		positionX: 0.045,
		positionY: -4.535,
		positionZ: 0,
		is_joint: true
	},
	right_shin: {
		name: 'right_shin',
		parent: 'right_knee',
		file_path: 'right_shin.obj',
		positionX: 0.05,
		positionY: -4.69,
		positionZ: 0,
		is_joint: false
	},
};