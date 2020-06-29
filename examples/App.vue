<template>
  <div class="page">
    <div class="page-header">
      <div style="font-size: 32px;">WeUI-Vue</div>
      <div style="color: rgba(0, 0, 0, 0.5);">
        WeUI-Vue 是基于 WeUI 封装的第三方 Vue 组件库，WeUI
        是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。
      </div>
    </div>
    <div class="page-main">
      <!-- 表单 -->
      <div class="section">
        <div class="section-header">表单</div>
        <div class="section-main">
          <!-- Button -->
          <div class="section-item">
            <div class="section-item-header">
              <span>Button - 按钮</span>
            </div>
            <div class="section-item-main">
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
          </div>
          <!-- Input -->
          <div class="section-item">
            <div class="section-item-header">
              <span>Input - 输入框</span>
            </div>
            <div class="section-item-main">
              <div style="background: #efef;">
                <wv-input
                  v-model="sInputText1"
                  label="微信号"
                  placeholder="请输入微信号"
                ></wv-input>
                <wv-input
                  v-model="sInputText2"
                  label="昵称"
                  placeholder="请输入昵称"
                ></wv-input>
              </div>
            </div>
          </div>
          <!-- Switch -->
          <div class="section-item">
            <div class="section-item-header">
              <span>Switch - 开关</span>
            </div>
            <div class="section-item-main">
              <wv-switch v-model="isSwitch1">开关</wv-switch>
            </div>
          </div>
          <!-- Checkbox -->
          <div class="section-item">
            <div class="section-item-header">
              <span>Checkbox - 复选框</span>
            </div>
            <div class="section-item-main">
              <wv-checkbox v-model="isCheckbox1">复选框</wv-checkbox>
            </div>
          </div>
        </div>
      </div>
      <!-- 基础组件 -->
      <div class="section">
        <div class="section-header">基础组件</div>
        <div class="section-main">
          <!-- Icon -->
          <div class="section-item">
            <div class="section-item-header">
              <span>Icon - 图标</span>
            </div>
            <div class="section-item-main">
              <div
                v-for="sIcon in iconList"
                :key="sIcon"
                style="text-align: center;"
              >
                <div class="h-80 lh-80">
                  <i :class="sIcon" style="font-size: 0.5rem;"></i>
                </div>
                <div class="h-90 vh-parent">
                  <div class="v w-p100 fs-24 color-grey">
                    {{ sIcon }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- LoadMore -->
          <div class="section-item">
            <div class="section-item-header">
              <span>LoadMore - 加载更多</span>
            </div>
            <div class="section-item-main">
              <wv-load-more tips="正在加载"></wv-load-more>
              <wv-load-more tips="暂无数据" :loading="false"></wv-load-more>
              <wv-load-more :loading="false"></wv-load-more>
            </div>
          </div>
        </div>
      </div>
      <!-- 操作反馈 -->
      <div class="section">
        <div class="section-header">操作反馈</div>
        <div class="section-main">
          <!-- Dialog -->
          <div class="section-item">
            <div class="section-item-header">
              <span>Dialog - 对话框</span>
            </div>
            <div class="section-item-main">
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
          </div>
          <!-- Toast -->
          <div class="section-item">
            <div class="section-item-header">
              <span>Toast - 弹出式提示</span>
            </div>
            <div class="section-item-main">
              <wv-button @click="clickShowToast({ text: '提示信息' })"
                >纯文本提示</wv-button
              >
              <wv-button
                @click="clickShowToast({ text: '已完成', type: 'success' })"
                >成功提示</wv-button
              >
              <wv-button
                @click="clickShowToast({ text: '加载中', type: 'loading' })"
                >加载中提示</wv-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSwitch1: false,
      isCheckbox1: true,
      sInputText1: "",
      sInputText2: "",
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

<style lang="less">
@import "./main.less";
</style>

<style scoped>
/* .page {} */
.page-header {
  padding: 30px;
}
.page-main {
  text-align: center;
}
.section-header {
  padding: 10px 0;
  text-align: center;
  font-size: 22px;
  color: #409eff;
}
/* .section-main {} */
.section-item {
  margin-bottom: 20px;
}
.section-item-header {
  padding: 10px;
  border-radius: 2px;
  text-align: center;
  font-size: 18px;
  color: #6f6f6f;
  background: #ffffff;
}
.section-item-main {
  padding: 20px 0;
}
</style>
