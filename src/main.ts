import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

import App from './App.vue'
import router from './router'
import i18n from './services/i18n'

import { defaultClient } from '@/services/apolloClient'
import { ApolloClients, provideApolloClient } from '@vue/apollo-composable'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(mdiVue, { icons: mdijs })

app.provide(ApolloClients, [defaultClient])
provideApolloClient(defaultClient)

app.mount('#app')
