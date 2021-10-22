module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // 它会在编译过程中将 import 的写法自动转换为按需引入的方式。
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
    [
      'import',
      {
        libraryName: '@amap/amap-vue',
        libraryDirectory: 'lib',
        camel2DashComponentName: true,
      },
    ],
  ],
}
