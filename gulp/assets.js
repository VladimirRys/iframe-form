import gulp from "gulp";
import { Path } from "./_const.js";

export const assets = gulp.parallel(copyGeneralAssets, copyData);

function copyGeneralAssets() {
	return gulp.src(Path.ASSET.source).pipe(gulp.dest(Path.ASSET.build));
}

function copyData() {
	return gulp
		.src(Path.DATA.source + "countries.json")
		.pipe(gulp.dest(Path.ASSET.build + "data"));
}
