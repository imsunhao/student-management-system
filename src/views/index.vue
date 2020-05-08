<template>
  <div>
    <p id="context">测试更新代码</p>
    <p id="context">INJECT_CONTEXT: {{ INJECT_CONTEXT }}</p>
  </div>
</template>

<script>
import { hostGlobal } from '../envs'

export default {
  pageInfo() {
    return {
      title: '学生管理系统',
      description: '学生管理系统',
      keywords: '学生管理系统',
    }
  },
  data() {
    return {
      INJECT_CONTEXT: hostGlobal.__INJECT_CONTEXT__,
    }
  },
}
</script>

<style lang="scss">
#context {
  color: red;
}
</style>
