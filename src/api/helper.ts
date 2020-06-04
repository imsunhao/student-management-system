import { createRequestHelper, SERVER_ROUTER_METHOD } from '@web-steps/helper-api'

export const { createAxiosHelper, createRouterHelper, SERVER_ROUTER_CONFORMATION } = createRequestHelper({
  api: {
    children: {
      user: {
        children: {
          login: {
            method: SERVER_ROUTER_METHOD.POST,
          },
          logout: {
            method: SERVER_ROUTER_METHOD.POST,
          },
          register: {
            method: SERVER_ROUTER_METHOD.POST,
          },
        },
      },
    },
  },
})
