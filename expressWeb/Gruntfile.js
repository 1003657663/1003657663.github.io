module.exports = function (grunt) {
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            concat: {
                concat_lib: {
                    src: [
                        './src/js/lib/jquery.min.js',
                        './src/js/lib/bootstrap.min.js',
                        './src/js/lib/react.min.js',
                        './src/js/lib/react-dom.min.js'
                    ],
                    dest: './build/jsConcat/lib.min.js'
                },
                concat_all: {
                    src: ['./src/js/all/*.js'],
                    dest: './build/jsConcat/all.js'
                },
                concat_user: {
                    src: [
                        './src/js/static.js',
                        './src/js/staticComponent.js',
                        './src/js/BeforeButton.js',
                        './src/js/Login.js',
                        './src/js/SearchResult.js',
                        './src/js/NavBar.js',
                        './src/js/Footer.js',
                        './src/js/SendExpressComponent.js',
                        './src/js/ExpressHistoryComponent.js',
                        './src/js/EditAddressComponent.js',
                        './src/js/Address.js',
                        './src/js/ChangePassowrd.js',
                        './src/js/AboutOus.js',
                        './src/js/Main.js',
                        './src/js/LeftComponent.js',
                        './src/js/RightComponent.js',
                        './src/js/Express.js'
                    ],
                    dest: './build/jsConcat/user.js'
                },
                concat_employee: {
                    src: [
                        './src/js/employee/static.js',
                        './src/js/employee/staticComponent.js',
                        './src/js/employee/BeforeButton.js',
                        './src/js/employee/Login.js',
                        './src/js/employee/NavBar.js',
                        './src/js/employee/Footer.js',
                        './src/js/employee/Package.js',
                        './src/js/employee/ChangePassowrd.js',
                        './src/js/employee/Manager.js',
                        './src/js/employee/Workload.js',
                        './src/js/employee/AboutOus.js',
                        './src/js/employee/Main.js',
                        './src/js/employee/LeftComponent.js',
                        './src/js/employee/RightComponent.js',
                        './src/js/employee/Express.js'
                    ],
                    dest: './build/jsConcat/employee.js',
                }
            },
            uglify: {//---js压缩
                concat_lib: {
                    options: {
                        mangle: false
                    },
                    files: {
                        './src/minijs/lib.min.js': ['./build/jsConcat/lib.js']
                    }
                },
                concat_all: {
                    options: {
                        mangle: false
                    },
                    files: {
                        './src/minijs/all.min.js': ['./build/jsConcat/all.js']
                    }
                },
                concat_user: {
                    options: {
                        mangle: false
                    },
                    files: {
                        './src/minijs/user.min.js': ['./build/jsConcat/user.js']
                    }
                },
                concat_employee: {
                    options: {
                        mangle: false
                    },
                    files: {
                        './src/minijs/employee.min.js': ['./build/jsConcat/employee.js']
                    }
                }
            },
            less: {
                lessall: {
                    files: [{
                        expand: true,
                        cwd: './build/less',
                        src: ['./*.less'],
                        dest: './src/css',
                        ext: '.css'
                    }]
                }
            },
            cssmin: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                },
                target: {
                    files: {
                        './src/mincss/all.css': [
                            './src/css/baidu_map.css',
                            './src/css/all.css',
                            './src/css/centerComponent.css',
                            './src/css/sendExpressComponent.css',
                            './src/css/nav_bar.css',
                            './src/css/login.css',
                            './src/css/package.css',
                            './src/css/main.css',
                            './src/css/manager.css',
                            './src/css/address.css',
                            './src/css/footer.css',
                            './src/css/workrec.css'
                        ]
                    }
                }
            },
            watch: {
                html: {
                    files: ['src/html/*.html'],
                    options: {
                        livereload: true
                    }
                }
                ,
                lesscss: {
                    files: ['./build/less/*'],
                    tasks: ['less'],
                    options: {
                        spawn: false,
                        livereload: true
                    }
                }
                ,
                js: {
                    files: ['src/js/*'],
                    options: {
                        livereload: true
                    }
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
//grunt.loadNpmTasks('grunt-react');
    grunt.registerTask('default', ['less', 'watch', 'uglify', 'concat']);
}
;