/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 环境变量 以VITE_开头, HTML中支持%VITE_APP% 方式使用
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
