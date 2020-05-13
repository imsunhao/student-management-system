import { TStore } from 'store'
import { VuexStoreHelper } from '@web-steps/helper'

export const { makeWrapper } = new VuexStoreHelper<TStore.State, TStore.Getters>()

export const globalHelper = makeWrapper()
