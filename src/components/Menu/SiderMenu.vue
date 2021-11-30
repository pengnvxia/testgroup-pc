<template>
    <div style="width: 256px">
        <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
            <a-menu-item key="1">
                <a-icon type="file-text" />
                <span>周报</span>
            </a-menu-item>
        </a-menu>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class SiderMenu extends Vue {

    }
</script>
