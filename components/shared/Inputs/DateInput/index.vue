<template>
  <div>
    <div v-if="title" class="ms-4 mt-8 mb-2 pb-2 font-weight-bold text-text">
      {{ title }}
    </div>
    <v-date-input
      v-model="dateModel"
      prepend-icon=""
      prepend-inner-icon="$calendar"
      :error="!!errorMessage"
      :error-messages="errorMessage"
      :hint="hint"
      persistent-hint
      variant="solo-filled"
      rounded
      :menu-props="{ contentClass: 'date-picker-menu' }"
      @blur="validateOnImmediate"
      open-on-click
    ></v-date-input>
  </div>
</template>

<script setup >
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps({
  rules: {
    type: [Array, Function, String],
    default: () => []
  },
  hint: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Date, Number, null],
    default: null
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const { value, errorMessage, setTouched, validate } = useField(
  props.name,
  props.rules
)

const dateModel = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    value.value = newValue
    emit('update:modelValue', newValue)
  }
})

const validateOnImmediate = () => {
  setTouched(true)
  validate()
}
</script>