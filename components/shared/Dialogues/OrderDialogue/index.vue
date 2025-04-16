<template>
  <v-dialog v-model="dialogModel" max-width="800">
    <v-card class="rounded-lg">
      <div class="d-flex justify-center">
        <div class="gradient-top-border"></div>
      </div>

      <div class="text-center mb-8 mt-2">
        <h4 class="font-weight-bold text-text">
          {{ $t("order.popupTitle") }}
        </h4>
      </div>

      <div class="d-flex gap-2 pe-md-4 flex-wrap justify-center">
        <!-- ----left side---- -->
        <section class="d-flex flex-column w-lg-50 mb-4 popup__section">
    
          <!-- ---------------------first card----------------- -->
          <v-card class="pb-4 ms-4 mb-4 mb-lg-0 card__popup" v-if="props.selectedItem">
            <!-- ----header---- -->
            <div class="d-flex align-center me-8 me-lg-0">
              <div class="orders__cards__h--starter me-2"></div>
              <Image
                name="profile-form-icon.png"
                alt="profile tile image"
                width="25"
              />
              <h4 class="font-weight-bold text-text pt-4 ps-2">
                {{ $t("order.personalInfo") }}
              </h4>
            </div>
            <!-- --------header end------- -->

            <article class="ms-10 mt-4">
              <div>
                <v-icon color="secondary">mdi-account</v-icon>
                <span class="ms-2 text-text">{{
                  props.selectedItem?.firstname || "N/A"
                }}</span>
              </div>

              <div class="mt-2">
                <v-icon color="secondary">mdi-cellphone</v-icon>
                <span class="ms-2 text-text">{{
                  props.selectedItem?.user?.phone.number || "N/A"
                }}</span>
              </div>

              <div class="mt-2">
                <v-icon color="secondary">mdi-email</v-icon>
                <span class="ms-2 text-text">{{
                  props.selectedItem?.user.email || "N/A"
                }}</span>
              </div>
            </article>
          </v-card>


          <!-- ---------------------------------second card-------------------------------- -->
          <v-card class="pb-8 ms-4 mt-lg-5 pe-10 pe-lg-0 card__popup" v-if="props.selectedItem">
            <!-- ----header---- -->
            <div class="d-flex align-center me-8 me-lg-0">
              <div class="orders__cards__h--starter me-2"></div>
              <Image name="orders.png" alt="profile tile image" width="25" />
              <h4 class="font-weight-bold text-text mb-3 pt-4 ps-2">
                {{ $t("order.orderStatus") }}
              </h4>
            </div>
            <!-- --------header end------- -->

            <article class="ms-10 mt-3"><StatusTimeline
              :statuses="props.selectedItem.statuses"/></article>
          </v-card>
        </section>


        <!-- -------------------------right side----------------------- -->
        <section class="w-full pb-4">
          <v-card class="w-full mb-2 ms-4 pe-4 pe-md-0 popup__section card__popup" v-if="props.selectedItem" >
            <!-- ----header---- -->
            <div class="d-flex align-center pe-4">
              <div class="orders__cards__h--starter me-2"></div>
              <Image name="tourism.png" alt="profile tile image" width="25" />
              <h4 class="font-weight-bold text-text mb-3 pt-4 ps-2">
                {{ $t("order.orderInfo") }}
              </h4>
            </div>
            <!-- --------header end------- -->

            <article class="ms-10">
              <div>
                <v-icon color="secondary">mdi-flag</v-icon>
                <span class="ms-2 text-text">{{
                  props.selectedItem?.destination_country.name || "N/A"
                }}</span>
              </div>

              <div class="mt-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.294 0v6.375c-2.137-.36-4.07 1.276-4.117 3.402a3.507 3.507 0 0 0 .604 2.053c.463.686.572.904.572 1.478v.81h-.314a2.63 2.63 0 0 0-2.627 2.627v2.079h1.176V20H1.176V0h14.118zm2.353 18.824V20h-5.882v-1.176h5.882zM5.882 12.94a2.356 2.356 0 0 0-2.353 2.353 2.356 2.356 0 0 0 2.353 2.353 2.356 2.356 0 0 0 2.353-2.353 2.356 2.356 0 0 0-2.353-2.353zm11.49 2.353c.802 0 1.452.65 1.452 1.451v.902h-8.236v-.902c0-.801.65-1.45 1.451-1.45zm-11.49-1.176a1.176 1.176 0 1 1 0 2.353 1.176 1.176 0 0 1 0-2.353zm8.79-6.615a2.353 2.353 0 0 1 1.98 3.673c-.514.757-.77 1.217-.77 2.132v.81H13.53v-.81c0-.917-.26-1.377-.774-2.137a2.341 2.341 0 0 1-.401-1.368 2.363 2.363 0 0 1 2.317-2.3zM8.823 10H3.529v1.176h5.295V10zm0-2.353H3.529v1.177h5.295V7.647zm2.352-2.353H3.53v1.177h7.647V5.294zM7.647 2.941H3.53v1.177h4.118V2.94z"
                    fill="#65BCF9"
                    fill-rule="evenodd"
                  />
                </svg>

                <span class="ms-2 text-text">{{
                  props.selectedItem?.purpose_of_visit || t("order.noMessage")
                }}</span>
              </div>

              <div class="mt-3">
                <v-icon color="secondary">mdi-account</v-icon>
                <span class="ms-2 text-text">{{
                  props.selectedItem?.adults_count || t("order.noMessage")
                }}</span>
              </div>

              <div class="mt-3">
                <v-icon color="secondary">mdi-human-child</v-icon>
                <span class="ms-2 text-text">{{
                  props.selectedItem?.children_count || t("order.noMessage")
                }}</span>
              </div>

              <div class="mt-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 .5A7.504 7.504 0 0 0 .5 8a7.496 7.496 0 0 0 1.03 3.764l-1.017 3.05a.25.25 0 0 0 .317.316l2.917-.972A7.494 7.494 0 0 0 8 15.5c4.14 0 7.5-3.36 7.5-7.5C15.5 3.86 12.14.5 8 .5zM5.495 7.25c.411 0 .75.339.75.75s-.339.75-.75.75a.753.753 0 0 1-.75-.75c0-.411.339-.75.75-.75zm2.507 0c.41 0 .75.339.75.75s-.34.75-.75.75A.754.754 0 0 1 7.25 8c0-.411.338-.75.75-.75zm2.493 0c.411 0 .75.339.75.75s-.339.75-.75.75a.754.754 0 0 1-.75-.75c0-.411.339-.75.75-.75z"
                    fill="#65BCF9"
                    fill-rule="evenodd"
                  />
                </svg>

                <span class="ms-2 text-text">{{
                  props.selectedItem?.message || t("order.noMessage")
                }}</span>
              </div>

              <div
                class="mt-3 ga-1 d-flex"
                v-if="props.selectedItem?.attachments"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.127 6.736A5.15 5.15 0 0 0 8 2C5.691 2 3.71 3.5 3.07 5.686A4.573 4.573 0 0 0 0 10c0 2.52 2.05 4.571 4.571 4.571H12c2.206 0 4-1.794 4-4 0-1.799-1.183-3.344-2.873-3.835zm-2.313 1.769a.572.572 0 0 1-.528.352H9.143v2.286a1.143 1.143 0 0 1-2.286 0V8.857H5.714a.572.572 0 0 1-.404-.975l2.286-2.286a.57.57 0 0 1 .808 0l2.286 2.286c.163.163.212.409.124.623z"
                    fill="#65BCF9"
                    fill-rule="evenodd"
                  />
                </svg>

                <span
                  class="ms-2 text-decoration-none"
                  v-for="(item, index) in props.selectedItem?.passport_images"
                  :key="index"
                >
                  <a :href="item.path" download="attatchment" target="_blank">
                    <span class="d-flex flex-column align-items-center">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        class="ms-1"
                      >
                        <g fill-rule="nonzero" fill="none">
                          <path
                            d="M31.959 17.142c.027-.378.041-.758.041-1.142 0-8.837-7.163-16-16-16S0 7.163 0 16c0 7.36 4.97 13.56 11.738 15.425L31.96 17.142z"
                            fill="#C30B15"
                          />
                          <path
                            d="M31.959 17.142 19.687 4.87 7.443 27.13l4.295 4.295C13.095 31.8 14.524 32 16 32c8.453 0 15.373-6.555 15.959-14.858z"
                            fill="#85080E"
                          />
                          <path
                            fill="#FFF"
                            d="m17.395 20.87-1.413-16H7.444v14.608z"
                          />
                          <path
                            fill="#E8E6E6"
                            d="M24.556 19.478V9.74l-3.478-1.391-1.391-3.478h-3.705l.022 16z"
                          />
                          <path fill="#FFF" d="M19.687 9.74V4.87l4.87 4.87z" />
                          <path
                            fill="#FC0F1A"
                            d="M7.444 19.478h17.113v7.652H7.444z"
                          />
                          <g fill="#FFF">
                            <path
                              d="M12.804 21.65c.847 0 1.334.415 1.334 1.153 0 .776-.487 1.225-1.334 1.225h-.6v.932h-.842v-3.31h1.442zm-.6 1.716h.558c.369 0 .582-.184.582-.534 0-.346-.213-.52-.582-.52h-.558v1.054zM16.12 21.65c1.041 0 1.76.67 1.76 1.655 0 .979-.728 1.655-1.793 1.655h-1.39v-3.31h1.423zm-.581 2.638h.6c.516 0 .885-.397.885-.979 0-.586-.388-.988-.923-.988h-.562v1.967zM19.285 22.311v.767h1.485v.662h-1.485v1.22h-.842v-3.31h2.455v.661h-1.613z"
                            />
                          </g>
                        </g>
                      </svg>
                      <span class="download__chip px-2 mx-auto py-1 mt-2 rounded-xl text-dark-gray bg-light-gray me-auto text-sm">{{

                        $t("order.download")
                      }}</span>
                    </span>
                  </a>
                </span>

                <span
                  class="ms-2 text-decoration-none"
                  v-for="(item, index) in props.selectedItem?.attachments"
                  :key="index"
                >
                  <a :href="item.path" download="attatchment" target="_blank">
                    <span class="d-flex flex-column align-items-center">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        class="ms-1"
                      >
                        <g fill-rule="nonzero" fill="none">
                          <path
                            d="M31.959 17.142c.027-.378.041-.758.041-1.142 0-8.837-7.163-16-16-16S0 7.163 0 16c0 7.36 4.97 13.56 11.738 15.425L31.96 17.142z"
                            fill="#C30B15"
                          />
                          <path
                            d="M31.959 17.142 19.687 4.87 7.443 27.13l4.295 4.295C13.095 31.8 14.524 32 16 32c8.453 0 15.373-6.555 15.959-14.858z"
                            fill="#85080E"
                          />
                          <path
                            fill="#FFF"
                            d="m17.395 20.87-1.413-16H7.444v14.608z"
                          />
                          <path
                            fill="#E8E6E6"
                            d="M24.556 19.478V9.74l-3.478-1.391-1.391-3.478h-3.705l.022 16z"
                          />
                          <path fill="#FFF" d="M19.687 9.74V4.87l4.87 4.87z" />
                          <path
                            fill="#FC0F1A"
                            d="M7.444 19.478h17.113v7.652H7.444z"
                          />
                          <g fill="#FFF">
                            <path
                              d="M12.804 21.65c.847 0 1.334.415 1.334 1.153 0 .776-.487 1.225-1.334 1.225h-.6v.932h-.842v-3.31h1.442zm-.6 1.716h.558c.369 0 .582-.184.582-.534 0-.346-.213-.52-.582-.52h-.558v1.054zM16.12 21.65c1.041 0 1.76.67 1.76 1.655 0 .979-.728 1.655-1.793 1.655h-1.39v-3.31h1.423zm-.581 2.638h.6c.516 0 .885-.397.885-.979 0-.586-.388-.988-.923-.988h-.562v1.967zM19.285 22.311v.767h1.485v.662h-1.485v1.22h-.842v-3.31h2.455v.661h-1.613z"
                            />
                          </g>
                        </g>
                      </svg>
                      <span class="download__chip px-2 mx-auto py-1 mt-2 rounded-xl text-dark-gray bg-light-gray me-auto text-sm">{{
                        $t("order.download")
                      }}</span>
                    </span>
                  </a>
                </span>
              </div>
            </article>
          </v-card>
        </section>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useI18n } from "#imports";

const { t } = useI18n();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  selectedItem: {
    type: Object,
    default: () => null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style scoped></style>
