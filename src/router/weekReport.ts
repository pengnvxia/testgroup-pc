import { RouteConfig } from 'vue-router';

const weekReport: RouteConfig[] = [
    {
        path: '/add',
        name: 'addWeekReport',
        component: ()=> import('@/views/WeekReport/Add.vue'),
    }
]

export default weekReport;
