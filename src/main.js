import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { defineRule } from 'vee-validate';
import { BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import App from './App.vue';
import router from './router';

defineRule('confirmed', (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return 'Passwords must match.';
});

defineRule('required', (value) => {
  if (!value || !value.length) {
    return 'This field is required';
  }
  return true;
});

const app = createApp(App);

app.use(BootstrapVueIcons);
app.use(createPinia());
app.use(router);

app.mount('#app');
