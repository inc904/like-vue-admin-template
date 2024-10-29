import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

const useAppStore = defineStore('app', {
  state: () => {
    return {
      sidebar: {
        opened: true,
        withoutAnimation: false,
      },
      device: 'desktop',
    }
  },
  actions: {
    toggleSideBar() {
      console.log('toggleSideBar')
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
  },
})

export default useAppStore
