import { defineNuxtPlugin } from '#app';
import { defineRule, configure } from 'vee-validate';
import { required, email, alpha, confirmed, numeric, min, max } from '@vee-validate/rules';

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

  defineRule('passport', (value: string) => {
    return (value.length >= 14 && value.length <= 20)
  });

  defineRule('perposeOfVisit', (value: string) => {
    return (value.length >= 5 && value.length <= 255)
  });

  defineRule('count', (value: string) => {
    return (value.length > 0 && value.length <= 10)
  });

  defineRule('textarea', (value: string | null | undefined) => {
    if (value == null || value === '') return true; // Allow empty, null, or undefined
    return value.length <= 40000;
  });

  defineRule('images', (value: File[] | File | null) => {
    if (!value) return false; // Fail if no files
    const maxSizeMB = 512;
    const files = Array.isArray(value) ? value : [value];
    return (
      files.length >= 1 &&
      files.length <= 4 &&
      files.every(
        (file) =>
          file.type.startsWith('image/') &&
          file.size <= maxSizeMB * 1024 * 1024
      )
    );
  });

  // Rule for PDFs (max 4 files, max 512MB each)
  defineRule('pdf', (value: File[] | File | null | undefined) => {
    if (value == null || (Array.isArray(value) && value.length === 0)) return true; // Allow empty, null, or undefined
    const maxSizeMB = 512;
    const files = Array.isArray(value) ? value : [value];
    return (
      files.length <= 4 &&
      files.every(
        (file) =>
          file.type === 'application/pdf' &&
          file.size <= maxSizeMB * 1024 * 1024
      )
    );
  });

})