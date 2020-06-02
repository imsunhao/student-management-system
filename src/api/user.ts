import { Api } from 'request'
import { TUser } from 'schema'
import axios from 'src/utils/axios.ts'

import { createActorHelper } from 'server/router/helper'

export const userApi = createActorHelper<Api.User, TUser>(axios, 'api', 'user')
