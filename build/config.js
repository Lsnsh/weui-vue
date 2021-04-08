var path = require('path');
// var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

// var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
// var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
// var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`weui-vue/packages/${key}`] = `weui-vue/lib/${key}`;
});

// externals['weui-vue/src/locale'] = 'weui-vue/lib/locale';
// utilsList.forEach(function(file) {
//   file = path.basename(file, '.js');
//   externals[`weui-vue/src/utils/${file}`] = `weui-vue/lib/utils/${file}`;
// });
// mixinsList.forEach(function(file) {
//   file = path.basename(file, '.js');
//   externals[`weui-vue/src/mixins/${file}`] = `weui-vue/lib/mixins/${file}`;
// });
// transitionList.forEach(function(file) {
//   file = path.basename(file, '.js');
//   externals[`weui-vue/src/transitions/${file}`] = `weui-vue/lib/transitions/${file}`;
// });

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'weui-vue': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
