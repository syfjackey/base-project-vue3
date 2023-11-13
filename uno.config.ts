import { defineConfig, presetIcons, presetUno } from 'unocss'
// 支持 @apply、@screen theme() 指令
import transformerDirectives from '@unocss/transformer-directives'
import fs from 'node:fs'
import path from 'node:path'
// 不管用到用不到都会生成样式, 比如:从后端返回的icon名称
const svgDir = path.join(__dirname, 'src/assets/svg')
function getSvg() {
  const files = fs.readdirSync(svgDir)
  return files
    .filter((file) => file.endsWith('.svg'))
    .reduce((svgs, file) => {
      const arr = file.split('.')
      arr.pop()
      const fileName = arr.join('.').toLowerCase()
      const filePath = path.join(__dirname, `src/assets/svg/${file}`)
      svgs[fileName] = () => fs.readFileSync(filePath, 'utf-8')
      return svgs
    }, {})
}
const autoImport = []
export default defineConfig({
  rules: [
    ['flex-h', { display: 'flex', 'flex-direction': 'column' }],
    ['flex-w', { display: 'flex', 'flex-direction': 'row' }],
    ['flex-fit-h', { height: 0, overflow: 'hidden', flex: 1 }],
    ['flex-fit-w', { width: 0, overflow: 'hidden', flex: 1 }],
    ['flex-center', { display: 'flex', 'align-items': 'center', 'justify-content': 'center' }],
    ['box-fit', { width: '100%', height: '100%' }],
    ['box-fit-hidden', { width: '100%', height: '100%', overflow: 'hidden' }]
  ],
  presets: [
    presetUno(), // 默认设置
    presetIcons({
      // 默认附带属性
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      },
      prefix: 'i-',
      autoInstall: true,
      collections: {
        /* 自定义图标 使用方式为 i-custom:图标名称 */
        custom: {
          ...getSvg()
        }
        /* 预载对应icon */
        // carbon: () => import('@iconify-json/carbon/icons.json').then((i) => i.default),
      }
    })
  ],
  transformers: [transformerDirectives()],
  safelist: autoImport
})
