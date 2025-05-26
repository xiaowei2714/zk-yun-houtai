<template>
    <div>
        <el-card class="!border-none mb-4" shadow="never">
            <el-form
                class="mb-[-16px]"
                :model="queryParams"
                inline
            >
                <el-form-item label="订单号" prop="order_no">
                    <el-input class="w-[280px]" v-model="queryParams.order_no" clearable placeholder="请输入订单号" />
                </el-form-item>
                <el-form-item label="订单类型" prop="order_type">
                    <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.order_type"
                               placeholder="请选择订单类型">
                        <el-option label="全部" value="" />
                        <el-option label="买入" :value="1" />
                        <el-option label="卖出" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.status"
                               placeholder="请选择状态">
                        <el-option label="全部" value="" />
                        <el-option label="待付款" :value="1" />
                        <el-option label="已付款" :value="2" />
                        <el-option label="已完成" :value="4" />
                        <el-option label="已取消" :value="5" />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="appeal">
                    <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.appeal"
                               placeholder="请选择状态">
                        <el-option label="全部" value="" />
                        <el-option label="已申诉" :value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none" v-loading="pager.loading" shadow="never">
<!--            <el-button v-perms="['ad_order/add']" type="primary" @click="handleAdd">-->
<!--                <template #icon>-->
<!--                    <icon name="el-icon-Plus" />-->
<!--                </template>-->
<!--                新增-->
<!--            </el-button>-->
            <el-button
                v-perms="['ad_order/delete']"
                :disabled="!selectData.length"
                @click="handleDelete(selectData)"
            >
                删除
            </el-button>
            <div class="mt-4">
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="买家" prop="username" show-overflow-tooltip />
                    <el-table-column label="卖家" prop="to_username" show-overflow-tooltip />
<!--                    <el-table-column label="广告" prop="ad_id" show-overflow-tooltip />-->
                    <el-table-column label="订单号" prop="order_no" show-overflow-tooltip min-width="170"/>
                    <el-table-column label="订单类型" prop="order_type" show-overflow-tooltip >
                        <template #default="{ row }">
                            <span v-if="row.order_type == 1">买入</span>
                            <span v-if="row.order_type == 2">卖出</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" prop="num" show-overflow-tooltip >
                        <template #default="{ row }">
                            <span>{{row.num}} Y币</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="总额" prop="price" show-overflow-tooltip >
                        <template #default="{ row }">
                            <span>￥{{row.price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价" prop="dan_price" show-overflow-tooltip >
                        <template #default="{ row }">
                            <span>￥{{row.dan_price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="支付方式" prop="pay_type" show-overflow-tooltip >
                        <template #default="{ row }">
                            <span v-if="row.pay_type == 'wx'">微信</span>
                            <span v-if="row.pay_type == 'zfb'">支付宝</span>
                            <span v-if="row.pay_type == 'yhk'">银行储蓄卡</span>
                            <span v-if="row.pay_type == 'usdt'">USDT</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" prop="status" show-overflow-tooltip >
                        <template #default="{ row }">
                            <span v-if="row.status == 1">待付款</span>
                            <span v-if="row.status == 2">已付款</span>
                            <span v-if="row.status == 3">申述</span>
                            <span v-if="row.status == 4">已完成</span>
                            <span v-if="row.status == 5">已取消</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="申诉" prop="appeal" show-overflow-tooltip >
                        <template #default="{ row }">
                            <span v-if="row.status == 1">已申诉</span>
                            <span v-else>未申诉</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="create_time" show-overflow-tooltip min-width="130"/>
<!--                    <el-table-column label="取消方式" prop="cancel_type" show-overflow-tooltip />-->
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
<!--                             <el-button-->
<!--                                v-perms="['ad_order/edit']"-->
<!--                                type="primary"-->
<!--                                link-->
<!--                                @click="handleEdit(row)"-->
<!--                            >-->
<!--                                编辑-->
<!--                            </el-button>-->
                            <el-button
                                v-perms="['ad_order/delete']"
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

<script lang="ts" setup name="adOrderLists">
import { usePaging } from '@/hooks/usePaging'
import { useDictData } from '@/hooks/useDictOptions'
import { apiAdOrderLists, apiAdOrderDelete } from '@/api/ad_order'
import { timeFormat } from '@/utils/util'
import feedback from '@/utils/feedback'
import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)


// 查询条件
const queryParams = reactive({
    order_no: '',
    order_type: '',
    status: ''
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
    fetchFun: apiAdOrderLists,
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
    await apiAdOrderDelete({ id })
    getLists()
}

getLists()
</script>

