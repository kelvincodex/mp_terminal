<script lang="ts" setup>
import BaseLayout from '../BaseLayout.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import Dropdown from 'primevue/dropdown';
import { reactive, defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'close', value: boolean): void;
}>();



const data = reactive({
    showConfirmAgain:true,
    isRequestSent:false

})


function close(){
   emit('close', false)
}




</script>

<template>
    <BaseLayout>
        <template v-slot:child>
                <div v-show="!data.isRequestSent" class="modal-child-wrapper">
                    <div class="modal-child-header">
                        <p class="req-term">Assign Terminal</p>
                        <img src="../../../assets/icon/Frame.svg"  @click="close"/>
                    </div>

                    <div class="modal-child-content">
                        <div>
                            <label>Terminal I.D</label>
                            <Dropdown class="select-drowdown"></Dropdown>
                        </div>
                        <div>
                            <label>Assign To</label>
                            <Dropdown class="select-drowdown"></Dropdown>
                        </div>
                    
                    </div>

                

                    <!-- <div class="divider"></div> -->


                    <div class="modal-child-footer">
                        <BaseButton bg-color="transparent" bg-border="#D0D5DD" @click="close">
                            <p class="bnt-trans-text">Cancel</p>
                        </BaseButton>
                        <BaseButton>Assign Terminal</BaseButton>

                    </div>

                </div>
            

          
        </template>
    </BaseLayout>
</template>

<style scoped>
.confirm-request-subtitle{
    /* Supporting text */

    /* width: 424px;
    height: 20px; */

    /* Text sm/Regular */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    /* Gray/500 */
    color: #667085;


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;

}

.confirm-request-title{
    /* Text */

/* Text lg/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 28px;
/* identical to box height, or 156% */

/* Gray/900 */
color: #101828;


}
.select-drowdown{
    /* Input */

    box-sizing: border-box;

    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;

    width: 315px;
    height: 41px;

    /* White */
    background: #FFFFFF;
    /* Gray/300 */
    border: 1px solid #D0D5DD;
    /* Shadow/xs */
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;

    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;

}
.req-term{
    /* Assign Terminal */

height: 20px;

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 20px;
/* identical to box height, or 100% */

/* Text */
color: #222222;


}
.bnt-trans-text{
    color: var(--dark_color);
}
.divider{
    /* Divider */

    width: 702px;
    height: 1px;

    /* Gray/200 */
    background: #EAECF0 !important;

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;

}


.modal-child-wrapper{
    /* Assign Terminal Form */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    width: 702px;
    height: 271px;

    /* White */
    background: #FFFFFF;
    /* Shadow/sm */
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 8px;
    margin: 100px auto;


}

.modal-child-header{
    /* New registration header */

box-sizing: border-box;
cursor: pointer;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 16px 24px;
gap: 10px;

width: 702px;
height: 78px;

background: #FFFFFF;
border-bottom: 1px solid #E6E6E6;
border-radius: 16px 16px 0px 0px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;

}

.modal-child-content{
    /* Content */

/* Auto layout */
display: flex;
align-items: flex-start;
padding: 24px;
gap: 24px;

width: 702px;
height: 120px;

/* White */
background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
border-bottom: 1px solid #E6E6E6;



}

.modal-child-footer{
    /* Footer */

/* Auto layout */
display: flex;
align-items: center;
padding:0 24px;
justify-content: end;
width: 702px;
height: 73px;
gap: 12px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;

}

.modal-confirm-div{
    /* Request Terminal Confirm */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 24px;
gap: 24px;

position: relative;
width: 544px;
height: 180px;

/* White */
background: #FFFFFF;
/* Shadow/xl */
box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);
border-radius: 12px;
margin: 100px auto;


}


.modal-confirm-inner-div{
/* Content */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 424px;
height: 132px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


}

.modal-confirm-inner-div-footer{
    display: flex;

    align-items: center;
    padding:0 24px;
    justify-content: end;
    gap: 12px;
    width: 100%;
    /* Inside auto layout */
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;
}
</style>