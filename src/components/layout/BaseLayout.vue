<script setup lang="ts">
import {computed, onMounted} from "vue";
import {router} from "@/router/index";
import {SidebarTopUtils, SidebarBottomUtils} from "@/util/constant/SidebarUtils.ts";
import { reactive } from "vue";

const data = reactive({
  mounting:true
})

onMounted(() => {
  setTimeout(() => {
    data.mounting = false
  },500)
  
})

const getCurrentRoute = computed(() => {
  return router.currentRoute.value.name

})

const getCurrentRoutePath = computed(() => {
  return router.currentRoute.value.fullPath

})

const getCurrentRouteSubTitle = computed(() => {
  return router.currentRoute.value?.meta.sub_title

})

</script>

<template>
    <div class="loading-wrapper" v-if="data?.mounting"></div>
    <div class="dashboard-wrapper-layout" v-else v-cloak>
    
      <div class="sidebar-wrapper" :class="{'no-sidebar':getCurrentRoute === 'Login'}">
        <div class="sidebar-wrapper-header">
          <img class="logo" src="@/assets/icon/logo_white.svg" alt="">
        </div>
        <div class="search-wrapper">
          <input class="search-input" type="text" placeholder="Search..." autocomplete="off" />
        </div>

        <div class="sidebar-menubar">

          <div class="sidebar-top-nav">
            <router-link  :to='i.route' v-for="(i, index) in SidebarTopUtils" :key="index" class="nav-item-base" :class="{'active-nav':getCurrentRoutePath === i.route}">
              <img :src="i.icon" alt=""/>
              <p>{{i.name}}</p>
            </router-link>
          </div>
            <div class="sidebar-bottom-nav">
            <router-link  :to='i.route' v-for="(i, index) in SidebarBottomUtils" :key="index" class="nav-item-base">
              <img :src="i.icon"/>
              <p>{{i.name}}</p>
            </router-link>
          </div>
          
        </div>
      </div>
      
        <div class="dashboard-main" :class="{'authView': getCurrentRoute === 'Login'}">
          <div class="content-header" v-if="getCurrentRoute !== 'Login'">
              <div>
                <h3 class="text-4xl text-black mb-0.5">{{getCurrentRoute}}</h3>
                <p class="text-sm">{{getCurrentRouteSubTitle}}</p>
              </div>
              <div class="content-inner-container-right">
                <img src="@/assets/icon/main-logo.57311ad2.svg" alt="">              

              </div>
            </div>

            <slot name="children"></slot>
        
        </div>
    
    </div>

</template>

<style scoped>
[v-cloak] {
    display: none;
  }

  .sidebar-menubar{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 30%);
  }

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


  .loading-wrapper{
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
  }
.dashboard-wrapper-layout{
  width: 100%;
  background-color: #fff !important;
  display: flex;
  min-height: 100vh;

}

.dashboard-main{
  width: calc(100% - 294px);
  min-height: 100%;
}

.authView{
  width: 100% !important;
}



.sidebar-wrapper{
  width: 294px;
  background-color: var(--light_primary);
  display: block;
  transition: ease-in 0.3s;
  /* Sidebar navigation */
  padding: 25px;
  min-height: inherit;

  /* Bizgem primary */

  /* Inside auto layout */

}


.sidebar-top-nav{
  width: 100%;
}

.sidebar-bottom-nav{
  width: 100%;
}

.search-input{
  /* Input */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 10.5px 14.7px;
gap: 8.4px;

width: 100%;
height: 47px;

background: rgba(167, 196, 222, 0.02);
/* White */
border: 1.05px solid #F7F7F7;
box-shadow: 0px 1.05px 2.1px rgba(16, 24, 40, 0.05);
border-radius: 8.4px;
margin: 25px 0;

/* Inside auto layout */
flex: none;
/* order: 0;
align-self: stretch;
flex-grow: 0; */

}

.search-input::placeholder{
  color: #fff;
}


.nav-item-base{
  /* _Nav item base */

  /* Auto layout */
  display: flex;
  align-items: center;
  padding: 8.4px 12.6px;
  gap: .4rem;

  width: 100%;
  height: 42px;
  /* Text */

  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  /* identical to box height, or 150% */

  /* Gray/100 */
  color: #fff;

  margin-bottom: 12px;
  cursor: pointer;

}

.nav-item-base:hover{
  background-color: #0F3E5F;
  color: #fafafa;
  font-weight: 700;
  background: #0F3E5F;
  border-radius: 6.3px;

}

.active-nav{
  background-color: #0F3E5F;
  color: #fafafa;
  font-weight: 700;
  background: #0F3E5F;
  border-radius: 6.3px;
}

.no-sidebar{
  width: 0;
  opacity:0;
  background-color: #fff;
  display: none;
}

@media (max-width: 1024px) {
  .sidebar-wrapper{
    display: none;

  }

}

@media (max-width: 1024px) {
  .dashboard-main{
    width: 100%;
    min-height: 100%;
  }

}
</style>