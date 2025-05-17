<template>
    <div>
        <el-card class="!border-none mb-4" shadow="never">
            <el-form
                class="mb-[-16px]"
                :model="queryParams"
                inline
            >
                <el-form-item label="单号" prop="sn">
                    <el-input class="w-[280px]" v-model="queryParams.sn" clearable placeholder="请输入单号" />
                </el-form-item>
                <el-form-item label="充值账户" prop="account">
                    <el-input class="w-[280px]" v-model="queryParams.account" clearable placeholder="请输入充值账户" />
                </el-form-item>
                <el-form-item label="运营商" prop="account_type">
                    <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.account_type" placeholder="请选择运营商">
                        <el-option label="移动" :value="1" />
                        <el-option label="联通" :value="2" />
                        <el-option label="电信" :value="3" />
                        <el-option label="虚拟" :value="4" />
                    </el-select>
<!--                    <el-input class="w-[280px]" v-model="queryParams.account_type" clearable placeholder="请输入运营商" />-->
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.status" placeholder="请选择状态">
                        <el-option label="待充值" :value="1" />
                        <el-option label="充值中" :value="2" />
                        <el-option label="充值成功" :value="3" />
                        <el-option label="充值失败" :value="4" />
                    </el-select>
<!--                    <el-input class="w-[280px]" v-model="queryParams.status" clearable placeholder="请输入状态" />-->
                </el-form-item>
                <el-form-item label="时间" prop="start_time">
                    <daterange-picker
                        v-model:startTime="queryParams.start_time"
                        v-model:endTime="queryParams.end_time"
                    />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.type" placeholder="请选择类型">
                        <el-option label="全部" :value="-1" />
                        <el-option label="话费" :value="1" />
                        <el-option label="电费" :value="2" />
                    </el-select>
                    <!--                    <el-input class="w-[280px]" v-model="queryParams.status" clearable placeholder="请输入状态" />-->
                </el-form-item>

<!--                <el-form-item label="结束处理时间" prop="end_time">-->
<!--                    <daterange-picker-->
<!--                        v-model:startTime="queryParams.start_time"-->
<!--                        v-model:endTime="queryParams.end_time"-->
<!--                    />-->
<!--                </el-form-item>-->

                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none" v-loading="pager.loading" shadow="never">
<!--            <el-button v-perms="['order/add']" type="primary" @click="handleAdd">-->
<!--                <template #icon>-->
<!--                    <icon name="el-icon-Plus" />-->
<!--                </template>-->
<!--                新增-->
<!--            </el-button>-->
            <div style="display: flex;align-items: center;">
                <el-button
                    v-perms="['order/delete']"
                    :disabled="!selectData.length"
                    type="primary"
                    @click="handleDelete(selectData)"
                >
                    批量查询余额
                </el-button>
                <el-button
                    v-perms="['order/delete']"
                    :disabled="!selectData.length"
                    type="warning"
                    @click="handleDelete(selectData)"
                >
                    批量充值中
                </el-button>
                <el-button
                    v-perms="['order/delete']"
                    :disabled="!selectData.length"
                    type="success"
                    @click="handleDelete(selectData)"
                >
                    批量成功
                </el-button>
                <el-button
                    v-perms="['order/delete']"
                    :disabled="!selectData.length"
                    type="danger"
                    @click="handleDelete(selectData)"
                >
                    批量失败
                </el-button>
                <el-button
                    v-perms="['order/delete']"
                    :disabled="!selectData.length"
                    @click="handleDelete(selectData)"
                >
                    删除
                </el-button>
                <div style="margin-left: 20px">结果总金额：<span>￥0.00</span></div>
            </div>

            <div class="mt-4">
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="单号" prop="sn" show-overflow-tooltip />
                    <el-table-column label="客户" prop="user_id" show-overflow-tooltip />
                    <el-table-column label="充值账户" prop="account" show-overflow-tooltip />
<!--                    <el-table-column label="运营商" prop="account_type" show-overflow-tooltip />-->
                    <el-table-column label="金额" prop="price" show-overflow-tooltip />
                    <el-table-column label="充值前余额" prop="recharge_up_price" show-overflow-tooltip />
                    <el-table-column label="充值后余额" prop="recharge_down_price" show-overflow-tooltip />
                    <el-table-column label="到账金额" prop="balances_price" show-overflow-tooltip />
                    <el-table-column label="状态" prop="status" show-overflow-tooltip />
                    <el-table-column label="时间" prop="start_time">
                        <template #default="{ row }">
                          <span>{{ row.start_time ? timeFormat(row.start_time, 'yyyy-mm-dd hh:MM:ss') : '' }}</span>
                        </template>
                    </el-table-column>
<!--                    <el-table-column label="结束处理时间" prop="end_time">-->
<!--                        <template #default="{ row }">-->
<!--                          <span>{{ row.end_time ? timeFormat(row.end_time, 'yyyy-mm-dd hh:MM:ss') : '' }}</span>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column label="支付时间" prop="pay_time" show-overflow-tooltip />-->
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
                             <el-button
                                v-perms="['order/edit']"
                                type="primary"
                                link
                                @click="handleEdit(row)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                v-perms="['order/delete']"
                                type="danger"
                                link
                                @click="handleDelete(row.id)"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="flex mt-4 justify-end">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
        <edit-popup v-if="showEdit" ref="editRef" :dict-data="dictData" @success="getLists" @close="showEdit = false" />
    </div>
</template>

<script lang="ts" setup name="orderLists">
import { usePaging } from '@/hooks/usePaging'
import { useDictData } from '@/hooks/useDictOptions'
import { apiOrderLists, apiOrderDelete } from '@/api/order'
import { timeFormat } from '@/utils/util'
import feedback from '@/utils/feedback'
import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)


// 查询条件
const queryParams = reactive({
    sn: '',
    account: '',
    account_type: '',
    status: '',
    start_time: '',
    end_time: ''
})

// 选中数据
const selectData = ref<any[]>([])

// 表格选择后回调事件
const handleSelectionChange = (val: any[]) => {
    selectData.value = val.map(({ id }) => id)
}

// 获取字典数据
const { dictData } = useDictData('')

// 分页相关
const { pager, getLists, resetParams, resetPage } = usePaging({
    fetchFun: apiOrderLists,
    params: queryParams
})

// 添加
const handleAdd = async () => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('add')
}

// 编辑
const handleEdit = async (data: any) => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('edit')
    editRef.value?.setFormData(data)
}

// 删除
const handleDelete = async (id: number | any[]) => {
    await feedback.confirm('确定要删除？')
    await apiOrderDelete({ id })
    getLists()
}

getLists()
</script>

