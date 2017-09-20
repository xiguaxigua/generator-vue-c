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
      this.templatePath('static/.*'),
      this.destinationRoot()
    );
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
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
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
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['add', '.']);
    this.spawnCommandSync('git', ['commit', '-m', '"Generator init commit"']);

    this.log('========= notice ==========')
    this.log('use ' + chalk.yellow('npm run dev') + ' to develop');
    this.log('use ' + chalk.yellow('npm run build') + ' to build component');
    this.log('===========================')
  }
};
