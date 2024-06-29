<template>
    <div class="form-container mx-auto">

      <div class="">
        <h1 class="font-[800] text-[37px] font-inter-Medium">Sign Up</h1>
        <p class="text-[16px] leading-[25px]" >Manage your business with ease!</p>
        <div>
            <!--progress tracker -->
            <!-- <div class="relative flex items-center justify-start mt-5">
                <div @click="steps='1'" class="w-14 h-14 border-4 border-white  rounded-full ellipse"></div>
                <div class="w-full max-w-xs border-t-2 border-gray-500"></div>
                <div class="w-14 h-14 border-4 border-white  rounded-full ellipse"></div>
            </div> -->

            <div>
                <!--steps-->
     
    
                <!-- <div class="flex justify-between">
                    <div>
                        <p class="pb-2"> Step 1</p>
                        <p>Bussiness Details</p>
                        <p>Complete</p>
                    </div>
                    <div>
                        <p>Step 2</p>
                        <p>Login Info</p>
                        <p>Pending</p>
                    </div>
                </div> -->
            </div>
        </div>
        <form class="" @submit.prevent="initiateEnrolment">
          <div v-if="steps === '1'">  
            <base-input v-model="AuthRequest.InitiateEnrollmentRequest.organisationName" placeholder="Enter your business name"  label="Business Name"/>
            <base-input v-model="AuthRequest.InitiateEnrollmentRequest.organisationAddress" placeholder="Address" label="Address"/>

            <div class="flex gap-10 py-4">
                <base-input v-model="AuthRequest.InitiateEnrollmentRequest.userFirstName" placeholder="Enter your first name"  label="First Name"/>
                <base-input v-model="AuthRequest.InitiateEnrollmentRequest.userLastName" placeholder="Enter your last name" label="Last Name"/>
            </div>
            <base-button :type="'button'" @click="steps='2'">Next</base-button>
         </div>
         <div v-else>  
            <base-input v-model="AuthRequest.InitiateEnrollmentRequest.userEmail" placeholder="Enter your email"  label="Email"/>
            <div>
                <p>Phone Number</p>
                <MazPhoneNumberInput
                    v-model="AuthRequest.InitiateEnrollmentRequest.userPhone"
                    style="width: 100%;"
                    v-model:country-code="countryCode"
                    show-code-on-list
                    :preferred-countries="['NG', 'BE', 'DE', 'US', 'GB']"
                    :ignored-countries="['AC']"
                    @update="results = $event"
                />
            </div>

            <div>
                <base-input v-model="AuthRequest.InitiateEnrollmentRequest.userPassword"  placeholder="....." label="Password"/>
                <span>Password must be atlease 8 characters</span>
            </div>
            <div class="py-4">
              <base-input v-model="comfirmPassword"  placeholder="....." label="Comfirm Password"/>


            </div>
            <div class="py-3">
              <base-button type="button" @click="steps='1'">Go Back</base-button>


            </div>

            <base-button type="submit" loadingColor="white" :loading="wait.isLoading('DATA_SUBMITTING')">Create Account</base-button>
         </div>
  
          <p class="text-[14px] leading-[21px] text-gray_1 text-center py-4" @click="toLogin">Already have an account? <span class="sign-up">Login</span></p>
        </form>
      </div>
    </div>
  </template>
  <script setup>
  
  import BaseInput from "@/components/input/BaseInput.vue";
  import BaseCheckbox from "@/components/checkbox/BaseCheckbox.vue";
  import BaseButton from "@/components/button/BaseButton.vue";
  import {router} from "@/router/index";
  import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
  import { reactive, ref } from 'vue'
  import AuthRequest from "@/models/request/AuthRequest.ts";
  import { useToast, useWait } from 'maz-ui'
  import StoreUtils from "@/util/storeUtils.ts";
  

  const toast = useToast()
  const wait = useWait()


  const phoneNumber = ref()
  const countryCode = ref('NG')
  const results = ref()
  let steps = ref('1')

//   const data = reactive({
//     steps:'1'
//   })


async function initiateEnrolment(){
    console.log(AuthRequest.InitiateEnrollmentRequest)
    wait.start('DATA_SUBMITTING')
    await StoreUtils.getter()?.auth.initiateEnrolment(AuthRequest.InitiateEnrollmentRequest, toast)
    wait.stop('DATA_SUBMITTING')
}

  function toLogin() {
    router.push({path:'/'});
  }

 
  </script>
  
  <style scoped >

  .ellipse{
   /* Ellipse 270 */

    box-sizing: border-box;

    width: 28px;
    height: 28px;

    border: 1px solid #CBD7E7;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;


  }

    .form-container{
      width: 60%;
      /* display: inline-flex;
      justify-content: center; */
    }
    
    form{
    }


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