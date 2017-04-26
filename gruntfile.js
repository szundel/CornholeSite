module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    copy: {
      build: {
        files: [{
            expand: true,
            cwd: "./public",
            src: ["**"],
            dest: "./dist/public"
          },
          {
            expand: true,
            cwd: "./views",
            src: ["**"],
            dest: "./dist/views"
          },
          {
            cwd: './build/',
            src: 'server.js',
            dest: './dist/',
            expand: true
          },
          {
            cwd: './build/routes/',
            src: ["*.js"],
            dest: './dist/routes/',
            expand: true
          }
        ]
      }
    },
    clean: {
      build: ["./build/", "./dist/"]
    },
    concat: {
      client: {
        src: ['build/client/*.js', 'build/scripts/*.js'],
        dest: 'dist/client/client-ts.js',
      },
      scripts: {
        src: ['node_modules/*.js', 'node_modules/**/*.js'],
        dest: 'dist/client/third-party.js'
      }
    },
    ts: {
      app: {
        files: [{
          src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
          dest: "./build"
        }],
        options: {
          module: "commonjs",
          target: "es6",
          sourceMap: false,
          noImplicitAny: false,
          sourceMap: true,
          removeComments: true,
          typeRoots: ["./node_modules/@types"]
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css',
          sourceMap: true
        }]
      }
    },
    watch: {
      ts: {
        files: ["src/\*\*/\*.ts"],
        tasks: ["ts"]
      },
      views: {
        files: ["views/**/*.html"],
        tasks: ["copy"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask("default", [
    "clean",
    "cssmin",
    "copy",
    "ts",
    "concat"
  ]);
  grunt.registerTask("css", ["cssmin"]);
};
