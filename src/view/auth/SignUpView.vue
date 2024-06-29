<template>
    <Motion
      :initial="{opacity: 0, x: -100}"
      :animate="{opacity: 1, x: 0}"
      :transition="{duration: 0.5}"
      v-if="enrolmentStage === '1'"
    >
      <div class="container">
        <div class="min-container p-10">
          <div class="w-full h-[20%]">
            <img class="logo shadow-lg" src="../../assets/icon/cropped.png" alt="">
          </div>
         
          
          <SignUpForm />
  
        </div>
        <div class="min-container bg-image"></div>
      </div>

     
    </Motion>
    <Motion
    :initial="{opacity: 0, x: -100}"
      :animate="{opacity: 1, x: 0}"
      :transition="{duration: 0.5}"
      v-else
      >
    
      <CompleteEnrolment></CompleteEnrolment>
    </Motion>
  </template>
  
  <script setup lang="ts">
  import SignUpForm from "@/components/form/auth/SignUpForm.vue";
  import CompleteEnrolment from "@/components/form/auth/CompleteEnrolment.vue"
  import { Motion } from "motion/vue"
  import { computed } from "vue";
import StoreUtils from "@/util/storeUtils.ts";


  const enrolmentStage = computed(() => {return StoreUtils.getter()?.auth.getEnrolmentStage})


  // import documentTitle from "@/util/helper/documentTitle.ts";
  
  // documentTitle(`Login | ${getEnv("VITE_APP_NAME")}`)
  </script>
  
  <style scoped>
  .logo{
  @apply bg-primary;
  width: 150px;
  height: 57px;
  padding: 10px;
  border-bottom-right-radius: 2rem;
}
  
    .container{
      min-width: 100%;
      min-height: 100vh;
      display: flex;
      background-color: var(--light-bgcolor);
    }
    .min-container{
      width: 100%;
      min-height: 100%;
      background-color: var(--light-bgcolor);
    }
  
    .bg-image{
      background-image: url('../../assets/image/section-terminal.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
    .img-container{
      width: 100%;
      height: 100%;
    }
  </style>