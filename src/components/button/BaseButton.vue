<template>
  <motion
    :hover="{scale: 1.04, opacity: 0.9}"
    :press="{scale: 0.8}"
  >
    <MazBtn class="container" :color="loadingColor" :loading="loading" :type="type"><slot></slot></MazBtn>
  </motion>
</template>

<script setup>
import {Motion} from "motion/vue";
import MazBtn from 'maz-ui/components/MazBtn'
import { color } from "chart.js/helpers";


const props = defineProps({
  class:String,
  bgBorder:String,
  type:String,
  loading:Boolean,
  loadingColor:String,

})
</script>
<style scoped>
  .container{
    /* height: 47px; */
    /* @apply bg-primary my-6; */
    width: 100%;
    border-radius: 8px;
    background-color: var(--light_primary) !important;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    gap: 10px;
    color: #fff !important;
    padding: 10px;

  }
  /* button {
    color: var(--light-color);
    font-size: 16px;
    line-height: 24px;
    color: var(--light_color);
    margin: 20px 0;
  } */
</style>