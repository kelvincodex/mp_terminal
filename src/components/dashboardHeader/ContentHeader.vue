<script lang="ts" setup>
 import MazAvatar from 'maz-ui/components/MazAvatar';
 import MazDropdown from 'maz-ui/components/MazDropdown';
 import MazSelect from 'maz-ui/components/MazSelect';
 import MazDialog from 'maz-ui/components/MazDialog';
 import MazBtn from 'maz-ui/components/MazBtn';
 import MazLoadingBar from 'maz-ui/components/MazLoadingBar'
import {computed, onMounted, ref, reactive} from "vue";
import {router} from "@/router/index";
import StoreUtils from "@/util/storeUtils.ts";
import { useWait } from 'maz-ui';
// import Dialog from 'primevue/dialog';
import BaseButton from '../button/BaseButton.vue';



const selectedValue = ref(null)

const wait = useWait()

// const isOpen = ref(false)

const data = reactive({
  isOpen:false,
  visible:false,
})

const user = computed(() => {
  return StoreUtils.getter()?.auth.getUserInfo
})

const organisation:any = computed(() => {
  return StoreUtils.getter()?.organisation.getOrganisation
})

const userFullName = computed(() => {
  return StoreUtils.getter()?.auth.getUserInfo?.userFirstName + ' ' +  StoreUtils.getter()?.auth.getUserInfo?.userLastName
})



async function getCustomerOrganisation(){
  data.isOpen = true 
  console.log(user)
  wait.start('READ_ORGANISATION')
  await StoreUtils.getter()?.organisation.readCustomerOrganisation(user.value?.userId)
  wait.stop('READ_ORGANISATION')
}


const getCurrentRoute:any = computed(() => {
  return router.currentRoute.value.name

})



const getCurrentRouteSubTitle = computed(() => {
  return router.currentRoute.value?.meta.sub_title

})
    


onMounted(() => {
})
</script>

<template>
      <div class="content-header">
      

        <!-- <div class="card flex justify-center">
          <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
              <p class="mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p class="mb-8">
                  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                  ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                  adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
                  ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              </p>
              <p class="mb-8">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                  qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
                  maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae
                  non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
              </p>
              <p class="mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p class="mb-8">
                  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                  ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                  adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
                  ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              </p>
              <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                  qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
                  maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae
                  non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
              </p>
          </Dialog>
        </div> -->
        <div>
          <h3 class="text-4xl text-black mb-0.5">{{getCurrentRoute}}</h3>
          <p class="text-sm">{{getCurrentRouteSubTitle}}</p>
        </div>
        <div class="content-inner-container-right">
          <MazDropdown @click="getCustomerOrganisation">
            <MazAvatar
              :caption="userFullName"
              size="1rem"
              class="avatar"
            />
            <p>{{ userFullName}}</p>

          <template #dropdown>
            <div class="maz-grid maz-grid-cols-3 maz-gap-2">
              
            </div>
          </template>
        </MazDropdown>

       
        <MazDialog v-model="data.isOpen">
          <template #title>
            Change Organization
          </template>

          <template  #default>
            <MazLoadingBar v-if="wait.isLoading('READ_ORGANISATION')" />

           
            <div v-else>
              <div v-if="organisation?.length">
                <div class="flex justify-between mb-3">
                <p>Current Organisation : {{ organisation[0].organisationName}}</p>  
               </div>

                <MazSelect
                  block
                  v-model="selectedValue"
                  label="Select Organisation"
                  :options="organisation.map((item:any) => {return { value: item.organisationName, label: item.organisationName};})"
                />
              </div>
              <div class="text-center" v-if="!organisation?.length">
                <p class="py-5" >No Organisations</p>
                <MazBtn>Create Organisation</MazBtn>
              </div>
            </div>
           
            </template> 


            <template #footer>
              <BaseButton v-if="organisation?.length">
                Confirm
              </BaseButton>
              
              </template>
            
        </MazDialog>
                
        </div>
    </div>
        
</template>

<style scoped>
  .content-header{
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: #fff;
}

.content-inner-container-right{
  display: flex;
  align-items: center;
}


</style>