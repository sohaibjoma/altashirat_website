<template>
  <v-container class="py-16">
    <v-card
      class="border-radius-8 overflow-hidden pa-4"
      elevation="1"
      color="bg-input"
    >
      <div
        class="gradient-line"
        :class="{
          'gradient-line-left': isEnglish,
          'gradient-line-right': !isEnglish,
        }"
      ></div>

      <div class="d-flex flex-column">
        <div class="font-weight-bold py-2 text-text">
          {{ $t("account.Settings") }}
        </div>

        <div
          class="d-flex align-center mt-2 cursor-pointer"
          @click="toggleExpandedView"
        >
          <span class="account-subtitle text-text">{{ currentTitle }}</span>
          <v-icon
            :class="{
              'rotate-icon': isExpanded,
            }"
            color="primary"
            class="m-2"
          >
            {{ isExpanded ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </div>
      </div>

      <v-expand-transition>
        <div v-if="isExpanded" class="mt-6 expanded-content">
          <div class="text-center py-12">
            <Image name="delete-account.png" />

            <div class="text-center my-6 text-text">
              {{ $t("account.confirmDeleteMessage") }}
            </div>

            <div class="d-flex justify-center mt-4 gap-4">
              <MainButton
                :text="$t('account.delete')"
                type="button"
                :loading="isLoading"
                @click="openDeleteDialog"
              />

              <OutlinedButton
                :text="$t('account.cancel')"
                color="error"
                :loading="isLoading"
                @click="toggleExpandedView"
              />
            </div>
          </div>
        </div>
      </v-expand-transition>
    </v-card>

    <DeleteAccountDialogue v-model="showDeleteDialog" @confirm="confirmDelete" />
  </v-container>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const emit = defineEmits(["delete-account"]);

const isExpanded = ref(false);
const showDeleteDialog = ref(false);
const isLoading = ref(false);

const isEnglish = computed(() => locale.value === "en");

const titles = computed(() => ({
  collapsed: t("account.SettingsAndDelete"),
  expanded: t("account.PermenantlyDeactivate"),
}));

const currentTitle = computed(() => {
  return isExpanded.value ? titles.value.expanded : titles.value.collapsed;
});

const toggleExpandedView = () => {
  isExpanded.value = !isExpanded.value;
};

const openDeleteDialog = () => {
  showDeleteDialog.value = true;
};

const confirmDelete = (password) => {
  emit("delete-account", password);
};
</script>

<style scoped></style>
