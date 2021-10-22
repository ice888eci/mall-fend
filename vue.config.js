const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
const pxtovw = require('postcss-px-to-viewport')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const externals = {
  vue: 'Vue',
  axios: 'axios',
  Vant: 'Vant',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
}

const cdn = {
  css: [
    // vant css
    'https://cdn.bootcdn.net/ajax/libs/vant/2.12.25/index.css',
  ],
  js: [
    // vue
    'https://cdn.jsdelivr.net/npm/vue@2.6/dist/vue.min.js',
    // vue-router
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.1/vue-router.min.js',
    // vuex
    'https://cdn.bootcdn.net/ajax/libs/vuex/3.2.0/vuex.min.js',
    // axios
    'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
    // vant
    `https://cdn.bootcdn.net/ajax/libs/vant/2.12.25/vant.min.js`,
  ],
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 公共路径
  productionSourceMap: false,
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  parallel: require('os').cpus().length > 1,

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('styles', resolve('./src/assets/styles'))
      .set('img', resolve('./src/assets/img'))
      .set('svg', resolve('./src/assets/svg'))
      .set('components', resolve('./src/components'))
      .set('config', resolve('./src/config'))
      .set('views', resolve('./src/views'))
      .set('utils', resolve('./src/utils'))
    if (isProduction) {
      config.plugins.delete('preload') // 删除预加载
      config.plugins.delete('prefetch') // 删除预加载
      config.optimization.minimize(true) // 压缩代码
      config.optimization.splitChunks({ chunks: 'all' }) // 分割代码

      // config.externals(externals)
      // config.plugin('html').tap((args) => {
      //   args[0].cdn = cdn
      //   return args
      // })
    }
  },

  configureWebpack: (config) => {
    if (isProduction) {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // warnings: false,
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      )
    }
  },

  css: {
    loaderOptions: {
      // sourceMap: false,
      sass: {},
      css: {},
      postcss: {
        //给postcss-loader传递选项
        plugins: [
          new pxtovw({
            unitToConvert: 'px', //需要转换的单位，默认为"px"；
            viewportWidth: 375, //设计稿的视口宽度
            unitPrecision: 5, //单位转换后保留的小数位数
            propList: ['*'], //要进行转换的属性列表,*表示匹配所有,!表示不转换
            viewportUnit: 'vw', //转换后的视口单位
            fontViewportUnit: 'vw', //转换后字体使用的视口单位
            selectorBlackList: [], //不进行转换的css选择器，继续使用原有单位
            minPixelValue: 1, //设置最小的转换数值
            mediaQuery: false, //设置媒体查询里的单位是否需要转换单位
            replace: true, //是否直接更换属性值，而不添加备用属性
            exclude: [/node_modules/, /Tabbar/, /Navbar/], //忽略某些文件夹下的文件
          }),
        ],
      },
    },
  },
}
