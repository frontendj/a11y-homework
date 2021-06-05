const gulp = require('gulp');
const terser = require('gulp-terser');
const del = require('del');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const paths = require('vinyl-paths');
const babel = require('gulp-babel');
const fs = require('fs');

const PUBLIC_PATH = '_site';

// Scripts

gulp.task('scripts', () => {
    return gulp.src(`src/scripts/index.js`)
        .pipe(babel({
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            esmodules: true,
                        },
                    },
                ]
            ]
        }))
        .pipe(terser())
        .pipe(gulp.dest(`${PUBLIC_PATH}/scripts`));
});

gulp.task('watch', function() {
    gulp.watch('src/scripts/index.js', gulp.series('build'));
});

// Clean

gulp.task('clean', () => {
    return del([
        `${PUBLIC_PATH}/scripts/**/*`,
        `!${PUBLIC_PATH}/scripts/index.js`,
    ]);
});

// Cache

gulp.task('cache:hash', () => {
    return gulp.src([
        `${PUBLIC_PATH}/scripts/*.js`,
        `${PUBLIC_PATH}/styles/*.css`,
    ], {
        base: PUBLIC_PATH
    })
        .pipe(paths(del))
        .pipe(rev())
        .pipe(gulp.dest(PUBLIC_PATH))
        .pipe(rev.manifest('rev-manifest.json'))
        .pipe(gulp.dest(PUBLIC_PATH));
});

gulp.task('cache:replace', () => {
    const manifest = fs.readFileSync(`${PUBLIC_PATH}/rev-manifest.json`);

    return gulp
        .src([
            `${PUBLIC_PATH}/**/*.{html,css}`
        ])
        .pipe(revRewrite({
            manifest
        }))
        .pipe(gulp.dest(PUBLIC_PATH));
});



gulp.task('cache', gulp.series(
    'cache:hash',
    'cache:replace',
));


// Build

gulp.task('build', gulp.series(
    'scripts',
    'clean',
    'cache',
));
