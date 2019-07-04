const defaults = {
  visible: false,
  android: false,
  showCancelButton: true,
  showConfirmButton: true,
  closeOnClickMask: true,
  distinguishCancelAndClose: false,
  title: '',
  content: '',
  cancelButtonText: '取消',
  confirmButtonText: '确定'
};

import Vue from 'vue';
import dialogVue from './dialog.vue';
import merge from '../../../src/utils/merge';

const DialogConstructor = Vue.extend(dialogVue);

let currentDialog, instance;

const defaultCallback = action => {
  if (currentDialog) {
    if (currentDialog.resolve) {
      if (action === 'confirm') {
        currentDialog.resolve(action);
      } else if (currentDialog.reject && (action === 'cancel' || action === 'close')) {
        currentDialog.reject(action);
      }
    }
  }
};

const initInstance = () => {
  instance = new DialogConstructor({
    el: document.createElement('div')
  });
};

const Dialog = function(options) {
  if (Vue.prototype.$isServer) return;
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }
    options = merge({}, defaults, options);
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop];
      }
    }
    currentDialog = {
      options: options,
      resolve: resolve,
      reject: reject
    };
    instance.action = '';
    instance.callback = defaultCallback;
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
      instance.visible = true;
    });
  });
};

Dialog.showDialog = function(options) {
  return new Dialog(options);
};

export default Dialog;
export { Dialog };
