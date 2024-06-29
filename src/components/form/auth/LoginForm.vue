<template>
  <div class="form-container mx-auto">
    <div>
      <h1 class="font-[800] text-[37px] font-inter-Medium">Login</h1>
      <p class="text-[16px] leading-[25px]" >Welcome back! Please fill in the correct details.</p>
      <form class="" @submit.prevent="login">
        <base-input type="email" v-model="AuthRequest.LoginRequest.userEmail" placeholder="Enter your email"  label="Email"/>
        <base-input type="password" v-model="AuthRequest.LoginRequest.userPassword" placeholder="....." label="Password"/>
        <div class="forgot-password-container py-4" @click="toForgetPassword">
          <!-- <base-checkbox label="Remember for 30 days" /> -->
          <p class="sign-up cursor-pointer text-right w-full"><a>Forgot password</a></p>
        </div>

        <base-button type="submit" loadingColor="white" :loading="wait.isLoading('DATA_SUBMITTING')">Sign in</base-button>

        <p class="text-[14px] leading-[21px] text-gray_1 text-center cursor-pointer py-4" @click="toSignUp">Don’t have an account? <span class="sign-up">Sign up</span></p>
      </form>
    </div>
  </div>
</template>
<script setup>

import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import {router} from "@/router/index";
import AuthRequest from "@/models/request/AuthRequest.ts"
import StoreUtils from "@/util/storeUtils.ts"
import { useToast, useWait } from 'maz-ui'

const toast = useToast()
const wait = useWait()


function toForgetPassword() {
  router.push({path:'/initiate/forgetPassword'});
}

async function login(){
  console.log(AuthRequest.LoginRequest)
  wait.start('DATA_SUBMITTING')
  await StoreUtils.getter()?.auth.login(AuthRequest.LoginRequest, toast, wait)
  wait.stop('DATA_SUBMITTING')
}

function toSignUp(){
    router.push({path:'/sign-up'})
  }
</script>

<style scoped >
  .form-container{
    width: 100%;
    display: flex;
    justify-content: center;
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