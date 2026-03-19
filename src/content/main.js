import { createApp } from 'vue'
import ContentApp from './ContentApp.vue'

if (!window.__foqusAppMounted && !document.getElementById('foqus-root')) {
  window.__foqusAppMounted = true

  const root = document.createElement('div')
  root.id = 'foqus-root'
  document.body.appendChild(root)

  createApp(ContentApp).mount(root)
}
