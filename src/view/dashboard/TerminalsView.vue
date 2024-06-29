<script lang="ts" setup>
import BaseButton from '@/components/button/BaseButton.vue';
import RequestTerminal from '@/components/modal/terminal/RequestTerminal.vue';
import { computed, reactive, ref } from 'vue';
import AssignTerminal from '@/components/modal/terminal/AssignTerminal.vue';
import { Motion } from "motion/vue";
import ContentHeader from '@/components/dashboardHeader/ContentHeader.vue';
import StoreUtils from "@/util/storeUtils.ts";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import { useToast } from 'maz-ui';
import MazDialogPromise, {
  useMazDialogPromise
} from 'maz-ui/components/MazDialogPromise'
// import { DialogCustomButton } from 'maz-ui/types/components/MazDialogPromise/use-maz-dialog-promise.js';
import MazDialog from 'maz-ui/components/MazDialog'
import UpdateTerminal from '@/components/modal/terminal/UpdateTerminal.vue'
import TerminalRequest from '@/models/request/terminal/TerminalRequest';

const reactiveData = reactive({
  showRequestTerminal: false,
  showAssignTerminal: false,
  visible: false,
  selectedRow: {} as any,
  showUpdateTerminal: false
})


const confirmDialog = ref(false)

const { showDialogAndWaitChoice, data } = useMazDialogPromise()

data.value = {
  title: 'Delete',
  message: `Are you sure you want to delete terminal`
}

const onRowSelect = (event: any) => {
  reactiveData.selectedRow = event.data
  console.log(event)
}

// const buttons: DialogCustomButton[] = [
//   {
//     text: 'Cancel',
//     type: 'reject',
//     color: 'danger',
//     response: new Error('cancel'),
//     size: 'sm',
//   },
//   {
//     text: 'Delete!',
//     type: 'resolve',
//     color: 'success',
//     response: 'delete',
//     size: 'lg',
//   },
// ]

async function askToUser() {
  try {
    const responseOne = await showDialogAndWaitChoice('one')

    if (responseOne === 'accept') {
      deleteTerminal()
      await StoreUtils.getter()?.terminal.getOrganisationTerminal(JSON.stringify(organisations.value?.organisationId))

    } else {
      console.log(responseOne)
    }

  } catch (error: any) {
    toast.error(error.message ?? error, {
      position: 'top-right'
    })
  }
}

const toast = useToast()

const menu = ref();


const terminalHeaders = [
  { label: 'terminalId', key: 'terminalId' },
  { label: 'terminalSerialNumber', key: 'terminalSerialNumber' },
  { label: 'terminalMerchantNameLocation', key: 'terminalMerchantNameLocation' },
  { label: 'terminalCreatedAt', key: 'terminalCreatedAt' }]


const terminalOrganizations = computed(() => StoreUtils.getter()?.terminal?.getTerminalOrganisations)

const organisations = computed(() => {
  return StoreUtils.getter()?.organisation.getCurrentOrganisation
})

const getSeverity = (status: string) => {
  switch (status) {
    case 'Declined':
      return 'danger';

    case 'ACTIVE':
      return 'sucess';

    case 'Pending':
      return 'warning';
  }
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  terminalStatus: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  // representative: { value: null, matchMode: FilterMatchMode.IN },
  terminalSerialNumber: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const toggle = (event: any) => {
  menu.value.toggle(event);
}

const deleteTerminal = () => {
  TerminalRequest.deleteTerminal.terminalId = reactiveData.selectedRow.terminalId
  StoreUtils.getter()?.terminal.deleteTerminal(TerminalRequest.deleteTerminal, toast)
}

const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'View',
        icon: 'pi pi-refresh',
        command: () => {
          reactiveData.visible = !reactiveData.visible
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-upload',
        command: () => {
          reactiveData.showUpdateTerminal = !reactiveData.showUpdateTerminal
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-upload',
        command: () => {
          askToUser()
        }
      }
    ]
  }
]);

const metaKey = ref(true);


function handleClose(payload: any) {
  reactiveData.showRequestTerminal = payload;
  reactiveData.showAssignTerminal = payload;
  reactiveData.showUpdateTerminal = payload;
}

function requestTerminal() {
  reactiveData.showRequestTerminal = !reactiveData.showRequestTerminal

}

function init() {
  console.log('Auth', StoreUtils.getter()?.auth.getUserInfo.userRoleId)
  StoreUtils.getter()?.terminal?.getOrganisationTerminal(JSON.stringify(organisations.value?.organisationId) ?? "")
}

init()

</script>

<template>
  <Dialog v-model:visible="reactiveData.visible" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div v-for="(i, key, index) in reactiveData.selectedRow" :key="index" class="flex justify-between">
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ key }}:</p>
      <p class="text-lg leading-relaxed text-gray-800 mb-4">{{ i }}</p>
    </div>
  </Dialog>

  <MazDialogPromise identifier="one" />

  <!-- <MazDialogPromise identifier="two" :buttons="buttons">
    <template #title>
      Do you really want to delete this user?
    </template>
    <template #default>
      Are you really sure you want to delete this user?
    </template>
  </MazDialogPromise> -->

  <MazDialog v-model="confirmDialog">
    <template #title>
      User deleted
    </template>
    <template #default>
      User has been deleted!
    </template>
    <template #footer="{ close }">
      <MazBtn @click="close">
        Ok
      </MazBtn>
    </template>
  </MazDialog>

  <RequestTerminal v-if="reactiveData.showRequestTerminal" @close="handleClose" />
  <UpdateTerminal :data="reactiveData.selectedRow" v-if="reactiveData.showUpdateTerminal" @close="handleClose" />
  <AssignTerminal v-if="reactiveData.showAssignTerminal" @close="handleClose" />
  <Motion :initial="{ opacity: 0, x: -100 }" :animate="{ opacity: 1, x: 0 }" :transition="{ duration: 0.5 }">
    <ContentHeader />

    <div class="content-table-section">
      <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:25px 0">

        <div style="display: flex; align-items: center; justify-content: center;gap:20px">
          <p class="text-xl text-black">Terminal Holders List</p>
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
          <BaseButton @click="requestTerminal">
            <div style="display: flex;align-items: center;gap: 5px;">
              <img src="../../assets/icon/Folder Add 2.svg" />
              Create Terminal
            </div>

          </BaseButton>
        </div>
      </div>

      <!-- <BaseTable
              pagination="true" search="true"
                :headers="terminalHeaders" :bodies="terminalOrganizations"
            ></BaseTable> -->


      <div class="overflow-auto rounded-lg shadow">

        <DataTable v-model:filters="filters" :value="terminalOrganizations" :metaKeySelection="metaKey"
          selectionMode="single" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows
          tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}" dataKey="id" filterDisplay="row"
          :globalFilterFields="['terminalStatus', 'terminalSerialNumber']" @rowSelect="onRowSelect">

          <template #header>
            <div class="flex justify-end">
              <span class="relative">
                <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                <InputText v-model="filters['global'].value" placeholder="Keyword Search"
                  class="pl-10 font-normal terminal_search" />
              </span>
            </div>
          </template>

          <template #empty>
            <div class="text-center">
              No Terminals found.
            </div>
          </template>
          <template #loading> Loading customers data. Please wait. </template>

          <Column v-for="col of terminalHeaders" :key="col.key" :field="col.key" :header="col.label"></Column>
          <!--terminal status-->
          <Column field="terminalStatus" header="terminalStatus">
            <template #body="slotProps">

              <div v-if="slotProps.data.terminalStatus">
                <Tag :value="slotProps.data.terminalStatus" :severity="getSeverity(slotProps.data.terminalStatus)" />
              </div>

            </template>
          </Column>
          <Column header="actions">

            <template #body="">
              <div class="flex">

                <img src="../../assets/icon/Dropdown.svg" @click="toggle" />

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
.content-table-section {
  padding: 2rem;
}

.bnt-trans-text {
  color: var(--dark_color);
}

.terminal_search {
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