import { RM00x } from "./rm00x-web.js";

const rm = new RM00x(RM00x.fetchdevice(), function () {
	this.create_servo("base", 0);
});