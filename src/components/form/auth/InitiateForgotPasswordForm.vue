<template>
    <div  class="flex justify-center h-screen items-center">
        
      <div v-if="passwordResetStage === '1'" class="w-3/12 min-w-fit">
        <div class="w-full flex justify-center my-3">
          <img class="logo shadow-lg" src="../../../assets/icon/cropped.png" alt="">
        </div>
        <h1 class="font-[800] text-[37px] font-inter-Medium text-center">Forgot Password</h1>
        <p class="text-[14px] leading-[25px] text-center text-gray-500">Let's help you fix it</p>
        <code>
            <p class="text-[14px] leading-[25px] text-center text-primary">{{AuthRequest?.InitiateEnrollmentRequest?.userEmail}}</p>
        </code>
        <form class="" @submit.prevent="initiateForgotPassword">
          <base-input type="email" v-model="AuthRequest.InitiatePasswordResetRequest.userEmail" placeholder="Enter your email" label="Enter your email" />

          <!--//TODO: OTP Feature-->
          <!-- <p class="text-[14px] leading-[25px] text-center text-gray-500">We can resend OTP in: <code>11:00</code></p>
          <base-button type="button" outline loadingColor="white" :loading="wait.isLoading('DATA_SUBMITTING')">Resend OTP</base-button> -->
         
          <base-button type="submit" loadingColor="white" :loading="wait.isLoading('DATA_SUBMITTING')">Send Email</base-button>

          <p class="text-[14px] leading-[21px] text-gray_1 text-center cursor-pointer py-4" @click="toLogin">I have an account? <span class="sign-up">Log in</span></p>

        </form>
      </div>
      <div v-else class="w-3/12 min-w-fit">
          <div class="w-full flex justify-center my-3">
            <img class="logo shadow-lg" src="../../../assets/icon/cropped.png" alt="">
          </div>
          <h1 class="font-[800] text-[37px] font-inter-Medium text-center">Forgot Password</h1>
          <p class="text-[14px] leading-[25px] text-center text-gray-500">OTP was sent to <code><span class="text-primary">{{ AuthRequest.InitiatePasswordResetRequest.userEmail }}</span></code></p>
          <code>
              <p class="text-[14px] leading-[25px] text-center text-primary">{{AuthRequest?.InitiateEnrollmentRequest?.userEmail}}</p>
          </code>
          <form class="" @submit.prevent="completeForgotPassword">
            <div>
                <base-input type="text" v-model="AuthRequest.CompletePasswordResetRequest.otp" placeholder="Enter OTP" label="Enter OTP" />
                <div class="w-100 flex justify-end">We can resend OTP in: 11:00</div>
            </div>
            <base-input type="password" v-model="AuthRequest.CompletePasswordResetRequest.userPassword" placeholder="New Password" label="New Password" />


            <base-input type="password" v-model="confirmPassword" placeholder="Confirm Password" label="Confirm Password" />
           
            <base-button type="submit" loadingColor="white" :loading="wait.isLoading('DATA_SUBMITTING')">Change Password</base-button>
  
            <p class="text-[14px] leading-[21px] text-gray_1 text-center cursor-pointer py-4" @click="toLogin">I have an account? <span class="sign-up">Log in</span></p>
  
          </form>
        </div>
    </div>
  </template>
  <script setup>

  
  import BaseInput from "@/components/input/BaseInput.vue";
  import BaseCheckbox from "@/components/checkbox/BaseCheckbox.vue";
  import BaseButton from "@/components/button/BaseButton.vue";
  import {router} from "@/router/index";
  import AuthRequest from "@/models/request/AuthRequest"
  import StoreUtiils from "@/util/storeUtils.ts"
  import { useToast, useWait } from 'maz-ui'
  import { computed } from "vue";
  
  const toast = useToast()
  const wait = useWait()
  
  
  function toLogin() {
    router.push({path:'/'});
  }
  
  async function initiateForgotPassword(){
    
    wait.start('DATA_SUBMITTING')
    await StoreUtiils.getter()?.auth.initiatePasswordReset(AuthRequest.InitiatePasswordResetRequest, toast)
    wait.stop('DATA_SUBMITTING')
  }

  async function completeForgotPassword(){
    AuthRequest.CompletePasswordResetRequest.userEmail = AuthRequest.InitiatePasswordResetRequest.userEmail
    wait.start('DATA_SUBMITTING')
    await StoreUtiils.getter()?.auth.completePasswordReset(AuthRequest.CompletePasswordResetRequest, toast)
    wait.stop('DATA_SUBMITTING')
  }
  
  function toSignUp(){
      router.push({path:'/sign-up'})
    }

    const passwordResetStage = computed(() => {return StoreUtiils.getter()?.auth.getPasswordResetStage})

  </script>
  
  <style scoped >
  .logo{
  @apply bg-primary;
  width: 150px;
  height: 57px;
  padding: 10px;
  border-bottom-right-radius: 2rem;
}
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