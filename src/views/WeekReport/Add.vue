<template>
    <div class="dateInput">
        <a-range-picker @change="onChange" />
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component({
        components: {
        }
    })
    export default class Add extends Vue {
        private onChange(){
            console.log('aaa');
        }

    }
</script>

<style scoped lang="scss">

</style>

