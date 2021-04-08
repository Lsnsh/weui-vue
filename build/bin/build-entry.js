const fs = require('fs');
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const path = require('path');
const endOfLine = require('os').EOL;

const Components = require('../../components.json');

const OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
const IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\';';
const INSTALL_COMPONENT_TEMPLATE = '  {{name}}';
const MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-entry.js' */
import '../packages/theme-chalk/src/index.less';

{{include}}

const components = [
{{install}}
];

const install = function(Vue) {

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$wv = {
    showLoading: Toast.showLoading,
    hideLoading: Toast.hideToast,
    showToast: Toast.showToast,
    hideToast: Toast.hideToast,
    showDialog: Dialog.showDialog
  };

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '{{version}}',
  install,
{{list}}
};
`;

let ComponentNames = Object.keys(Components);

let includeComponentTemplate = [];
let installTemplate = [];
let listTemplate = [];

ComponentNames.forEach(name => {
  let componentName = uppercamelcase(name);

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }));

  if (['Dialog', 'Toast'].indexOf(componentName) === -1) {
    installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
      name: componentName,
      component: name
    }));
  }

  listTemplate.push(`  ${componentName}`);
});

let template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  version: process.env.VERSION || require('../../package.json').version,
  list: listTemplate.join(',' + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);

