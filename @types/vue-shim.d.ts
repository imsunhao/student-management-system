import Vue from 'vue'
import { PageInfo } from 'src/utils/mixins/page-info'

// 扩展定义
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    pageInfo?: PageInfo | ((vm: any) => any)
  }
}
