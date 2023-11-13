import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
export default [
  vue({ script: { defineModel: true, globalTypeFiles: ['./types/component-type.d.ts'] } }),
  vueJsx(),
  /* 打包分析插件 */
  visualizer(),
  /* 原子化CSS插件 */
  UnoCSS(),
  /* 自动导入 */
  AutoImport({
    /* 默认导入vue vue-router 方法 */
    imports: [
      'vue',
      'vue-router',
      {
        '@vueuse/core': [
          // 'useAsyncState' // import { useAsyncState } from '@vueuse/core',
          'useTitle'
        ]
      }
    ],
    /* 声明文件位置 */
    dts: 'types/auto-imports.d.ts',
    /* 其他目录自动导入,建议不使用,有点混乱 */
    dirs: ['src/autoImport/composables', 'src/autoImport/utils'],
    resolvers: [ElementPlusResolver({}), IconsResolver()]
  }),
  Components({
    resolvers: [
      ElementPlusResolver(),
      VueUseComponentsResolver(),
      IconsResolver({
        prefix: 'icon',
        alias: {}
      })
    ],
    extensions: ['jsx', 'tsx', 'vue'],
    dirs: ['src/autoImport/components'],
    //组件名称包含目录，防止同名组件冲突
    directoryAsNamespace: true,
    //指定类型声明文件，为true时在项目根目录创建
    dts: 'types/components.d.ts'
  }),
  Icons({
    autoInstall: true
  })
]
