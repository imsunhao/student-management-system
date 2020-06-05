<template>
  <div>
    <userButtonGroup />
    <div class="content">
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
      <transition name="fade" mode="out-in">
        <router-view class="body">
          <h1>router-view</h1>
        </router-view>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { getGetter } from 'src/store'
import userButtonGroup from 'src/components/button-group/UserButtonGroup.vue'

@Component({
  components: {
    userButtonGroup,
  },
  pageInfo: {
    title: '学生管理系统',
  },
} as any)
export default class APP extends Vue {
  subTitle = '欢迎页面 222'

  get storeUser() {
    return this.$store.state.user
  }

  get hasUser() {
    return getGetter(this.$store, 'hasUser')
  }

  handleOpen(key, keyPath) {
    console.log(key, keyPath)
  }

  handleClose(key, keyPath) {
    console.log(key, keyPath)
  }
}
</script>
