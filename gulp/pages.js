import gulp from "gulp";
import pug from "gulp-pug";
import pugbem from "gulp-pugbem";

// import data from "gulp-data";
import fs from "fs";

import { Path } from "./_const.js";

const isPretty = process.env.NODE_ENV === "development" ? true : false;


export function pages() {
	return gulp
		.src(Path.PAGE.source)
		.pipe(
			pug({
				pretty: isPretty,
				plugins: [pugbem],
				data: prepareData(),
			})
		)
		.pipe(gulp.dest(Path.PAGE.build));
}


function prepareData() {
	return JSON.parse(fs.readFileSync(Path.DATA.source + "data.json"));
}
