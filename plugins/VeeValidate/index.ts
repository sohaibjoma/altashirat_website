import { defineNuxtPlugin } from '#app';
import { defineRule, configure } from 'vee-validate';
import { required, email, alpha, confirmed, numeric, min, max  } from '@vee-validate/rules';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    const t = nuxtApp.vueApp.config.globalProperties.$t; // Access the translation function

    // Configure validation messages
    configure({
      generateMessage: ({ field, rule }) => {
        return t(`validation.${rule?.name}`, { field });
      },
    });
  });
  // Register Validation Rules Globally
  defineRule('required', required);
  defineRule('email', email);
  defineRule('alpha', alpha);
  defineRule('confirmed', confirmed);
  defineRule('numeric', numeric);
  defineRule('min', min);
  defineRule('max', max);

  defineRule('nameLength', (value: string) => {
    return (value.length >= 3 && value.length <= 15)
  });
  
  defineRule('middleName', (value: string) => {
    return (value.length <= 15)
  });
  
  defineRule('password', (value: string) => {
    return (value.length >= 8 && value.length <= 50)
  });

  defineRule('phoneNum', (value: string) => {
    return (value.length >= 9 && value.length <= 15)
  });

  defineRule('phoneCode', (value: string) => {
    return (value.length >= 3 && value.length <= 5)
  });

  defineRule('mailLength', (value: string) => {
    return (value.length <= 50)
  });

})