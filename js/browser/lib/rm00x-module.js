export function init_RM00x(dev) {
	return dev.transferOut(2, Uint8Array.from([0xaa, 0x74, 0x83, 0x80, 0x00, 0x31, 0x75, 0x00]))
		.then(() => dev.transferOut(2, Uint8Array.from([0xaa, 0x74, 0x83, 0x80, 0xfe, 0x5f, 0x75, 0x00])))
		.then(() => dev.transferOut(2, Uint8Array.from([0xaa, 0x74, 0x83, 0x80, 0x00, 0x21, 0x75, 0x00])));
}

export function connect_to_RM00x() {
	return navigator.usb.requestDevice({ filters: [{ vendorId: 0x1a86, productId: 0x5512 }] })
		.then(dev => {
			return dev.open()
				.then(() => dev.selectConfiguration(1))
				.then(() => dev.claimInterface(0))
				.then(() => dev.selectAlternateInterface(0, 0))
				.then(() => dev);
		});
}

export function write_to_address(dev, addr, byteArr) {
	let bytes = Uint8Array.from([0xaa, 0x74, 0x80 | ((2 + byteArr.length) & 0x0f), 0x80, addr, ...byteArr, 0x75, 0x00]);

	return dev.transferOut(2, bytes);
}

export class Servo {
	constructor(dev, idx) {
		this.#device = dev;
		this.#address = (idx * 4) + 0x06;
	}

	get position() { return this.#position; }
	position(value) {
		value = clamp(value, -100, 100);
		this.#position = value;

		value = map(value, -100, 100, 0x5a, 0x2b2);

		return write_to_address(this.#device, this.#address, [0x00, 0x00, value & 0xff, (value & 0xff00) >> 8]);
	}

	#device;
	#address;
	#position = 0;
};

function map(val, min1, max1, min2, max2) {
	return (val - min1) * (max2 - min2) / (max1 - min1) + min2;
}

function clamp(val, min, max) {
	if (val <= min) return min;
	if (val >= max) return max;
	return val;
}
