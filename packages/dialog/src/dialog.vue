<template>
  <transition name="wv-fade-in">
    <div v-show="visible">
      <div class="weui-mask" @click="handelMaskClick"></div>
      <div class="weui-dialog" :class="{'weui-skin_android': android}">
        <div v-if="title" class="weui-dialog__hd">
          <strong class="weui-dialog__title">{{ title }}</strong>
        </div>
        <div class="weui-dialog__bd">{{ content }}</div>
        <div class="weui-dialog__ft">
          <span
            v-if="showCancelButton"
            @click="handleAction('cancel')"
            class="weui-dialog__btn weui-dialog__btn_default"
          >{{ cancelButtonText }}</span>
          <span
            v-if="showConfirmButton"
            type="primary"
            class="weui-dialog__btn weui-dialog__btn_primary"
            @click="handleAction('confirm')"
          >{{ confirmButtonText }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import WvButton from '../../button';

export default {
  name: 'WvDialog',
  data() {
    return {
      visible: false,
      android: false,
      showCancelButton: true,
      showConfirmButton: true,
      closeOnClickMask: true,
      distinguishCancelAndClose: false,
      title: '',
      content: '',
      action: '',
      cancelButtonText: '',
      confirmButtonText: '',
      callback: null
    };
  },
  components: {
    WvButton
  },
  methods: {
    handelMaskClick() {
      if (this.closeOnClickMask) {
        this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel')
      }
    },
    handleAction(action) {
      this.action = action;
      this.closeDialog();
    },
    closeDialog() {
      if (!this.visible) {
        return;
      }
      this.visible = false;
      typeof this.callback === 'function' && this.callback(this.action);
    }
  }
};
</script>
