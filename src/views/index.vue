<template>
  <div>
    <h1 id="title">学生管理系统</h1>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户ID">
        <el-input id="user-id" v-model="user.ID"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input id="user-password" v-model="user.password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <userButtonGroup v-bind="{ user }" />
    <div v-if="hasUser">
      <h3>ID: {{ storeUser.ID }}</h3>
      <h3>name: {{ storeUser.name }}</h3>
      <h3>role: {{ storeUser.role }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { getState, getGetter } from 'src/store'
import userButtonGroup from 'src/components/button-group/UserButtonGroup.vue'

const createUser = () => {
  const user = {
    ID: '',
    password: '',
  }
  return user
}

export default {
  components: {
    userButtonGroup,
  },
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
  methods: {},
}
</script>
