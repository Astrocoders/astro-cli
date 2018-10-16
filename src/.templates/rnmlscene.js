const { stripIndent } = require('common-tags')
const fs = require('fs')
const chalk = require('chalk')

module.exports.where = (name) => {
if (!fs.existsSync('scenes')){
    fs.mkdirSync('scenes')
    return `scenes/${name}.re`
  } else {
    return `scenes/${name}.re`
  }
}

module.exports.args = { name: 'Scene name' }

module.exports.postBuild = () =>
  console.log(
    '✅ ',
    chalk.green(
      'Now update your ./re/NavigationConfig.re with your scene constructor',
    ),
  )

module.exports.gen = (name) => stripIndent`open Rebolt;
open NavigationConfig;
let component = ReasonReact.statelessComponent("${name}");
let make = (~navigation, _children) => {
  ...component,
  render: _self =>
    <StackNavigator.Screen headerTitle="${name}" navigation>
      ...(() => <View> <AppText value="${name}" /> </View>)
    </StackNavigator.Screen>,
};`