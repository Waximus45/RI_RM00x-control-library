export function init_RM00x_I2C(dev) {
	return dev.transferOut(2, Uint8Array.from([0xaa, 0x74, 0x83, 0x80, 0x00, 0x31, 0x75, 0x00]))
	.then(() => dev.transferOut(2, Uint8Array.from([0xaa, 0x74, 0x83, 0x80, 0xfe, 0x5f, 0x75, 0x00])))
	.then(() => dev.transferOut(2, Uint8Array.from([0xaa, 0x74, 0x83, 0x80, 0x00, 0x21, 0x75, 0x00])))
	.then(() => dev.transferOut(2, Uint8Array.from([0xaa, 0x74, 0x86, 0x80, 0x06, 0x00, 0x00, 0x86, 0x01, 0x75, 0x00])));
}

export function connect_to_I2C() {
	return navigator.usb.requestDevice({ filters: [{ vendorId: 0x1a86, productId: 0x5512 }] })
	.then(dev => {
		return dev.open()
			.then(() => dev.selectConfiguration(1))
			.then(() => dev.claimInterface(0))
			.then(() => dev.selectAlternateInterface(0, 0))
			.then(() => dev);
	});
}
