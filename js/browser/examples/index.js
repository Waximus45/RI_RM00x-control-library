import { connect_to_RM00x, init_RM00x, Servo } from "rm00x";

var servo = [];

window.connect_RM00x = function() {
	return connect_to_RM00x()
		.then((dev) => {
			return init_RM00x(dev)
				.then(() => console.dir(dev))
				.then(() => dev)
				.then(() => {
					for (let i = 0; i < 5; ++i) {
						servo[i] = new Servo(dev, i);
						servo[i].position(0);
					}
				});
		});
}
