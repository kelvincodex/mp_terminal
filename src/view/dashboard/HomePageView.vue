<script setup lang="ts">
import BaseCard from "../../components/cards/BaseCard.vue";
import BaseTable from "@/components/table/BaseTable.vue";
import Chart from 'primevue/chart';
import {Motion} from "motion/vue";
import { ref, onMounted } from "vue";

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--cyan-500'),
        yAxisID: 'y',
        tension: 0.4,
        data: [65, 59, 80, 81, 56, 55, 10]
      },
      {
        label: 'Dataset 2',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--gray-500'),
        yAxisID: 'y1',
        tension: 0.4,
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  return {
    stacked: false,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: textColorSecondary
        },
        grid: {
          drawOnChartArea: false,
          color: surfaceBorder
        }
      }
    }
  };
}

</script>

<template>
 <Motion :initial="{opacity: 0, x: -100}" :animate="{opacity: 1, x: 0}" :transition="{duration: 0.5}">  
        
  <div class="content">
    <div class="content-card-section">
      <base-card text="Total Transaction" amount="2,420"></base-card>
      <base-card text="Successfull Transaction" amount="1198"></base-card>
      <base-card text="Pending Transaction" amount="502"></base-card>
      <base-card text="Failed Transaction" amount="32"></base-card>
    </div>

    <div class="content-chart-section">
      <div style="display: flex; align-items: center; justify-content: space-between;margin:25px 0">
        <div style="display: flex; align-items: center; justify-content: center;gap:20px">
          <p class="text-xl text-black">Statistics</p>
          <img src="../../assets/icon/alert-circle.svg" />
          <div style="position:relative;display:flex;align-items:center;justify-content:center;gap:5px;">
            <p class="circle-sm"></p>
            <p>Success</p>
          </div>
          <div style="position:relative;display:flex;align-items:center;justify-content:center;gap:5px;">
            <p class="circle-sm pending"></p>
            <p>Pending</p>
          </div>
          <div style="position:relative;display:flex;align-items:center;justify-content:center;gap:5px;">
            <p class="circle-sm failed"></p>
            <p>Failed</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: center;gap:20px">
          <span>Filter by:</span>
          <div class="date-picker" style="display: flex; align-items: center; justify-content: center;">
            <img src="../../assets/icon/Ic.svg" alt="">
            <p>July 12, 2021 - August 10, 2021</p>

          </div>
        </div>
      </div>
      <div class="card">
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
      </div>
    </div>


    <div class="content-table-section">
      <div style="display: flex; align-items: center; justify-content: start;gap:20px;margin:25px 0">
        <p class="text-xl text-black">Recent Transaction</p>
        <img src="../../assets/icon/alert-circle.svg" />
      </div>
      <BaseTable></BaseTable>
    </div>
  </div>
</Motion>
</template>

<style scoped>
.content{
  background-color: white;
}

.circle-sm{
  /* Ellipse 18 */
  width: 14px;
  height: 14px;
  left: 0;
  top: 4.24px;
  border-radius: 50%;

  background: #10A711;

}

.pending{
  background: #FF8A00;

}

.failed{
  background: #FF0000;

}

.date-picker{
  /* BTN */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14.8291px 16.9476px;
  gap: 8.47px;

  width: 280.32px;
  height: 50.84px;

  background: #F6F6F8;
  border-radius: 4.23689px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  cursor:pointer;

}

.content-card-section{
  display: flex;
  padding: 2rem;
  gap: 25px;
  overflow-x: scroll;
  justify-content: space-between;
}

.content-card-section::-webkit-scrollbar {
  display: none;
}

.content-table-section{
  padding: 2rem;
}

.content-chart-section{
  padding: 2rem;
}
</style>

