<template>
  <div class="py-4">
    <div class="horizontal-timeline">
      <!-- Timeline dots and line -->
      <div class="timeline-dots-wrapper pe-8">
        <!-- Pending Dot -->
        <div class="timeline-dot-container">
          <div class="timeline-dot">
            <Image name="colored-status.png" alt="pending status" width="25" height="25" />
          </div>
          <!-- Fixed: This line should only be active if reviewing is active -->
          <div class="timeline-line" :class="isReviewingActive() ? 'active-line' : 'inactive-line'"></div>
        </div>
        
        <!-- Reviewing Dot -->
        <div class="timeline-dot-container">
          <div class="timeline-dot">
            <Image 
              :name="isReviewingActive() ? 'colored-status.png' : 'gray-status.png'" 
              alt="reviewing status" 
              width="25" 
              height="25"
            />
          </div>
          <div class="timeline-line" :class="isAcceptedOrRejected() ? 'active-line' : 'inactive-line'"></div>
        </div>
        
        <!-- Final Status Dot -->
        <div class="timeline-dot-container">
          <div class="timeline-dot">
            <Image 
              :name="getStatusIconName()" 
              alt="final status" 
              width="25" 
              height="25"
            />
          </div>
        </div>
      </div>
      
      <!-- Timeline labels below -->
      <div class="timeline-labels">
        <!-- Pending Label -->
        <div class="status-text">
          <span class="status__text text-text">{{ $t("statuses.PendingText") }}</span>
          <span class="status__text text-primary">{{ formatDate(getPendingStatus()?.activated_at) }}</span>
        </div>
        
        <!-- Reviewing Label -->
        <div class="status-text">
          <span class="status__text" :class="isReviewingActive() ? 'text-text' : 'text-grey'">
            {{ $t("statuses.Reviwing") }}
          </span>
          <span class="status__text" :class="isReviewingActive() ? 'text-primary' : 'text-grey'">
            {{ formatDate(getReviewingStatus()?.activated_at) || '-' }}
          </span>
        </div>
        
        <!-- Final Status Label -->
        <div class="status-text">
          <span class="status__text" :class="getStatusTextClass()">
            {{ isRejected() ? $t("statuses.Rejected") : $t("statuses.Accepted") }}
          </span>
          <span class="status__text" :class="getFinalStatusDateClass()">
            {{ formatDate(getFinalStatus()?.activated_at) || '-' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  statuses: {
    type: Array,
    default: () => []
  }
});

// Status helpers
const getPendingStatus = () => {
  return props.statuses.find(status => 
    status.name === 'Pending' || status.name === 'قيد الانتظار');
};

const getReviewingStatus = () => {
  return props.statuses.find(status => 
    status.name === 'Reviewing' || status.name === 'قيد المراجعة');
};

const getAcceptedStatus = () => {
  return props.statuses.find(status => 
    status.name === 'Accepted' || status.name === 'تم القبول');
};

const getRejectedStatus = () => {
  return props.statuses.find(status => 
    status.name === 'Rejected' || status.name === 'تم رفضه');
};

const getFinalStatus = () => {
  return isRejected() ? getRejectedStatus() : getAcceptedStatus();
};

// Status state checks
const isReviewingActive = () => {
  return !!getReviewingStatus()?.activated_at;
};

const isRejected = () => {
  return !!getRejectedStatus()?.activated_at;
};

const isAccepted = () => {
  return !!getAcceptedStatus()?.activated_at;
};

const isAcceptedOrRejected = () => {
  return isAccepted() || isRejected();
};

// UI helpers
const getStatusIconName = () => {
  if (isRejected()) return 'rejected-status.png';
  if (isAccepted()) return 'colored-status.png';
  return 'gray-status.png';
};

const getStatusTextClass = () => {
  if (isRejected()) return 'text-error';
  if (isAccepted()) return 'text-text';
  return 'text-grey';
};

const getFinalStatusDateClass = () => {
  if (isRejected()) return 'text-error';
  if (isAccepted()) return 'text-primary';
  return 'text-grey';
};

// Format date function to convert ISO date to DD/MM/YYYY format
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return [
    String(date.getDate()).padStart(2, '0'),
    String(date.getMonth() + 1).padStart(2, '0'),
    date.getFullYear()
  ].join('/');
}
</script>

<style scoped>

</style>