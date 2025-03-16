<template>
  <v-footer class="footer-bg pt-12">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="3" class="d-flex flex-column">
          <div class="d-flex align-center mb-4">
            <svg
              width="4"
              height="28"
              viewBox="0 0 4 28"
              xmlns="http://www.w3.org/2000/svg"
              class="me-2"
            >
              <defs>
                <linearGradient
                  x1="50.979%"
                  y1="15.846%"
                  x2="49.096%"
                  y2="100%"
                  id="gradient1"
                >
                  <stop stop-color="#4426F5" offset="0%" />
                  <stop stop-color="#65BCF9" offset="52.639%" />
                  <stop stop-color="#8EE7AD" offset="100%" />
                </linearGradient>
              </defs>
              <path
                d="M1106 3h4v28h-4z"
                transform="translate(-1106 -3)"
                fill="url(#gradient1)"
                fill-rule="evenodd"
              />
            </svg>
            <h3 class="text-text">حمل تطبيق منصة التأشيرات</h3>
          </div>
          <v-img
            src="/assets/img/googlePlay.png"
            alt="Google Play"
            width="150"
            class="mb-2"
          ></v-img>
          <v-img
            src="/assets/img/appStore.png"
            alt="App Store"
            width="150"
          ></v-img>
        </v-col>

        <v-col cols="12" sm="6" md="3" class="d-flex flex-column">
          <div class="d-flex align-center mb-4">
            <svg
              width="4"
              height="28"
              viewBox="0 0 4 28"
              xmlns="http://www.w3.org/2000/svg"
              class="me-2"
            >
              <defs>
                <linearGradient
                  x1="50.979%"
                  y1="15.846%"
                  x2="49.096%"
                  y2="100%"
                  id="gradient2"
                >
                  <stop stop-color="#4426F5" offset="0%" />
                  <stop stop-color="#65BCF9" offset="52.639%" />
                  <stop stop-color="#8EE7AD" offset="100%" />
                </linearGradient>
              </defs>
              <path
                d="M1106 3h4v28h-4z"
                transform="translate(-1106 -3)"
                fill="url(#gradient2)"
                fill-rule="evenodd"
              />
            </svg>
            <h3 class="text-text">طلبات التأشيرات</h3>
          </div>
          <v-list class="pa-0 bg-transparent" density="compact">
            <v-list-item
              class="text-text"
              v-for="(item, index) in visaItems"
              :key="index"
              :value="item"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-chevron-left" color="secondary"></v-icon>
              </template>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="3" class="d-flex flex-column">
          <div class="d-flex align-center mb-4">
            <svg
              width="4"
              height="28"
              viewBox="0 0 4 28"
              xmlns="http://www.w3.org/2000/svg"
              class="me-2"
            >
              <defs>
                <linearGradient
                  x1="50.979%"
                  y1="15.846%"
                  x2="49.096%"
                  y2="100%"
                  id="gradient3"
                >
                  <stop stop-color="#4426F5" offset="0%" />
                  <stop stop-color="#65BCF9" offset="52.639%" />
                  <stop stop-color="#8EE7AD" offset="100%" />
                </linearGradient>
              </defs>
              <path
                d="M1106 3h4v28h-4z"
                transform="translate(-1106 -3)"
                fill="url(#gradient3)"
                fill-rule="evenodd"
              />
            </svg>
            <h3 class="text-text">معلومات عامة</h3>
          </div>
          <v-list class="pa-0 bg-transparent" density="compact">
            <v-list-item
              v-for="(item, index) in infoItems"
              :key="index"
              :value="item"
              class="text-text"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-chevron-left" color="secondary"></v-icon>
              </template>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="3" class="d-flex flex-column">
          <div class="d-flex align-center mb-4">
            <svg
              width="4"
              height="28"
              viewBox="0 0 4 28"
              xmlns="http://www.w3.org/2000/svg"
              class="me-2"
            >
              <defs>
                <linearGradient
                  x1="50.979%"
                  y1="15.846%"
                  x2="49.096%"
                  y2="100%"
                  id="gradient4"
                >
                  <stop stop-color="#4426F5" offset="0%" />
                  <stop stop-color="#65BCF9" offset="52.639%" />
                  <stop stop-color="#8EE7AD" offset="100%" />
                </linearGradient>
              </defs>
              <path
                d="M1106 3h4v28h-4z"
                transform="translate(-1106 -3)"
                fill="url(#gradient4)"
                fill-rule="evenodd"
              />
            </svg>
            <h3 class="text-text">التواصل الاجتماعي</h3>
          </div>
          <v-list class="pa-0 bg-transparent" density="compact">
            <v-list-item
              v-for="(item, index) in socialItems"
              :key="index"
              :value="item.name"
              class="text-text d-flex"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-chevron-left" color="secondary"></v-icon>
              </template>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
              <template v-slot:append>
                <v-avatar size="24" color="transparent">
                  <v-icon :color="item.color">{{ item.icon }}</v-icon>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
  <v-row class="mt-1">
    <v-col cols="12" class="text-center copyright-section">
      <div>
        جميع الحقوق محفوظة © {{ new Date().getFullYear() }} لمنصة التأشيرات
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
const visaItems = ["طلب فيزا سياحية", "طلب فيزا توظيف", "عـــرض فيزا"];

const infoItems = [
  "عن منصة التأشيرات",
  "تواصل معنا",
  "الشروط والأحكام",
  "سياسة الخصوصية",
];

const socialItems = [
  { name: "تويتر", icon: "mdi-twitter", color: "#1DA1F2" },
  { name: "انستقرام", icon: "mdi-instagram", color: "#E1306C" },
  { name: "فيسبوك", icon: "mdi-facebook", color: "#1877F2" },
  { name: "سناب شات", icon: "mdi-snapchat", color: "#FFFC00" },
];
</script>

<style scoped>
.footer-bg {
  background-color: var(--bg-footer);
}

.copyright-section {
  background-color: var(--accent);
  color: var(--white);
  font-size: 14px;
}
</style>
