<template>
  <div class="weui-cell" :class="{'weui-cell_active': clickEffect}" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <div v-if="label" class="weui-cell__hd">
      <label class="weui-label">{{ label }}</label>
    </div>
    <div class="weui-cell__bd">
      <input
        class="weui-input"
        v-bind="$attrs"
        :type="type"
        :autocomplete="autocomplete"
        ref="input"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
    </div>
    <div v-if="showClear" class="weui-cell__ft">
      <i class="weui-icon-clear" @click="handleClear"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WvInput',
  inheritAttrs: false,
  props: {
    clickEffect: {
      type: Boolean,
      default: true
    },
    clearable: Boolean,
    label: String,
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    autocomplete: {
      type: String,
      default: 'off'
    }
  },
  data() {
    return {
      isComposing: false,
      hovering: false,
      focused: false
    };
  },
  computed: {
    showClear() {
      return this.clearable && this.nativeInputValue && (this.focused || this.hovering);
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    }
  },
  watch: {
    nativeInputValue() {
      this.setNativeInputValue();
    }
  },
  mounted() {
    this.setNativeInputValue();
  },
  methods: {
    handleCompositionStart() {
      this.isComposing = true;
    },
    handleCompositionEnd(event) {
      this.isComposing = false;
      this.handleInput(event);
    },
    handleInput(event) {
      // should not emit input during composition
      if (this.isComposing) return;

      this.$emit('input', event.target.value);

      // ensure native input value is controlled
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
    },
    handleClear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
    getInput() {
      return this.$refs.input;
    },
    // native input value is set explicitly
    // do not use v-model / :value in template
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    }
  }
};
</script>
