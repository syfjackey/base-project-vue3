import type { App } from 'vue'
const files: Record<string, { default: any }> = import.meta.glob('@/directives/*.ts', { eager: true })
export default (app: App) => {
  Object.keys(files).forEach((key) => {
    const nameArr = key.split('/')
    const directiveName = convertCamelCase(nameArr[nameArr.length - 1].replace(/\.ts$/, ''))
    app.directive(directiveName, files[key].default)
  })
}
function convertCamelCase(name: string, capitalFirstLetter = false): string {
  const reg = /-(.)/g
  const str = name.replace(reg, (_, g1) => {
    return g1.toUpperCase()
  })
  const list = [...str]
  capitalFirstLetter && (list[0] = list[0].toUpperCase())
  return list.join('')
}
