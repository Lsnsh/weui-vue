<template>
  <div class="p-30">
    <!-- 表单 -->
    <div class="fs-22 color-blue text-center">表单</div>
    <hr />
    <!-- Button -->
    <div class="mtb-20">
      <div class="fw-400">
        <span class="fs-18">Button</span><span class="mlr-20">-</span
        ><span class="fs-18">按钮</span>
      </div>
      <hr class="mtb-20" />
      <wv-button>默认按钮</wv-button>
      <wv-button loading="loading">默认按钮</wv-button>
      <wv-button disabled="disabled">默认按钮</wv-button>
      <wv-button type="primary">主要按钮</wv-button>
      <wv-button type="warn">危险按钮</wv-button>
      <div>朴素按钮</div>
      <wv-button plain="plain">默认按钮</wv-button>
      <wv-button type="primary" plain="plain">主要按钮</wv-button>
      <div>按钮大小</div>
      <wv-button>普通尺寸按钮</wv-button>
      <wv-button size="mini">小尺寸按钮</wv-button>
      <wv-button size="mini" loading="loading">小尺寸按钮</wv-button>
      <wv-button size="mini" disabled="disabled">小尺寸按钮</wv-button>
      <wv-button type="primary" size="mini">小尺寸按钮</wv-button>
      <wv-button type="warn" size="mini">小尺寸按钮</wv-button>
      <wv-button style="width: 100%;">大尺寸按钮</wv-button>
    </div>
    <!-- Switch -->
    <div class="mtb-20">
      <div class="fw-400">
        <span class="fs-18">Switch</span><span class="mlr-20">-</span
        ><span class="fs-18">开关</span>
      </div>
      <hr class="mtb-20" />
      <wv-switch v-model="isSwitch1">开关</wv-switch>
    </div>
    <!-- Checkbox -->
    <div class="mtb-20">
      <div class="fw-400">
        <span class="fs-18">Checkbox</span><span class="mlr-20">-</span
        ><span class="fs-18">复选框</span>
      </div>
      <hr class="mtb-20" />
      <wv-checkbox v-model="isCheckbox1">复选框</wv-checkbox>
    </div>
    <!-- 基础组件 -->
    <div class="fs-22 color-blue text-center">基础组件</div>
    <hr />
    <!-- Icon -->
    <div class="mtb-20">
      <div class="fw-400">
        <span class="fs-18">Icon</span><span class="mlr-20">-</span
        ><span class="fs-18">图标</span>
      </div>
      <hr class="mtb-20" />
      <div
        class="inbl vtal-top w-170 h-170 mb-20 text-center"
        v-for="sIcon in iconList"
        :key="sIcon"
      >
        <div class="h-80 lh-80">
          <i :class="sIcon" style="font-size: 0.5rem;"></i>
        </div>
        <div class="h-90 vh-parent">
          <div class="v w-p100 fs-24 fw-300 color-grey">{{ sIcon }}</div>
        </div>
      </div>
    </div>
    <!-- LoadMore -->
    <div class="mtb-20">
      <div class="fw-400">
        <span class="fs-18">LoadMore</span><span class="mlr-20">-</span
        ><span class="fs-18">加载更多</span>
      </div>
      <hr class="mtb-20" />
      <wv-load-more tips="正在加载"></wv-load-more>
      <wv-load-more tips="暂无数据" :loading="false"></wv-load-more>
      <wv-load-more :loading="false"></wv-load-more>
    </div>
    <!-- 操作反馈 -->
    <div class="fs-22 color-blue text-center">操作反馈</div>
    <hr />
    <!-- Dialog -->
    <div class="mtb-20">
      <div class="fw-400">
        <span class="fs-18">Dialog</span><span class="mlr-20">-</span
        ><span class="fs-18">对话框</span>
      </div>
      <hr class="mtb-20" />
      <wv-button
        @click="
          clickShowDialog({
            title: '弹窗标题',
            content:
              '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            distinguishCancelAndClose: true
          })
        "
        >iOS-有标题Dialog</wv-button
      >
      <wv-button
        @click="
          clickShowDialog({
            content:
              '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            showCancelButton: false,
            closeOnClickMask: false
          })
        "
        >iOS-无标题Dialog</wv-button
      >
      <wv-button
        @click="
          clickShowDialog({
            title: '弹窗标题',
            content:
              '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            android: true
          })
        "
        >Android-无标题Dialog</wv-button
      >
      <wv-button
        @click="
          clickShowDialog({
            content:
              '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            android: true
          })
        "
        >Android-无标题Dialog</wv-button
      >
    </div>
    <!-- Toast -->
    <div class="mtb-20">
      <div class="fw-400">
        <span class="fs-18">Toast</span><span class="mlr-20">-</span
        ><span class="fs-18">弹出式提示</span>
      </div>
      <hr class="mtb-20" />
      <wv-button @click="clickShowToast({ text: '提示信息' })"
        >纯文本提示</wv-button
      >
      <wv-button @click="clickShowToast({ text: '已完成', type: 'success' })"
        >成功提示</wv-button
      >
      <wv-button @click="clickShowToast({ text: '加载中', type: 'loading' })"
        >加载中提示</wv-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSwitch1: false,
      isCheckbox1: true,
      iconList: [
        "weui-icon-circle",
        "weui-icon-download",
        "weui-icon-info",
        "weui-icon-safe-success",
        "weui-icon-safe-warn",
        "weui-icon-success",
        "weui-icon-success-circle",
        "weui-icon-success-no-circle",
        "weui-icon-waiting",
        "weui-icon-waiting-circle",
        "weui-icon-warn",
        "weui-icon-info-circle",
        "weui-icon-cancel",
        "weui-icon-search",
        "weui-icon-clear",
        "weui-icon-back",
        "weui-icon-delete"
      ]
    };
  },
  methods: {
    clickShowToast(options) {
      this.$wv.showToast(options);
    },
    clickShowDialog(options) {
      this.$wv
        .showDialog(options)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
.mtb-20 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.mlr-20 {
  margin-left: 20px;
  margin-right: 20px;
}
.p-30 {
  padding: 30px;
}
.pl-30 {
  padding-left: 30px;
}
.fs-22 {
  font-size: 22px;
}
.fs-18 {
  font-size: 18px;
}
.fw-400 {
  font-weight: 400;
}
.color-blue {
  color: #409eff;
}
.text-center {
  text-align: center;
}
</style>
