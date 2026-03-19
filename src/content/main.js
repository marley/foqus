import { createApp } from 'vue'
import ContentApp from './ContentApp.vue'

const root = document.createElement('div')
root.id = 'foqus-root'
document.body.appendChild(root)

createApp(ContentApp).mount(root)
