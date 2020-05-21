import Vue from 'vue'

function getHookFromComponent(compo: any, name: string) {
  return (
    compo[name] ||
    (compo.$options && compo.$options[name]) ||
    (compo.options && compo.options[name]) ||
    (compo.constructor && compo.constructor[name]) ||
    (compo.super && compo.super[name])
  )
}

/**
 * 用于更新页面 title/description 等 SEO 相关的配置
 */
export interface PageInfo {
  title?: string
  subTitle?: string
  subTitlePrefix?: string
  keywords?: string
  description?: string
}

function getPageInfoTitle(pageInfo: PageInfo) {
  if (pageInfo.title) return pageInfo.title
  if (typeof pageInfo.subTitle === 'string') {
    return (pageInfo.subTitlePrefix || '学生管理系统 - ') + pageInfo.subTitle
  }
}

/**
 * 获取组件上的 'pageInfo', 用于更新页面 标题/meta 等
 */
export function getPageInfo(vm: Vue): PageInfo {
  const pageInfo = getHookFromComponent(vm, 'pageInfo')
  if (pageInfo) {
    // 以后可能需要 i18n
    const info = typeof pageInfo === 'function' ? pageInfo.call(vm) : pageInfo
    info.title = getPageInfoTitle(info)
    return info
  }
}

export const ServerVuePageInfoMixin = {
  created() {
    const pageInfo = getPageInfo(this)
    if (pageInfo) {
      this.$ssrContext.pageInfo = pageInfo
    }
  },
}
