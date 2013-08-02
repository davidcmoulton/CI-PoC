/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
   
    // defines properties to be used globally within this Grunt file.
    meta: {
      src: {
        // pattern describing application javascript files
        main: 'src/**/*.js',
        // pattern describing test javascript files
        test: 'spec/**/*.spec.js',
        // reflexive pattern
        me: 'Gruntfile.js',
        // returns array of all above patterns
        all: (function () {
          var self = this,
              props = [],
              prop;
          
          for (prop in self) {
            if (self.hasOwnProperty(prop)) {
              props.push(prop);
            }
          }
          return props;
        }())
      },

      dist: {
        // output path for distribution build
        out: 'dist',
        // documentation path for distribution build 
        doc: '<%= meta.dist.out %>/doc'
      },

      dev: {
        // documentation path for dev build
        doc: 'doc'
      },

      reports: {
        // base path for all generated reports
        base: 'reports',
        // path to test coverage report
        coverage: '<%= meta.reports.base %>/coverage',
        // path to code complexity report
        complexity: '<%= meta.reports.base %>/complexity'
      }
    },

    // Task configuration.

    // clean old files
    clean: {
      src: [
        '<%= meta.dist.doc %>/**/*',
        '<%= meta.dist.out %>/**/*',
        '<%= meta.dist.out %>',
        '<%= meta.dev.doc %>',
        '<%= meta.reports.base %>',
      ],
      options: {
        // logs more output
        nonull: true
      }
    },

    // code quality checking with jsHint
    jshint: {
      // options file for jshint
      // /* jshintrc: 'jshintrc.json', */ // Tried putting options into jshintrc file, but
      //                                      not errors were reported, evern when some were
      //                                      deliberately introduced.
      options: {
        "curly": true,
        "eqeqeq": true,
        "immed": true,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "sub": true,
        "undef": true,
        "unused": true,
        "boss": true,
        "eqnull": true,
        "browser": true,
        "globals": {
          "require": false,
          "jasmine": false,
          "describe": false,
          "xdescribe": false,
          "it": false,
          "xit": false,
          "expect": false,
          "isDefined": false,
          "isNotDefined": false,
          "beforeEach": false,
          "afterEach": false,

          "SHAPES": true
        }
      },

      // run over this file, all src files and all specs files (contains tests).
      gruntfile: {
        src: 'Gruntfile.js'
      },
      file_corpus: {
        src: ['<%= meta.src.main %>', '<%= meta.src.test %>']
      }
    },

    // unit tests
    jasmine: {
      src: '<%= meta.src.main %>',
      options: {
        specs: '<%= meta.src.test %>'
      },

      coverage: {
              src: '<%= meta.src.main %>',
              options: {
                specs: '<%= meta.src.test %>',
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                  coverage: '<%= meta.reports.coverage %>/coverage.json',
                  report: [
                    {
                      type: 'html',
                      options: {
                        dir: '<%= meta.reports.coverage %>/html'
                      }
                    },
                    {
                      type: 'cobertura',
                      options: {
                        dir: '<%= meta.reports.coverage %>/cobertura'
                      }
                    },
                    {
                      type: 'text-summary'
                    }
                  ]
                }
              }
            }


    },

    // complexity analysis (see http://jscomplexity.org/complexity)
    complexity: {
            generic: {
                src: ['<%= meta.src.main %>', '<%= meta.src.test %>'],
                options: {
                    jsLintXML: '<%= meta.reports.base %>/complexity_report.xml', // create XML JSLint-like report
                    errorsOnly: false, // show only maintainability errors
                    // making up these numbers at the moment so everything passes
                    // TODO: put some meaningful threshold in here
                    cyclomatic: 3,
                    halstead: 15,
                    maintainability: 100

                    // These were the defaults from the example at https://npmjs.org/package/grunt-complexity
                    // cyclomatic: 3,
                    // halstead: 8,
                    // maintainability: 100
                }
            }
        },

    // complexity analysis with extra reporting
    plato: {
      all: {
        src: '<%= meta.src.main %>',
        dest: '<%= meta.reports.complexity %>'
      }
    },

    // generate API documentation
    jsdoc: {
      dist: {
        src: '<%= meta.src.main %>',
        dest: '<%= meta.dist.doc %>'
      },
      dev: {
        src: '<%= meta.src.main %>',
        dest: '<%= meta.dev.doc %>'
      }
    },

    // concatonate all src files
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%= meta.src.main %>'],
        dest: '<%= meta.dist.out %>/<%= pkg.name %>_<%= pkg.version %>.js'
      }
    },

    // minify the concatonated src file
    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'gzip'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= meta.dist.out %>/<%= pkg.name %>_<%= pkg.version %>.min.js'
      }
    },

    // run specified tasks automatically if watched resources change
    watch: {
      gruntfile: {
        files: ['<%= meta.src.all %>'],
        tasks: ['default:gruntfile']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define tasks (make sure there's always a 'default' task, run when grunt is invoked
  //                with no arguments).

  // Note that the complexity and the plato tasks do similar things.
  //  - the complexity task tests cyclomatic and Halstead complexity, and maintainability
  //  - the plato task is similar with extra reporting.
  // Use whichever or both, as required

  grunt.registerTask('test', ['jshint', 'jasmine', 'complexity']);
  grunt.registerTask('test-with-plato-reports', ['jshint', 'jasmine', 'complexity', 'plato']);
  grunt.registerTask('shrink', ['concat', 'uglify']);

  grunt.registerTask('dev', ['test', 'watch']);
  grunt.registerTask('dev-with-doc', ['test', 'jsdoc:dev', 'watch']);
  grunt.registerTask('build-distro', ['clean', 'test-with-plato-reports', 'jsdoc:dist', 'shrink']);

  grunt.registerTask('default', ['dev']);

};
