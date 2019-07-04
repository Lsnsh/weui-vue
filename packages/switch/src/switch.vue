<template>
  <!-- TODO: disabled -->
  <div
    class="wv-switch"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="disabled"
    @click.self="handleSwitch"
  >
    <input
      class="weui-switch"
      type="checkbox"
      ref="input"
      :disabled="disabled"
      @change="handleChange"
    >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WvSwitch',
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
    disabled: {
      type: Boolean,
      default: false
    }
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
