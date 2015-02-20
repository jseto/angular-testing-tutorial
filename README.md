js-seed [![Build Status](https://travis-ci.org/jseto/js-seed.svg?branch=master)](https://travis-ci.org/jseto/js-seed)
============

__A starter project for Angular.__

Based on [Angular][angular]'s [angular-seed](http://github.com/angular/angular-seed)  but using gulp.
    
This project is an application skeleton for a basic [AngularJS](http://angularjs.org/) web app. Additionally it takes benefit form [Bootstrap][bootstrap] responsive framework. It is ready for [Travis CI][travis] continuous integration platform.

## Getting Started

To get you started you can simply [clone](http://github.com/jseto/js-seed) the js-seed repository and install the dependencies:

### Prerequisites

You need git to clone the js-seed repository. You can get git from
[http://git-scm.com/][git].

We also use a number of node.js tools to initialize and test js-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/][node].

### Clone js-seed

Clone the js-seed repository using [git][git]:

```
git clone https://github.com/jseto/js-seed.git
cd js-seed
```

If you just want to start a new project without the js-seed commit history then you can do:

```bash
git clone --depth=1 https://github.com/jseto/js-seed.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install gulp

[Gulp][gulp] is used the build system. Install gulp globally to have access to the command line

```
npm install -g gulp
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `client/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
js-seed changes this location through the `.bowerrc` file.  Putting it in the client folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a web server.  The simplest way to start
this server is:

```
gulp server:start
```

Now browse to the app at `http://localhost:3000`.

This will start the webserver and leave it running in the background. 

## Directory Layout

```
client/             --> all of the source files for the application
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
gulp/               --> gulp tasks
test/               --> test related stuff
  client/             --> client spec files
  karma.conf.js       --> config file for running unit tests with Karma
  protractor.conf.js  --> Protractor config file
.bowerrc            --> specifies where bower components will be installed
.gitignore          --> files to ignore by git
.jshintrc           --> jsHint conf file
.travis.yml         --> Travis CI conf file
bower.json          --> bower components to install
gulpfile.js         --> main gulp tasks
package.json        --> node modules to install an scripts
project.conf.js     --> project configuration settigs
README.md           --> Documentation
```

## Testing

There are 2 kinds of tests in the js-seed application: client Unit tests and End to End tests.
All of them are written in [Jasmine][jasmine]

### Running Unit Tests

The easiest way to run the unit tests is to use the supplied npm script:

```
gulp test
```

###Client Unit tests

The js-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `test/karma.conf.js`, but you should use project.conf.js 
* the unit tests are found in the `test/client` folder with a similar structure as the code they are testing and are named as `*.spec.js` (you can change that with project.conf.js).

to run this test alone just type

```
gulp test:client
```

This script will start the Karma test runner to execute the unit tests.

If you want to watch the source and test files for changes and then re-run the tests whenever any of them change, run 

```
gulp watch:test:client
```

### End to end testing

The js-seed app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `test/protractor-conf.js`. Again, configure throught project.conf.js
* the e2e tests are found in the `test/client` folder with a similar structure as the code they are testing and are named as `*.e2e-spec.js`.

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it. If you run the provided nmp tasks you do not need to worry about that becase they automatically start the server

You can run the end-to-end tests alone using the script:

```
gulp test:e2e
```

This script will execute the end-to-end tests against the application being hosted on the
development server.

## Developing

We provide several tools to help in the app development phase. Basically are watchers, a browser re-loader and the server itself.
Although you can change the behaviour of the server, the proposed configuration covers all the need you can have and we will focus on client side development. 

```
gulp develop
```

or just 

```
gulp
```

this task will start the server and the client unit test watcher.

If you only want the server without the tests invoke

```
gulp server:start
```

## Continuous Integration

### Travis CI

[Travis CI][travis] is a continuous integration service, which can monitor GitHub for new commits
to your repository and execute scripts such as building the app or running tests. The js-seed
project contains a Travis configuration file, `.travis.yml`, which will cause Travis to run your
tests when you push to GitHub.

You will need to enable the integration between Travis and GitHub. See the Travis website for more
instruction on how to do this.

### Contact, Contribute

If you want support, a new feature or find a bug open a [new issue](https://github.com/jseto/js-seed/issues) in github.
If you want to contribute, just make a pull request with your new code.

# License

__js-seed__ is distributed under the [MIT license](http://opensource.org/licenses/MIT)


[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: http://travis-ci.org/
[loopback]: http://loopback.io/
[angular]: http://angularjs.org
[passport]: http://passportjs.org/
[bootstrap]: http://getbootstrap.com/
[fontawesome]: http://fortawesome.github.io/Font-Awesome/
[heroku]: http://heroku.com
[less]: http://lesscss.org
[jslib]: http://github.com/jseto/jsLib
[jasmine-node]: http://github.com/mhevery/jasmine-node
[instant]: http://github.com/fgnass/instant
[gulp]: http://gulpjs.com/