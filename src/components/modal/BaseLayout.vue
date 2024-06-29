<script lang="ts" setup></script>

<template>
    <div class="modal-layout">
        
            <slot name="child"></slot>
     

    </div>
</template>

<style scoped>
.modal-layout{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.329);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: start;
}

</style>