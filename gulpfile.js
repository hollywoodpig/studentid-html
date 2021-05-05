const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');
const smartGrid = require('smart-grid')

function browsersync() {
	browserSync.init({
		server: { baseDir: 'app/' },
		notify: false,
		online: true
	})
}

function scripts() {
	return src([
		'app/js/app.js'
	])
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(dest('app/js/'))
	.pipe(browserSync.stream())
}

async function smartgrid() {
	smartGrid('app/scss/', {
		outputStyle: 'scss',
		filename: '_smart-grid',
		columns: 12,
		offset: '2rem',
		mobileFirst: true,
		mixinNames: {
			container: 'container'
		},
		container: {
			fields: '1rem'
		},
		breakpoints: {
            xs: {
                width: "20rem" // 320px
            },
            sm: {
                width: "36rem" // 576px
            },
            md: {
                width: "48rem" // 768px
            },
            lg: {
                width: "62rem" // 992px
            },
            xl: {
                width: "75rem" // 1200px
            }
		}
	})
}

function styles() {
	return src('app/scss/main.scss')
	.pipe(scss())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( { level: { 1: { specialComments: 0 } } } ))
	.pipe(dest('app/css/'))
	.pipe(browserSync.stream())
}

function images() {
	return src('app/images/src/**/*')
	.pipe(newer('app/images/dest/'))
	.pipe(imagemin())
	.pipe(dest('app/images/dest/'))
}

function cleanimg() {
	return del('app/images/dest/**/*', { force: true })
}

function buildcopy() {
	return src([
		'app/css/**/*.min.css',
		'app/js/**/*.min.js',
		'app/images/dest/**/*',
		'app/**/*.html',
	], { base: 'app' })
	.pipe(dest('dist'))
}
 
function cleandist() {
	return del('dist/**/*', { force: true })
}

function startwatch() {
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
	watch('app/**/scss/**/*', styles);
	watch('app/**/*.html').on('change', browserSync.reload);
	watch('app/images/src/**/*', images);
 
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.smartgrid = smartgrid;
exports.build = series(cleandist, smartgrid, styles, scripts, images, buildcopy);
exports.default = parallel(smartgrid, styles, scripts, browsersync, startwatch);
