<template>
  <div>
    <el-menu default-active="home" @open="handleOpen" @close="handleClose">
      <el-menu-item index="home">
        <i class="el-icon-menu"></i>
        <span class="menu-home" slot="title">欢迎页面</span>
      </el-menu-item>
      <el-submenu index="user">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span class="menu-user">学生管理</span>
        </template>
        <el-menu-item index="user-base">基础信息</el-menu-item>
        <el-menu-item index="user-class">班级维护</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Message } from 'element-ui'
import { getState, dispatch, getGetter } from 'src/store'

export default {
  pageInfo(vm) {
    return {
      subTitle: vm.subTitle,
      description: '学生管理系统',
      keywords: '学生管理系统',
    }
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
