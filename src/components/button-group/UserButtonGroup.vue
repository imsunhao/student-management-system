<template>
  <div>
    <el-button id="login" type="primary" v-if="!hasUser && hasLocalUser" @click="login">登录</el-button>
    <el-button id="logout" type="primary" v-if="hasUser" @click="logout">退出</el-button>
  </div>
</template>

<script lang="ts">
import { Message } from 'element-ui'
import { dispatch, getGetter } from 'src/store'

export default {
  props: {
    // User.login
    user: Object,
  },
  computed: {
    hasUser() {
      return getGetter(this.$store, 'hasUser')
    },
    hasLocalUser() {
      return this.user
    },
  },
  methods: {
    async login() {
      if (!this.hasLocalUser) return
      try {
        await dispatch(this.$store, 'FETCH_USER', {
          data: this.user,
          ssr: undefined,
        })
        Message.success({ message: '登录成功', customClass: 'login-success' })
        if (this.$route.name === 'Home') {
          this.$router.push({ name: 'App' })
        }
      } catch (e) {
        Message.error(e)
      }
    },
    async logout() {
      try {
        await dispatch(this.$store, 'USER_LOGOUT', { ssr: undefined })
        Message.success({ message: '用户退出', customClass: 'logout-success' })
        if (this.$route.name !== 'Home') {
          this.$router.push({ name: 'Home' })
        }
      } catch (e) {
        Message.error(e)
      }
    },
  },
}
</script>
