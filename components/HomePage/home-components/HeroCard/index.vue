<template>
  <section>
    <v-card
      class="pt-3 px-1 rounded-xl home__card--shadow d-flex justify-center align-center flex-column"
    >
      <div class="rounded-xl w-50">
        <div class="bg-secondary rounded-xl py-3 home__card__img__shadow">
          <Image :name="cardName" width="40" height="40" />
        </div>
      </div>
      <v-card-actions class="justify-center mb-2 mt-1">
        <v-btn class="bg-primary text-white w-75 px-7" rounded="pill"
          >{{title}}</v-btn
        >
      </v-card-actions>
    </v-card>
  </section>
</template>

<script setup>
const props = defineProps({
  cardName: String,
  title: String
})
</script>

<style scoped>
.home__card--shadow {
  box-shadow: 0 4px 10px 10px rgba(176, 211, 255, 0.41);
  width:170px;
}
</style>
