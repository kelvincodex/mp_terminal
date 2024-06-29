<script lang="ts" setup>
import BaseButton from '@/components/button/BaseButton.vue';
import { reactive, computed, onMounted, ref } from 'vue';
import {Motion} from "motion/vue";
import ContentHeader from '@/components/dashboardHeader/ContentHeader.vue';
import AddManageCharges from '@/components/modal/charges/AddManageCharges.vue';
import StoreUtils from '@/util/storeUtils';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import UpdateManageCharges from '@/components/modal/charges/UpdateManageCharges.vue'
import MazDialogPromise, {
    useMazDialogPromise
  } from 'maz-ui/components/MazDialogPromise'
// import { DialogCustomButton } from 'maz-ui/types/components/MazDialogPromise/use-maz-dialog-promise.js'; 
import ChargesRequest from '@/models/request/charges/ChargesRequest';
import { useToast } from 'maz-ui';


const toast = useToast()
const { showDialogAndWaitChoice, data } = useMazDialogPromise()

const reactiveData= reactive({
  showManageCharges:false,
  visible:false,
  selectedRow:{} as any,
  showUpdateCharges:false
})

data.value = {
    title: 'Delete',
    message: `Are you sure you want to delete charge`
}

const organisations = computed(() => {
    return StoreUtils.getter()?.organisation.getCurrentOrganisation
})

const menu = ref();

// const buttons: DialogCustomButton[] = [
//     {
//       text: 'Cancel',
//       type: 'reject',
//       color: 'danger',
//       response: new Error('cancel'),
//       size: 'sm',
//     },
//     {
//       text: 'Delete!',
//       type: 'resolve',
//       color: 'success',
//       response: 'delete',
//       size: 'lg',
//     },
//   ]


const onRowSelect = (event:any) => {
  reactiveData.selectedRow = event.data
  console.log(event.data)
}

const charges = computed(() => {
    return StoreUtils.getter()?.charges.getCharges
})

async function askToUser() {
    try {
      const responseOne = await showDialogAndWaitChoice('one')

      if(responseOne === 'accept'){
       deleteTerminal()
       await StoreUtils.getter()?.terminal.getOrganisationTerminal(JSON.stringify(organisations.value?.organisationId))

      }else{
        console.log(responseOne)
      }

    } catch (error:any) {
      toast.error(error.message ?? error, {
        position: 'top-right'
      })
    }
}


const headers = [
  {label:'pricingAmount',key:'pricingAmount'}, 
  {label:'pricingAmountType',key:'pricingAmountType'},
  {label:'pricingCode',key:'pricingCode'},
  {label:'pricingDescription',key:'pricingDescription'},
  {label:'pricingType',key:'pricingType'},
  {label:'pricingMinAmount',key:'pricingMinAmount'},
  {label:'pricingMaxAmount',key:'pricingMaxAmount'},]



const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    pricingType: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // representative: { value: null, matchMode: FilterMatchMode.IN },
    pricingCode: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const toggle = (event:any) => {
    menu.value.toggle(event);
}

const model:any= ChargesRequest.deleteCharges;

const deleteTerminal = () => {
  model.pricingId = JSON.stringify(reactiveData.selectedRow.pricingId)
  StoreUtils.getter()?.charges.deleteCharges(model, toast)
}

const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'View',
                icon: 'pi pi-refresh',
                command:( ) => {
                  reactiveData.visible = !reactiveData.visible
                }
            },
            {
                label: 'Edit',
                icon: 'pi pi-upload',
                command:() => {
                  reactiveData.showUpdateCharges = !reactiveData.showUpdateCharges
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-upload',
                command:() => {
                  askToUser()
                }
            }
        ]
    }
]);

const metaKey = ref(true);



function handleClose(payload:any) {
  reactiveData.showManageCharges = payload;
  reactiveData.showUpdateCharges = payload
}

function requestAddCharges(){
  reactiveData.showManageCharges = !reactiveData.showManageCharges

}

onMounted(() => {
  StoreUtils.getter()?.charges.getOrganizationCharges()
})

</script>

<template>
  <Dialog v-model:visible="reactiveData.visible" modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <div v-for="(i, key, index) in reactiveData.selectedRow" :key="index" class="flex justify-between">
              <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ key }}:</p>
              <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ i }}</p>
          </div>
      </Dialog>
      <MazDialogPromise  identifier="one"/>
    

    <AddManageCharges v-if="reactiveData.showManageCharges" @close="handleClose"></AddManageCharges>
   
    <UpdateManageCharges v-if="reactiveData.showUpdateCharges" :data="reactiveData.selectedRow"  @close="handleClose"></UpdateManageCharges>
    <Motion :initial="{opacity: 0, x: -100}" :animate="{opacity: 1, x: 0}" :transition="{duration: 0.5}">  
    <ContentHeader />

    <div class="content-table-section">
        <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:25px 0">

        <div style="display: flex; align-items: center; justify-content: center;gap:20px">
          <p class="text-xl text-black">Manage Charges List</p>
          <img src="../../assets/icon/alert-circle.svg" />
          <!-- <div>
            <input class="terminal_search"  placeholder="Search"/>
          </div> -->
        
        </div>
        <div style="display: flex; align-items: center; justify-content: center;gap:20px;">
          <!-- <BaseButton bg-color="transparent" bg-border="#D0D5DD" @click="assignTerminal">
            <img src="../../assets/icon/Group 2.svg" />
            <p class="bnt-trans-text">Assgin Terminal</p>
           
          </BaseButton> -->
          <BaseButton @click="requestAddCharges">
            <div style="display: flex;align-items: center;gap: 5px;">
            <img src="../../assets/icon/Folder Add 2.svg" />
            Add New Charges
          </div>
          
        </BaseButton>
        </div>
        </div>
     
        <!-- <BaseTable pagination="true" search="true" :headers="" :bodies=""></BaseTable> -->
        <div class="overflow-auto rounded-lg shadow">
        
        <DataTable v-model:filters="filters" :value="charges" :metaKeySelection="metaKey" selectionMode="single" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows tableStyle="min-width: 50rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
            :globalFilterFields="['pricingCode','pricingType']" @rowSelect="onRowSelect">

            <template #header>
                    <div class="flex justify-end">
                        <span class="relative">
                            <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search"  class="pl-10 font-normal terminal_search"/>
                        </span>
                    </div>
                </template>

                <template #empty> 
                  <div class="text-center">
                    No Charges List. 
                    </div>
                  </template>
                <template #loading> Loading customers data. Please wait. </template>
          
                <Column v-for="col of headers"  :key="col.key" :field="col.key" :header="col.label"></Column>
                <!--terminal status-->
                <Column header="actions">
                  
                  <template #body="">
                    <div class="flex">
              
                      <img src="../../assets/icon/Dropdown.svg" @click="toggle"/>

                      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                    </div>
                  </template>
                </Column>
              
                
        </DataTable>
        
      </div>
    </div>
    </Motion>
</template>

<style scoped>
.content-table-section{
  padding: 2rem;
}

.bnt-trans-text{
    color: var(--dark_color);
}

.terminal_search{
    /* _Input dropdown base */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

height: 44px;
left: 0px;
right: 0px;
top: 0px;

/* Input */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 10px 14px;
gap: 8px;

width: 100%;
height: 44px;

/* White */
background: #FFFFFF;
/* Gray/300 */
border: 1px solid #D0D5DD;
/* Shadow/xs */
box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;



}
</style>