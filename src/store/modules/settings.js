import { defineStore } from 'pinia'

import defaultSettings from '@/settings'
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      showSettings: showSettings,
      fixedHeader: fixedHeader,
      sidebarLogo: sidebarLogo,
    }
  },
})

export default useSettingsStore
