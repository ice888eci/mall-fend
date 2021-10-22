import Config from 'config'

import AmapVueConfig from '@amap/amap-vue/lib/config'
AmapVueConfig.key = Config.dev.amapKey
AmapVueConfig.plugins = ['AMap.ToolBar', 'AMap.MoveAnimation']
export default AmapVueConfig
