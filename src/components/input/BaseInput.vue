<template>
  <div class="input-component">
    <h1>{{props.label}}</h1>
    <div class="relative mt-1">
      <input v-bind="$attrs" :type="type" required :class="{'border-red-900 outline-red-900 ring-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': hasError}" 
      :style="inputStyle" @input:any="$emit('update:modelValue', $event?.target?.value)" />
      <span v-if="hasError" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M8.257 3.099c.764-1.36 2.722-1.36 3.485 0l7.455 13.291c.772 1.377-.192 3.075-1.742 3.075H2.544c-1.55 0-2.514-1.698-1.742-3.075L8.257 3.099zM11 14a1 1 0 112 0 1 1 0 01-2 0zm.867-4.05a.75.75 0 00-1.735 0l-.333 3a.75.75 0 001.485.196l.333-3z" clip-rule="evenodd" />
      </svg>
      </span>
    </div>
  </div>
  <code v-if="hasError" class="mt-2 text-sm text-red-600">
      <p class="text-xs">{{ `${label} is required` }}</p>
    </code>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import {ThemeUtil} from "@/util/ThemeUtil.ts";

  const hasError = ref(false);

  const props = defineProps<{
    label: string,
    modelValue: string | null,
    type:any,
  }>()

  const inputStyle = ref({
    borderColor: ThemeUtil.color.gray_2,
  })

</script>

<style scoped>
  .input-component{
    height: 70px;
    width: 100%;
    @apply my-5
  }
  input{
    border-radius: 8px;
    min-width: 100%;
    height: 47px;
    margin-top: 10px;
  }

</style>