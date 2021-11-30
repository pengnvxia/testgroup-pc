<template>
    <a-dropdown class="header">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
<!--            {{username}}-->
        </a>
    </a-dropdown>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class Header extends Vue {

        // private username: String|null='';
        // get username(): String|null {
        //     return localStorage.getItem('username');
        // }
        // private mounted(): void {
        //     this.username=localStorage.getItem('username');
        // }

    }
</script>

<style scoped lang="scss">
    .ant-layout-header {
        /deep/ .ant-dropdown-link {
            float: right;
        }
    }

</style>
