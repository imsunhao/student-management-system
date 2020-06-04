import { Api } from 'request'
import axios from 'src/utils/axios.ts'
import { createAxiosHelper } from 'src/api/helper'

export const userApi = createAxiosHelper<Api.User>(axios, 'api', 'user')

