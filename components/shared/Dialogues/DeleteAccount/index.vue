<template>
  <v-dialog v-model="dialogModel" max-width="500px" persistent>
    <v-card class="pa-4">
      <div class="d-flex justify-center">
        <div class="gradient-banner"></div>
      </div>

      <div class="text-center my-4">
        <h3 class="font-weight-bold text-text">
          {{ $t("account.confirmDelete") }}
        </h3>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="px-4">
          <div class="my-4 text-center">
            <h class="font-weight-bold text-text">
              {{ $t("account.passwordForDeletion") }}
            </h>
          </div>

          <Password
            v-model="password"
            :label="$t('account.enterPasswordForDelete')"
            class="mb-6"
            name="password"
            rules="required|min:8|max:50"
          />

          <div class="d-flex justify-center gap-4 my-4">
            <MainButton
              :text="$t('account.delete')"
              type="submit"
              :loading="isSubmitting"
            />

            <OutlinedButton
              :text="$t('account.cancel')"
              color="error"
              :loading="isSubmitting"
              @click="closeDialog"
            />
          </div>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const password = ref("");
const isSubmitting = ref(false);

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

watch(dialogModel, (newVal) => {
  if (!newVal) {
    password.value = "";
  }
});

const closeDialog = () => {
  emit("update:modelValue", false);
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;

    emit("confirm", password.value);

    password.value = "";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped></style>
