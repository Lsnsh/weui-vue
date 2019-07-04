import Button from '../packages/button';
import Input from '../packages/input';
import Switch from '../packages/switch';
import Checkbox from '../packages/checkbox';
import Toast from '../packages/toast';
import Dialog from '../packages/dialog';
import LoadMore from '../packages/load-more';

const components = [Button, Input, Switch, Checkbox, Toast, Dialog, LoadMore];

const install = Vue => {
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
  install,
  Toast
};
