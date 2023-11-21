import { path } from '@vuepress/utils'
import { defineUserConfig } from 'vuepress'
import banner from 'vite-plugin-banner'
import head from './.vuepress/head'
import sidebar from './.vuepress/sidebar'
import pkg from './package.json'
import type { DefaultThemeOptions } from 'vuepress'

const isDev: boolean = process.env.NODE_ENV === 'development' ? true : false

export default defineUserConfig<DefaultThemeOptions>({
  /**
   * 基础配置
   */
  base: '/gisdoc/',
  lang: 'zh-CN',
  dest: './dist',
  title: 'Gis 知识',
  description:
    '为了专业课学习',
  head,

  /**
   * 主题相关
   */
  clientAppEnhanceFiles: path.resolve(
    __dirname,
    './.vuepress/clientAppEnhance.ts'
  ),
  themeConfig: {
    logo: 'https://cdn.jsdelivr.net/gh/chengpeiquan/learning-vue3@gh-pages/assets/img/vue3.png',
    navbar: [
      {
        text: '博客首页',
        link: 'https://www.google.com/',
      },
      // {
      //   text: '菜谱教程',
      //   link: 'https://github.com/chengpeiquan/cooking-cookbook',
      // },
    ],
    sidebar,
    sidebarDepth: 3,
    smoothScroll: true,
    // repo: 'chengpeiquan/learning-vue3',
    docsDir: 'docs',
    docsBranch: 'main',
    lastUpdated: true,
    editLinks: true,
  },

  /**
   * Markdown相关
   */
  markdown: {
    extractHeaders: {
      level: [2, 3, 4],
    },
  },

  /**
   * 开发相关
   */
  port: isDev ? 2000 : 80,
  alias: {
    '@img': path.resolve(__dirname, './public/img'),
  },

  /**
   * 打包相关
   */
  dest: './dist',
  temp: './.temp',
  cache: './.cache',
  public: './public',
  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
    viteOptions: {
      base: isDev
        ? '/'
        : 'https://cdn.jsdelivr.net/gh/chengpeiquan/learning-vue3@gh-pages/',
      plugins: [
        banner({
          outDir: path.resolve(__dirname, './dist'),
          content: `/**\n * name: ${pkg.name}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
        }),
      ],
    },
  },

  /**
   * 插件相关
   */
  plugins: [
    // 组件注册
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './.vuepress/components'),
      },
    ],
    // 搜索
    [
      '@vuepress/docsearch',
      {
        appId: '5LYK75VPNC',
        apiKey: '1d995a4b40491d50f3e8d607e5667017',
        indexName: 'chengpeiquan',
      },
    ],
  ],
})
