<template>
  <!-- TODO: plain disabled -->
  <div
    class="wv-checkbox weui-cells_checkbox"
    role="checkbox"
    :aria-checked="checked"
    :aria-disabled="disabled"
    @click="handleSwitch"
  >
    <input
      class="weui-check"
      type="checkbox"
      ref="input"
      :disabled="disabled"
      @change="handleChange"
    >
    <i class="weui-icon-checked"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WvCheckbox',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: Boolean
  },
  computed: {
    checked() {
      return this.value === this.activeValue;
    }
  },
  watch: {
    checked() {
      this.$refs.input.checked = this.checked;
    }
  },
  methods: {
    handleChange() {
      const val = this.checked ? this.inactiveValue : this.activeValue;
      this.$emit('input', val);
      this.$emit('change', val);
      this.$nextTick(() => {
        // set input's checked property
        // in case parent refuses to change component's value
        this.$refs.input.checked = this.checked;
      });
    },
    handleSwitch() {
      !this.disabled && this.handleChange();
    }
  },
  created() {
    if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
      this.$emit('input', this.inactiveValue);
    }
  },
  mounted() {
    this.$refs.input.checked = this.checked;
  }
};
</script>
