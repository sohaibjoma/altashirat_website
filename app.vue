<template>
  <v-app>
    <div :dir="$vuetify.locale.isRtl ? 'rtl' : 'ltr'">
      <Notifications />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </v-app>
</template>
