<template>
  <transition name="wv-fade-in">
    <div v-show="visible">
      <div :class="[mask ? 'weui-mask' : 'weui-mask_transparent']"></div>
      <div :class="['weui-toast', !icon ? 'wv-toast' : '']">
        <i v-if="icon && !iconClass" :class="[icon, 'weui-icon_toast']"></i>
        <i v-else :class="iconClass"></i>
        <p v-if="text" class="weui-toast__content">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
let iconMap = {
  success: 'weui-icon-success-no-circle',
  loading: 'weui-loading'
};

export default {
  data() {
    return {
      visible: false,
      mask: false,
      type: '',
      iconClass: '',
      text: '',
      duration: 2000
    };
  },
  computed: {
    icon() {
      const { type, iconClass } = this;
      return iconClass || (type && iconMap[type]) ? iconMap[type] : '';
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        let timer = setTimeout(() => {
          this.visible = false;
          clearTimeout(timer);
        }, this.duration);
      }
    }
  }
};
</script>
