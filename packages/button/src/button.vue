<template>
  <!-- TODO: size block cell -->
  <button
    class="weui-btn"
    @click="handleClick"
    :disabled="disabled || loading"
    :type="nativeType"
    :class="[
      buttonTypeClass,
      buttonSizeClass,
      {
        'weui-btn_disabled': disabled,
        'weui-btn_loading': loading,
      }
    ]"
  >
    <i v-if="loading" class="weui-loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
const sizeMap = {
  'default': '',
  'mini': 'weui-btn_mini'
}

export default {
  name: 'WvButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    size: {
      type: String,
      default: 'default'
    },
    plain: Boolean,
    loading: Boolean,
    disabled: Boolean
  },
  computed: {
    buttonTypeClass() {
      let baseClass = 'weui-btn';
      if (this.plain) {
        baseClass += '_plain' + '-' + this.type;
      } else {
        baseClass += '_' + this.type;
      }
      return baseClass;
    },
    buttonSizeClass() {
      return this.size && sizeMap[this.size] ? sizeMap[this.size] : '';
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    }
  }
};
</script>
