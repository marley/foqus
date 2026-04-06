import { createApp } from 'vue'
import ContentApp from './ContentApp.vue'
import { i18n } from '../i18n'

if (!window.__foqusAppMounted && !document.getElementById('foqus-root')) {
  window.__foqusAppMounted = true

  const root = document.createElement('div')
  root.id = 'foqus-root'
  document.body.appendChild(root)

  createApp(ContentApp).use(i18n).mount(root)
}
