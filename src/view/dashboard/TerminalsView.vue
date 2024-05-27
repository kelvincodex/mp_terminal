<script lang="ts" setup>
import BaseTable from '@/components/table/BaseTable.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import RequestTerminal from '@/components/modal/terminal/RequestTerminal.vue';
import { reactive } from 'vue';
import AssignTerminal from '@/components/modal/terminal/AssignTerminal.vue';
import {Motion} from "motion/vue";


const data = reactive({
  showRequestTerminal:false,
  showAssignTerminal:false
})


function handleClose(payload:any) {
  data.showRequestTerminal = payload;
  data.showAssignTerminal = payload
}

function requestTerminal(){
  data.showRequestTerminal = !data.showRequestTerminal

}
function assignTerminal(){
  data.showAssignTerminal = !data.showAssignTerminal

}
</script>

<template>
    <RequestTerminal v-if="data.showRequestTerminal" @close="handleClose" />
    <AssignTerminal v-if="data.showAssignTerminal" @close="handleClose"/>
    <Motion :initial="{opacity: 0, x: -100}" :animate="{opacity: 1, x: 0}" :transition="{duration: 0.5}">  


    <div class="content-table-section">
        <div style="display: flex; align-items: center; justify-content: space-between;gap:20px;margin:25px 0">

        <div style="display: flex; align-items: center; justify-content: center;gap:20px">
          <p class="text-xl text-black">Terminal List</p>
          <img src="../../assets/icon/alert-circle.svg" />
          <div>
            <input class="terminal_search"  placeholder="Search"/>
          </div>
        
        </div>
        <div style="display: flex; align-items: center; justify-content: center;gap:20px">
          <BaseButton bg-color="transparent" bg-border="#D0D5DD" @click="assignTerminal">
            <img src="../../assets/icon/Group 2.svg" />
            <p class="bnt-trans-text">Assgin Terminal</p>
           
          </BaseButton>
          <BaseButton @click="requestTerminal">
            <img src="../../assets/icon/Folder Add 2.svg" />
            Request Terminal
          
        </BaseButton>
        </div>
        </div>
     
        <BaseTable></BaseTable>
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

width: 320px;
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