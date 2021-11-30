<template>
    <div class="weekReportBar">
        <a-form-model layout="inline">
            <a-form-model-item label="开始日期：">
                <a-date-picker @change="startChange" :value="searchRequest.startTime"/>
            </a-form-model-item>
            <a-form-model-item label="结束日期：">
                <a-date-picker @change="endChange" :value="searchRequest.endTime"/>
            </a-form-model-item>
            <a-form-model-item label="姓名：">
                <a-select class="formSel" @change="handleChange" v-model="selectValue">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option v-for="item in userInfo" :value="item.id">{{ item.username }}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" @click="handleSearch">查询</a-button>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" @click="handleReset">重置</a-button>
            </a-form-model-item>
            <div class="blank"></div>
            <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
        </a-form-model>
        <a-list item-layout="vertical" size="large" :data-source="searchFrom" :pagination="false" :split="false">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta :description="item.description">
                    <div slot="title">
                        <span class="titleAction">{{ item.createdBy }}</span>
                        <span class="titleAction">{{ item.startTime + '至' + item.endTime }}</span>
                        <a-icon class="iconAction" type="delete" @click="deleteReport(item.id)"/>
                        <a-icon class="iconAction" type="edit" @click="editReport(item.id)"/>
                    </div>
                </a-list-item-meta>
                <span>本周工作：</span>
                <a-table :data-source="item.thisWeek" :columns="columns" :pagination="false" :rowKey="rowKey"/>
                <span>下周工作：</span>
                <a-table :data-source="item.nextWeek" :columns="columns" :pagination="false" :show-header="false" :rowKey="rowKey"/>
            </a-list-item>
        </a-list>
        <div class="pagination">
            <a-pagination
                    showSizeChanger
                    :showTotal="paginationConf.showTotal"
                    :current="paginationConf.current"
                    :total="paginationConf.total"
                    :defaultPageSize="paginationConf.defaultPageSize"
                    :pageSizeOptions="paginationConf.pageSizeOptions"
                    @change="handlePageChange"
                    @showSizeChange="showSizeChange"
            />
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { search,deleteReport } from '@/services/weekReport/index';
    import { list, getUserInfo } from '@/services/users/index';
    import { Pagination } from "ant-design-vue";
    import { addHeader } from '@/services/weekReport/index';



    @Component({
        components: {
        }
    })
    export default class Search extends Vue {

        private searchRequest: any = {
            userId: '',
            startTime: null,
            endTime: null,
            current: '1',
            size: '10'
        }
        private pageSize: number = 10;
        private paginationConf: any = {
            total: 0,
            showSizeChanger: true,
            showTotal: (total: number) => `共 ${total} 条记录`,
            // hideOnSinglePage: true,
            defaultPageSize: this.pageSize,
            pageSizeOptions: ["10", "20"],
            current: 1
        };

        private searchFrom: any=[];

        private userInfo: any=[];

        private selectValue: string='0';

        private columns = [
            {
                title: '序号',
                dataIndex: 'priority',
                width: '10%',
                scopedSlots: {customRender: 'priority'}
            },
            {
                title: '系统',
                dataIndex: 'system',
                width: '20%',
                scopedSlots: {customRender: 'system'}

            },
            {
                title: '工作内容',
                dataIndex: 'jobContent',
                width: '50%',
                scopedSlots: {customRender: 'jobContent'}
            },
            {
                title: '问题',
                dataIndex: 'problem',
                width: '30%',
                scopedSlots: {customRender: 'problem'}
            }
        ]

        private mounted(): void {
            addHeader(this.$route.query.userId as string);
            this.saveUserInfo();
            this.getSearch();
            this.getUserList();
        }

        private saveUserInfo(): void {
            getUserInfo().then(
                (result: any) => {
                    if (result.errcode === "0") {
                        localStorage.setItem('uid',result.retval.id);
                        localStorage.setItem('username',result.retval.username);
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }

        private startChange(date: any, dateString: any): void {
            this.searchRequest.startTime=dateString;
        }

        private endChange(date: any, dateString: any): void {
            this.searchRequest.endTime=dateString;
        }

        private handleChange(value: any): void {
            if(value==0){
                this.searchRequest.userId=null;
            }else {
                this.searchRequest.userId=value;
            }
        }

        private getUserList(): void {
            list().then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.userInfo=result.retval;
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }

        private getSearch(): void {
            search(this.searchRequest).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        if(result.retval.weekReportList!=null){
                            this.searchFrom=result.retval.weekReportList;
                        }else {
                            this.searchFrom=[];
                        }
                        this.paginationConf.total=result.retval.total;
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }

        private handlePageChange(pagination: Pagination): void{
            this.paginationConf.current = pagination;
            // if (this.pageSize !== pagination.pageSize) {
            //     this.paginationConf.current = 1;
            //     this.pageSize = pagination.pageSize as number;
            // }
            this.searchRequest.current=pagination;
            this.getSearch();
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }

        private showSizeChange(current: number, pageSize: number): void {
            this.searchRequest.current=1;
            this.paginationConf.current = 1;
            this.searchRequest.size = pageSize;
            this.paginationConf.defaultPageSize = pageSize;
            // this.clearCheckList();
            this.getSearch();
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }

        private rowKey(record: any): number {
            return record.detailId;
        }

        private deleteReport(id: number): void {

            deleteReport(id).then(
                (result: any) => {
                    if (result.errcode === "0") {
                        this.$message.success("删除成功！")
                        if(this.paginationConf.total%this.paginationConf.defaultPageSize==1 && this.paginationConf.total!=1){
                            this.searchRequest.current=this.searchRequest.current-1;
                            this.paginationConf.current = this.paginationConf.current-1;
                        }
                        this.getSearch();
                    }
                },
                (err: any) => {
                    this.$message;
                }
            )
        }

        private editReport(id: number): void {
            this.$router.push({
                name: 'editWeekReport',
                params: {id: String(id)},
                query: {
                    userId: this.$route.query.userId as string
                }
            });
        }

        private handleAdd(): void {
            this.$router.push({
                name: 'addWeekReport',
                query: {
                    userId: this.$route.query.userId as string
                }
            })
        }

        private handleSearch(): void {
            this.getSearch();

        }

        private handleReset(): void {
            this.searchRequest.startTime=null;
            this.searchRequest.endTime=null;
            this.searchRequest.userId='';
            this.selectValue='0';
            this.getSearch();
        }

    }



</script>
<style scoped lang="scss">
    .weekReportBar {
        margin-top: 30px;
        .ant-form-item {
            margin-right: 120px;
            .formSel {
                width: 180px;
            }

        }

        .ant-list {
            /deep/ .ant-list-item-meta-title {
                .titleAction {
                    margin-right: 10px;
                }

                .iconAction {
                    float: right;
                    overflow: auto;
                    margin-right: 20px;
                }
            }
        }

        .blank {
            width: 100%;
            height: 50px;
        }
        .ant-list-item {
            .ant-table {
                border: 0;
            }
            /deep/ .titleAction {
                color: #0098ff;
            }
        }
    }

    .pagination {
        position: absolute;
        right: 20px;
    }

</style>
