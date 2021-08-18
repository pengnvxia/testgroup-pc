<template>
    <a-form-model :rules="ruleForm" :model="weekReportForm" ref="refForm">
        <div class="dateInput">
            <a-form-model-item prop="startEndTime" label="日期范围">
                <a-range-picker
                        @change="onChange"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        v-model="weekReportForm.startEndTime"
                />
            </a-form-model-item>
        </div>

        <div class="reportContent">
            <a-collapse defaultActiveKey="thisWeek">
                <a-collapse-panel header="本周工作内容" key="thisWeek">
                    <a-table :columns="columns" :data-source="weekReportForm.thisWeek" :pagination="false" :rowKey="rowKey">
                        <template v-for="col in ['priority','system','jobContent','problem']" :slot="col" slot-scope="text,record,index" rowkey="record.priority">
                            <a-form-model-item v-if="col == 'priority'">
                                <a-input v-model="record.priority" :disabled="true"/>
                            </a-form-model-item>
                            <a-form-model-item v-if="col == 'system'">
                                <a-input v-model="record.system"/>
                            </a-form-model-item>
                            <a-form-model-item v-if="col == 'jobContent'">
                                <a-input v-model="record.jobContent"/>
                            </a-form-model-item>
                            <a-form-model-item v-if="col == 'problem'">
                                <a-input v-model="record.problem"/>
                            </a-form-model-item>
                        </template>
                        <template slot="operation" slot-scope="text,record,index">
                            <a-icon type="minus" @click="handleDelete(index)" v-if="record.priority!=1"/>
                            <a-icon type="plus" @click="handleAdd(index)"/>
                        </template>
                    </a-table>
                </a-collapse-panel>
                <a-collapse-panel header="下周工作内容" key="nextWeek">
                    <a-table :columns="columns" :data-source="weekReportForm.nextWeek" :pagination="false" :rowKey="rowKey">
                        <template v-for="col in ['priority','system','jobContent','problem']" :slot="col" slot-scope="text,record,index" rowkey="record.priority">
                            <a-form-model-item v-if="col == 'priority'">
                                <a-input v-model="record.priority" :disabled="true"/>
                            </a-form-model-item>
                            <a-form-model-item v-if="col == 'system'">
                                <a-input v-model="record.system"/>
                            </a-form-model-item>
                            <a-form-model-item v-if="col == 'jobContent'">
                                <a-input v-model="record.jobContent"/>
                            </a-form-model-item>
                            <a-form-model-item v-if="col == 'problem'">
                                <a-input v-model="record.problem"/>
                            </a-form-model-item>
                        </template>
                        <template slot="operation" slot-scope="text,record,index">
                                <a-icon type="minus" @click="handleDeleteNext(index)" v-if="record.priority!=1"/>
                                <a-icon type="plus" @click="handleAddNext(index)"/>
                        </template>
                    </a-table>
                </a-collapse-panel>
            </a-collapse>
        </div>
        <a-form-model-item class="btn">
            <a-button type="primary" @click="handleSubmit" class="submitBtn">提交</a-button>
            <a-button @click="handleCancel" class="cancelBtn">取消</a-button>
        </a-form-model-item>
    </a-form-model>

</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { addHeader,add } from '@/services/weekReport/index';
    import moment from 'moment';


    interface Report {
        priority: number,
        system: string,
        jobContent: string,
        problem: string
    }

    @Component({
        components: {
        }
    })
    export default class Add extends Vue {

        private weekReportForm: any={
            startEndTime:[],
            startTime: '',
            endTime: '',
            thisWeek: [
                {

                    priority: 1,
                    system: '',
                    jobContent: '',
                    problem: ''
                }
            ],
            nextWeek: [
                {
                    priority: 1,
                    system: '',
                    jobContent: '',
                    problem: ''
                }
            ]
        }

        private columns= [
            {
                title: '编号',
                dataIndex: 'priority',
                width: '5%',
                scopedSlots: { customRender: 'priority' },
            },
            {
                title: '项目',
                dataIndex: 'system',
                scopedSlots: { customRender: 'system' },
            },
            {
                title: '工作内容',
                dataIndex: 'jobContent',
                scopedSlots: { customRender: 'jobContent' },
            },
            {
                title: '问题',
                dataIndex: 'problem',
                scopedSlots: { customRender: 'problem' },
            },
            {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }
        ]

        private ruleForm:any ={
            startEndTime: [
                {
                    type: 'array',
                    required: true,
                    // message: '请选择日期',
                    trigger: 'change',
                    validator: this.validateDateInput
                },
            ]
        }

        private validateDateInput(rule: any,value: any,callback: (msg?: any) => void) {
            if(value.length<=0){
                callback('请选择日期');
                return;
            }else {
                callback();
            }
        }

        private mounted(): void {
            addHeader(this.$route.query.userId as string);
        }

        private rowKey(record: any): number {
            return record.priority
        }

        private handleDelete(index: number): void {
            this.weekReportForm.thisWeek.splice(index,1);
            if(this.weekReportForm.thisWeek.length>=index){
                for(let i=index;i<this.weekReportForm.thisWeek.length;i++){
                    this.weekReportForm.thisWeek[i].priority=this.weekReportForm.thisWeek[i].priority-1;
                }
            }
        }

        private handleAdd(index: number): void {

            const newData = {
                priority: index+2,
                system: '',
                jobContent: '',
                problem: ''
            }
            if(this.weekReportForm.thisWeek.length>index+1){
                for(let i=this.weekReportForm.thisWeek.length-1;i>index;i--) {
                    this.weekReportForm.thisWeek[i].priority=this.weekReportForm.thisWeek[i].priority+1;
                }
            }
            this.weekReportForm.thisWeek.splice(index+1,0,newData);
        }

        private handleDeleteNext(index: number): void {
            this.weekReportForm.nextWeek.splice(index,1);
            if(this.weekReportForm.nextWeek.length>=index){
                for(let i=index;i<this.weekReportForm.nextWeek.length;i++){
                    this.weekReportForm.nextWeek[i].priority=this.weekReportForm.nextWeek[i].priority-1;
                }
            }
        }

        private handleAddNext(index: number): void {

            const newData = {
                priority: index+2,
                system: '',
                jobContent: '',
                problem: ''
            }
            if(this.weekReportForm.nextWeek.length>index+1){
                for(let i=this.weekReportForm.nextWeek.length-1;i>index;i--) {
                    this.weekReportForm.nextWeek[i].priority=this.weekReportForm.nextWeek[i].priority+1;
                }
            }
            this.weekReportForm.nextWeek.splice(index+1,0,newData);
        }

        private onChange(date: any, dateString: any){
            this.weekReportForm.startTime = dateString[0];
            this.weekReportForm.endTime = dateString[1];
        }

        private toDate(dateString: string): any {
            if(dateString.length<=0){
                return null
            }else {
                console.log(dateString,222)
                return moment(dateString).format('YYYY-MM-DD');
            }
        }

        private handleSubmit(): void {

            // add(this.weekReportForm).then(
            //     (result: any) => {
            //         if (result.errcode === "0") {
            //             this.$router.go(-1);
            //             this.$message.success("提交成功")
            //         }
            //     },
            //     (err: any) => {
            //         this.$message;
            //     }
            // );
            const ref: any = this.$refs.refForm;
            ref.validate((valid: boolean) => {
                if (valid) {
                    add(this.weekReportForm).then(
                        (result: any) => {
                            if (result.errcode === "0") {
                                this.$router.go(-1);
                                this.$message.success("提交成功")
                            }
                        },
                        (err: any) => {
                            this.$message;
                        }
                    );
                }else {
                    return false;
                }
                });


        }

        private handleCancel(): void {
            this.$router.go(-1);
        }



    }
</script>

<style scoped lang="scss">
    .dateInput {
        margin-top: 50px;
        margin-bottom: 20px;
        /deep/ .ant-col {
            display: inline-block;
        }
    }
    .ant-form {
        .btn {
            /deep/ .ant-form-item-control {
                position: absolute;
                left: 50%;
                margin-left: -90px;
                margin-top: 50px;

                .ant-form-item-children {
                    .submitBtn {
                        margin-right: 50px;
                    }
                }
            }
        }
        /deep/ .anticon {
            padding-left: 5px;
            padding-right: 5px;
        }
    }



</style>

