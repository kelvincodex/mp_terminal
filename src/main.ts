import { createApp } from 'vue'
import {router} from "./router";
import "./assets/css/base-style.css"
import "./assets/css/index.css"
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'maz-ui/css/main.css'
import { installToaster, ToasterOptions, installWait} from 'maz-ui'
import pinia from "@/util/PiniaUtil.ts";
import ConfirmationService from 'primevue/confirmationservice';


// DEFAULT OPTIONS
const toasterOptions: ToasterOptions = {
    position: 'bottom-right',
    timeout: 10_000,
    persistent: false,
  }

const app = createApp(App)
app.use(installToaster, toasterOptions)
app.use(installWait)
app.use(ConfirmationService)
app.use(PrimeVue, {
  unstyled: false,
});
app.use(pinia)
app.use(router)


app.mount("#app")

