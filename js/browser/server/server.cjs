require("dotenv").config();
const express = require("express"),
	app = new express(),
	path = require("node:path");

main();
async function main() {
	app.use(express.json());

	app.use(express.static(path.join(__dirname, "../lib/")));
	app.use(express.static(path.join(__dirname, "../examples/")));

	app.get("/", (req, res) => {
		res.status(200).sendFile(path.join(__dirname, "../examples/index.html"));
	});

	app.listen(process.env.port, (err) => {
		if (err) console.log(err);
		console.log(`Example server is running on localhost:${process.env.port}`);
	});
}
