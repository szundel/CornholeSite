var gulp = require("gulp");
var concat = require("gulp-concat");
var del = require("del");
var expect = require("gulp-expect-file");
var gulpSequence = require("gulp-sequence");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");
var libraryFiles = [
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/knockout/build/output/knockout-latest.debug.js",
        "node_modules/knockout-mapping/dist/knockout.mapping.js",
        "node_modules/knockout.validation/dist/knockout.validation.js",     
        "node_modules/pubsubjs/pubsub.js",
        "node_modules/sammy/lib/sammy.js",
        "node_modules/d3/build/d3.js",
];

gulp.task("thirdparty", function(){
    return gulp.src(libraryFiles)
    .pipe(expect(libraryFiles))
    .pipe(concat("third-party.js"))
    .pipe(gulp.dest("dist/client"))
});
var tsClientProject = ts.createProject('tsconfig.json', { "outFile": "client-ts.js" });
gulp.task("ts:client", function(){
    return gulp.src(["src/client/*.ts","src/client/**/*.ts"])
    .pipe(sourcemaps.init({largeFile:true}))
    .pipe(tsClientProject())
    .pipe(gulp.dest("dist/client"))
});
var defaultTsConfig = ts.createProject('tsconfig.json');
gulp.task("ts:server", function(){
    return gulp.src([
    "src/server.ts"// This is key dont forget
    ])
    .pipe(sourcemaps.init({largeFile:true}))
    .pipe(ts.createProject('tsconfig.json')())
    .pipe(gulp.dest("dist"))
});
gulp.task("ts:routes",function(){
    return gulp.src(["src/routes/*.ts"])
    .pipe(ts.createProject('tsconfig.json')())
    .pipe(gulp.dest("dist/routes"));
});
gulp.task("views",function(){
    return gulp.src("views/*.html")
    .pipe(gulp.dest("dist/views/"));
});

gulp.task("clean", function(){
    var paths = del.sync(["dist/*","build/"]);
    console.log("Deleted files/folders:\n", paths.join("\n"));
});

gulp.task("default",["clean"],function(callback){
    gulpSequence(["thirdparty","ts:client","ts:server","ts:routes","views"])((callback));
})