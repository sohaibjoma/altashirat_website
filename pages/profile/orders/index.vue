<template>
  <v-card
    variant="outlined"
    class="rounded-lg custom-card w-75 pt-4 mb-10 mx-auto ms-lg-5 mt-lg-12 mx-lg-0"
  >
    <div class="d-flex flex-column">
      <v-btn
        class="font-weight-bold text-white mx-auto"
        color="primary"
        size="large"
        rounded
      >
        <svg
          width="24"
          height="23"
          viewBox="0 0 24 23"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill-rule="nonzero" fill="none">
            <path
              d="M24 10.851c0 5.425-4.066 9.932-9.355 10.727.044-.24.057-.49.027-.743l-.073-.613a9.7 9.7 0 0 0 4.918-2.383 1.291 1.291 0 0 1-.24-.265c-.358-.513.11-1.022.11-1.47 0-.44-.902-.403-.935-.695-.113-1.008.63-1.022 1.025-1.411.396-.39-.391-1.276-.9-1.219-.512.054-1.953-.232-1.821-1.317.16-1.322-1.71-1.205-1.979-1.822-.39-.9.259-2.002 1.106-2.253 1.2-.355 2.381-1.318 2.29-2.39-.105-1.214-.664-2.31-1.584-2.96a9.721 9.721 0 0 0-3.07-.677c-.963.037-1.81.248-1.772.682.095 1.064 3.17 1.34 2.654 2.336-.269.518-2.288 1.25-1.911 2.022.245.502.849.072.624 1.035-.104.444-.5 1.277-1.107 1.33-.62.057-1.138-1.562-2.83-1.615-.798-.025-1.925 1.227-.968 2.116.579.538 1.665-.647 1.986.279.226.652-.03 2.022 1.024 2.595.385.209.974.39 1.557.682-.865.174-1.928.499-3.184.974l-1.057-.274c.442-.363 1.162-.618.98-1.411-.265-1.165-2.32-.725-3.736-2.12-.435-.427-1.362-1.847-1.358-3.553a9.327 9.327 0 0 0-.997 5.856c-.017 0-.033-.003-.05-.003a3.26 3.26 0 0 0-1.29.266 10.715 10.715 0 0 1-.136-1.706C1.948 4.868 6.894 0 12.974 0S24 4.868 24 10.851z"
              fill="#FFF"
            />
            <path
              d="m15.729 14.014-2.693 1.218.042-.577 1.744-.775a10.955 10.955 0 0 0-.764-.024c-.964 0-2.592.48-4.393 1.184l-5.777-1.5a2.045 2.045 0 0 0-1.587.238l-.284.176a.437.437 0 0 0-.006.744l3.473 2.217c-.83.417-1.617.841-2.31 1.246l-1.783-.928a1.137 1.137 0 0 0-.94-.05l-.17.067a.438.438 0 0 0-.223.626l.981 1.717c-.37.313-.58.573-.58.753 0 .539.673.673 1.267.673 1.058 0 15.041-3.15 15.041-6.005 0-.566-.393-.848-1.038-1zM9.833 19.588l3.077-1.067a.224.224 0 0 1 .297.182l.27 2.27a1.32 1.32 0 0 1-.769 1.354l-.288.132a.453.453 0 0 1-.526-.109L9.74 19.941a.22.22 0 0 1 .093-.353z"
              fill="#8EE7AD"
            />
          </g>
        </svg>
        {{ $t("order.requestTourismVisa") }}
      </v-btn>

      <div
        v-if="isLoading"
        class="d-flex justify-center align-center py-8"
        style="height: 200px"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          size="60"
        ></v-progress-circular>
      </div>
      <v-table
        class="mt-4 text-center"
        v-if="tableEntries && tableEntries.length > 0"
      >
        <thead class="bg-bg-input my-0">
          <tr>
            <th
              v-for="header in tableHeaders"
              :key="header"
              class="text-text text-center"
            >
              {{ header }}
            </th>
            <th class="table__icon__header text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableEntries" :key="item.name" class="text-text">
            <td>{{ item.id }}</td>
            <td>{{ formatDate(item.statuses[0]?.activated_at) }}</td>
            <td>{{ item.purpose_of_visit }}</td>
            <td>
              <span
                :style="{ color: getStatusColor(filterStatus(item.statuses)) }"
              >
                {{
                  t(`statuses.${getStatusType(filterStatus(item.statuses))}`)
                }}
              </span>
            </td>
            <td class="text-end">
              <v-icon
                color="primary bg-bg-input pa-3 rounded-lg"
                @click="showDetails(item)"
                style="cursor: pointer"
              >
                mdi-eye
              </v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
      <div class="d-flex flex-column align-center py-16" v-else-if="!isLoading">
        <Image
          name="no-orders.png"
          alt="no orders image"
          class="my-10"
          height="200"
        />
        <h4 class="text-text mb-12">{{ $t("order.emptyOrders") }}</h4>
      </div>
    </div>

    <OrderDialogue v-model="dialog" :selected-item="selectedItem" />
  </v-card>
</template>

<script setup>
import { useI18n } from "#imports";
import { useApi } from "@/composables/api";
import { ref, onMounted } from "vue";

const { GET } = useApi();
const { t } = useI18n();

const tableHeaders = ref([
  t("order.orderNumber"),
  t("order.orderDate"),
  t("order.purpose"),
  t("order.orderStatus"),
]);

const tableEntries = ref([]);

// Date formatting
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    date.getFullYear(),
  ].join("/");
}

// Status filtration - returns raw status name
function filterStatus(statuses) {
  if (!statuses || !statuses.length) return "";

  const latestStatus = statuses
    .filter((s) => s.activated_at)
    .sort((a, b) => new Date(b.activated_at) - new Date(a.activated_at))[0];

  return latestStatus?.name || "";
}

// Map status names to status types
function getStatusType(statusName) {
  const statusMap = {
    "قيد الانتظار": "Pending",
    Pending: "Pending",
    "قيد المراجعة": "Reviwing",
    Reviewing: "Reviwing",
    "تم القبول": "Accepted",
    Accepted: "Accepted",
    "تم رفضه": "Rejected",
    Rejected: "Rejected",
  };
  return statusMap[statusName] || "";
}

// Status coloring
const getStatusColor = (statusName) => {
  const statusType = getStatusType(statusName);
  const colorMap = {
    Pending: "#b2aecc",
    Reviwing: "#ffc419",
    Accepted: "#069230",
    Rejected: "#fb1c1f",
  };
  return colorMap[statusType] || "#000000";
};

// Data fetching
const isLoading = ref(false);
const error = ref(null);
const fetchTourism = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await GET("/tourism-visa");
    tableEntries.value = response.data;
  } catch (err) {
    error.value = err;
    console.error("failed to fetch table data", err);
  } finally {
    isLoading.value = false;
  }
};

// Dialog control
const dialog = ref(false);
const selectedItem = ref(null);

const showDetails = (item) => {
  selectedItem.value = item;
  dialog.value = true;
};

onMounted(() => {
  fetchTourism();
});
</script>

<style scoped></style>
