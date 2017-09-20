'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
      'Welcome to the impeccable ' + chalk.red('generator-vue-c') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('static/**/*'),
      this.destinationRoot()
    );
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('example/index.html'),
      {name: this.props.name}
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {name: this.props.name}
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {name: this.props.name}
    );
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }

  end() {
    this.spawnCommand('git', ['init']);
  }
};
