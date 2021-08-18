<template>
    <div>
        <a-layout id="components-layout-demo-side" style="min-height: 100vh">
<!--            <a-layout-sider :trigger="null" v-model="collapsed" collapsible width="256px">-->
<!--                <div class="logo" >自动化平台</div>-->
<!--                <SiderMenu></SiderMenu>-->
<!--            </a-layout-sider>-->
            <a-layout>
                <a-layout-header style="background: #fff; padding: 0" >
                    <a-icon class="trigger" :type="collapsed ? 'menu-unfold':'menu-fold'" @click="collapsed = !collapsed"></a-icon>
                    <Breadcrumb></Breadcrumb>
                    <Header></Header>
                </a-layout-header>
                <a-layout-content style="margin: 0 16px">
                    <router-view/>
                </a-layout-content>
                <a-layout-footer style="text-align: center">
                    <Footer></Footer>
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>
