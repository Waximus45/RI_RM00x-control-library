import { connect_to_I2C, init_RM00x_I2C } from "./rm00x-module.js";

window.connect_RM00x = function() {
	return connect_to_I2C()
	.then((dev) => {
		return init_RM00x_I2C(dev)
		.then(() => console.dir(dev))
		.then(() => dev);
	});
}
