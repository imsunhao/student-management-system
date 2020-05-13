<template>
  <div>
    <h1 id="title">学生管理系统</h1>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户ID">
        <el-input v-model="user.ID"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="user.password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" v-if="!hasUser" @click="login">登录</el-button>
    <el-button type="primary" v-if="hasUser" @click="logout">退出</el-button>
    <div v-if="hasUser">
      <h3>ID: {{ storeUser.ID }}</h3>
      <h3>name: {{ storeUser.name }}</h3>
      <h3>role: {{ storeUser.role }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from 'request'
import { Message } from 'element-ui'
import { getState, dispatch, getGetter } from 'src/store'

const createUser = () => {
  const user: User.login = {
    ID: 'admin',
    password: '123456',
  }
  return user
}

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
      user: createUser(),
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
    async login() {
      try {
        await dispatch(this.$store, 'FETCH_USER', {
          data: this.user,
          ssr: undefined,
        })
        Message.success('登录成功')
      } catch (e) {
        Message.error(e)
      }
    },
    async logout() {
      try {
        await dispatch(this.$store, 'USER_LOGOUT', { ssr: undefined })
        Message.success('退出登录成功')
      } catch (e) {
        Message.error(e)
      }
    },
  },
}
</script>
