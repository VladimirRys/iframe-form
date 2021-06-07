import gulp from "gulp";
import pug from "gulp-pug";
import pugbem from "gulp-pugbem";

import mergeJSON from "gulp-merge-json";

// import data from "gulp-data";
import fs from "fs";

import { Path } from "./_const.js";

const isPretty = process.env.NODE_ENV === "development" ? true : false;

export const pages = gulp.series(prepareData, compilePug);

function prepareData() {
	return gulp
		.src(Path.DATA.source + "*.json")
		.pipe(mergeJSON())
		.pipe(gulp.dest("./temp"));
}

function compilePug() {
	return gulp
		.src(Path.PAGE.source)
		.pipe(
			pug({
				pretty: isPretty,
				plugins: [pugbem],
				data: JSON.parse(fs.readFileSync("./temp/combined.json")),
			})
		)
		.pipe(gulp.dest(Path.PAGE.build));
}
