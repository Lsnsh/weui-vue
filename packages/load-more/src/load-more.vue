<template>
  <div
    class="wv-loadmore weui-loadmore"
    :class="[{'weui-loadmore_line': !loading, 'weui-loadmore_dot' : !tips}]"
  >
    <i v-if="loading" class="weui-loading"></i>
    <span class="weui-loadmore__tips">{{tips ? tips : ''}}</span>
  </div>
</template>

<script>
export default {
  name: 'WvLoadMore',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    tips: String
  }
};
</script>
