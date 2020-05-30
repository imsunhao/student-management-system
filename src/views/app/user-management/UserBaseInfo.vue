<template>
  <div>
    这个页面应该是用户基础信息修改
  </div>
</template>

<script lang="ts">
import { getState, getGetter } from 'src/store'

export default {
  pageInfo: {
    title: '学生管理系统 - 用户管理 - 基础信息修改',
  },
  data() {
    return {
      subTitle: '欢迎页面 222',
    }
  },
  computed: {
    storeUser() {
      return getState(this.$store, 'user')
    },
    hasUser() {
      return getGetter(this.$store, 'hasUser')
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>
