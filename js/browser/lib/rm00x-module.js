export function init_RM00x_I2C() {

}

export function connect_to_I2C() {
	return navigator.usb.requestDevice({ filters: [{ vendorId: 0x1a86 }] })
	.then(dev => {
		console.log(dev);
	});
}
