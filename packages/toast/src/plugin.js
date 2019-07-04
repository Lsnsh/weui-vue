const defaults = {
  visible: false,
  mask: false,
  type: '',
  iconClass: '',
  text: '',
  duration: 2000
};

import Vue from 'vue';
import toastVue from './toast.vue';
import merge from '../../../src/utils/merge';

const ToastConstructor = Vue.extend(toastVue);

let instance;

const initInstance = () => {
  instance = new ToastConstructor({
    el: document.createElement('div')
  });
};

const Toast = function(options) {
  if (Vue.prototype.$isServer) return;
  if (!instance) {
    initInstance();
  }

  if (typeof options === 'string') {
    options = {
      text: options
    };
  }
  options = merge({}, defaults, options);
  for (let prop in options) {
    if (options.hasOwnProperty(prop)) {
      instance[prop] = options[prop];
    }
  }
  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.visible = true;
  });
};

Toast.showLoading = function(options) {
  return new Toast(
    merge(
      {
        type: 'loading'
      },
      options
    )
  );
};
Toast.showToast = function(options) {
  return new Toast(options);
};
Toast.hideToast = function() {
  instance.visible = false;
};

export default Toast;
export { Toast };
