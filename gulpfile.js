const gulp           = require('gulp'),
        sass           = require('gulp-sass'),
        browserSync    = require('browser-sync'),
        concat         = require('gulp-concat'),
        uglify         = require('gulp-uglify'),
        cleanCSS       = require('gulp-clean-css'),
        rename         = require('gulp-rename'),
        del            = require('del'),
        imagemin       = require('gulp-imagemin'),
        cache          = require('gulp-cache'),
        autoprefixer   = require('gulp-autoprefixer'),
        notify         = require('gulp-notify'),
        zip            = require('gulp-zip');

const settings = {
    name: "Collesium",
    paths: {
        root: "app/",
        dist: "dist/",
        sass: {
            all: "app/sass/**/*.sass",
            main: "app/sass/main.sass",
            dist: "app/assets/css/"
        },
        css: {
            all: "app/assets/css/**/*.css",
        	initial: "app/assets/css/",
            dist: "dist/assets/css/"
        },
        js: {
            all: "app/assets/js/**/*.js",
            main: "app/assets/js/common.js",
            initial: "app/assets/js/",
            dist: "dist/assets/js/"
        },
        img: {
            initial: "app/assets/img/",
            dist: "dist/assets/img/"
        },
        fonts: {
            initial: "app/assets/fonts/",
            dist: "dist/assets/fonts/"
        }
    },
    modes: {
        MinJsMode: false,
		MinCssMode: false
    }
};

function GetCssFromLibrary () {
    return gulp.src([
        'app/libs/animate.css/animate.min.css',
        'app/libs/bootstrap-grid/grid.min.css',
        'app/libs/magnific-popup/dist/magnific-popup.css',
        'app/libs/owl.carousel/dist/assets/owl.carousel.min.css', // Завжди в кінці
    ])
        .pipe(gulp.dest(settings.paths.css.initial));
}

function StartServer () {
    browserSync({
        server: {
            baseDir: settings.paths.root
        },
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
}

function GetJsFromLibrary () {
    if( settings.modes.MinJsMode ) {
        return gulp.src([
            'app/libs/jquery/dist/jquery.min.js',
            'app/js/common.min.js', // Завжди в кінці
        ])
            .pipe(concat('scripts.min.js'))
            .pipe(uglify()) // Мінімізує весь js
            .pipe(gulp.dest(settings.paths.js.initial))
            .pipe(browserSync.reload({stream: true}));
    } else {
        return gulp.src([
            'app/libs/jquery/dist/jquery.min.js',
			'app/libs/typed.js/lib/typed.min.js',
			'app/libs/counterup/jquery.counterup.min.js',
			'app/libs/jquery-validation/dist/jquery.validate.min.js',
			'app/libs/waypoints/lib/jquery.waypoints.min.js',
			'app/libs/owl.carousel/dist/owl.carousel.min.js',
			'app/libs/scrollspy/build/scrollspy.js',
			'app/libs/mixitup/dist/mixitup.min.js',
			'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
			'app/libs/wow/dist/wow.min.js'
        ])
            .pipe(uglify()) // Мінімізує весь js
            .pipe(gulp.dest(settings.paths.js.initial))
            .pipe(browserSync.reload({stream: true}));
    }
}

function GetMainJs () {
	return gulp.src(settings.paths.js.main)
		.pipe(concat('common.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(settings.paths.js.initial));
}

function BuildSass () {
    return gulp.src(settings.paths.sass.all)
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest(settings.paths.sass.dist))
        .pipe(browserSync.reload({stream: true}));
}

function SkipTask () {
    return new Promise(resolve => {
        resolve();
    });
}

function Watch () {
    gulp.watch(settings.paths.sass.all, BuildSass);
    gulp.watch(settings.paths.js.main, ( settings.modes.MinJsMode ? GetMainJs : () => {
        return gulp.src(settings.paths.js.main)
            .pipe(browserSync.reload({stream: true}));
    }) );
    gulp.watch(settings.paths.root + '*.html', () => {
        browserSync.reload();
	});
}

function CreateZip () {
    return gulp.src(settings.paths.dist + '/**')
        .pipe(zip(settings.name + '_built.zip'))
        .pipe(gulp.dest(settings.paths.dist));
}

function Build () {
    gulp.src(settings.paths.css.initial + '**/*.css')
        .pipe(gulp.dest(settings.paths.css.dist));

    gulp.src(settings.paths.js.initial + '**/*.js')
        .pipe(gulp.dest(settings.paths.js.dist));

    gulp.src(settings.paths.root + '*.html')
        .pipe(gulp.dest(settings.paths.dist));

    gulp.src(settings.paths.img.initial + '**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(settings.paths.img.dist));

    return gulp.src(settings.paths.fonts.initial + '**/*')
        .pipe(gulp.dest(settings.paths.fonts.dist));
}

function DelDist () {
    return del(settings.paths.dist);
}

gulp.task('default', gulp.series(
    ( settings.modes.MinJsMode ? GetMainJs : SkipTask),
    GetJsFromLibrary,
	( !settings.modes.MinCssMode ? GetCssFromLibrary : SkipTask),
    BuildSass,
    gulp.parallel(StartServer, Watch),
));

gulp.task('build', gulp.series(
    DelDist,
    ( settings.modes.MinJsMode ? GetMainJs : SkipTask),
    GetJsFromLibrary,
    ( !settings.modes.MinCssMode ? GetCssFromLibrary : SkipTask),
    BuildSass,
    Build,
    CreateZip
));

gulp.task('clearcache', () => {return cache.clearAll()});
