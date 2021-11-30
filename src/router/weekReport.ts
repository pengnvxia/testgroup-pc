import layout from '@/layout/Index.vue';
import { RouteConfig } from 'vue-router';

const weekReport: RouteConfig[] = [{
    path: '/',
    name:'周报',
    component: layout,
    children: [
        {
            path: '/add',
            name: 'addWeekReport',
            component: ()=> import('@/views/WeekReport/Add.vue'),
        },
        {
            path: '/search',
            name: 'searchWeekReport',
            component: ()=> import('@/views/WeekReport/Search.vue'),
        },
        {
            path: '/edit/:id',
            name: 'editWeekReport',
            component: ()=> import('@/views/WeekReport/Edit.vue'),
        }
    ]
}

]

export default weekReport;
