<template>
    <div class="flex justify-center h-screen items-center">
        
      <div class="w-3/12 min-w-fit">
        <div class="w-full flex justify-center my-3">
            <img src="../../../assets/icon/logo.svg" alt="logo" >
        </div>
        <h1 class="font-[800] text-[37px] font-inter-Medium text-center">Confirm Email</h1>
        <p class="text-[14px] leading-[25px] text-center text-gray-500">Input OTP sent to your email</p>
        <code>
            <p class="text-[14px] leading-[25px] text-center text-primary">{{AuthRequest?.InitiateEnrollmentRequest?.userEmail}}</p>
        </code>
        <form class="" @submit.prevent="completeEnrolment">
          <base-input type="text" v-model="AuthRequest.CompleteEnrollmentRequest.otp" placeholder="Enter OTP" label="" />

          <!--//TODO: OTP Feature-->
          <!-- <p class="text-[14px] leading-[25px] text-center text-gray-500">We can resend OTP in: <code>11:00</code></p>
          <base-button type="button" outline loadingColor="white" :loading="wait.isLoading('DATA_SUBMITTING')">Resend OTP</base-button> -->
         
          <base-button type="submit" loadingColor="white" :loading="wait.isLoading('DATA_SUBMITTING')">Get Started</base-button>
        </form>
      </div>
    </div>
  </template>
  <script setup>

  
  import BaseInput from "@/components/input/BaseInput.vue";
  import BaseCheckbox from "@/components/checkbox/BaseCheckbox.vue";
  import BaseButton from "@/components/button/BaseButton.vue";
  import {router} from "@/router/index";
  import AuthRequest from "@/models/request/AuthRequest.ts"
  import StoreUtiils from "@/util/storeUtils.ts"
  import { useToast, useWait } from 'maz-ui'
  
  const toast = useToast()
  const wait = useWait()
  
  
  function toDashboard() {
    router.push({path:'/dashboard'});
  }
  
  async function completeEnrolment(){
    AuthRequest.CompleteEnrollmentRequest.organisationAddress = AuthRequest.InitiateEnrollmentRequest.organisationAddress;
    AuthRequest.CompleteEnrollmentRequest.userEmail = AuthRequest.InitiateEnrollmentRequest.userEmail;
    AuthRequest.CompleteEnrollmentRequest.organisationName = AuthRequest.InitiateEnrollmentRequest.organisationName

    wait.start('DATA_SUBMITTING')
    await StoreUtiils.getter()?.auth.completeEnrolment(AuthRequest.CompleteEnrollmentRequest, toast)
    wait.stop('DATA_SUBMITTING')
  }
  
  function toSignUp(){
      router.push({path:'/sign-up'})
    }
  </script>
  
  <style scoped >
    .outlineBtn{
        background-color: transparent;
    }
    
    /* form{
      @apply pt-5
    } */
    .forgot-password-container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* @apply mt-10 */
    }
  
    .sign-up{
      color: var(--light_primary);
    }
  </style>