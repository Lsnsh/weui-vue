import LoadMore from './src/load-more';

/* istanbul ignore next */
LoadMore.install = function(Vue) {
  Vue.component(LoadMore.name, LoadMore);
};

export default LoadMore;
