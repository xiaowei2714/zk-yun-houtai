<template>
    <div>

        <!--搜索条件-->
        <el-card class="!border-none mb-4" shadow="never">
            <el-form
                class="mb-[-16px]"
                :model="queryParams"
                inline
            >
                <el-form-item label="状态" prop="status">
                    <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.status"
                               placeholder="请选择状态">
                        <el-option label="全部" value="" />
                        <el-option label="未上架" :value="1" />
                        <el-option label="已上架" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="!border-none" v-loading="pager.loading" shadow="never">

            <!--批量操作-->
            <el-button
                type="success"
                :disabled="!selectData.length"
                @click="handleBatchOn(selectData)"
            >
                批量上架
            </el-button>
            <el-button
                type="warning"
                :disabled="!selectData.length"
                @click="handleBatchOff(selectData)"
            >
                批量下架
            </el-button>
            <el-button
                v-perms="['ad_order/delete']"
                type="danger"
                :disabled="!selectData.length"
                @click="handleDelete(selectData)"
            >
                批量删除
            </el-button>

            <!--列表-->
            <div class="mt-4">
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="客户" prop="username" show-overflow-tooltip />
                    <el-table-column label="出售数量" prop="num" show-overflow-tooltip>
                        <template #default="{ row }">
                            {{ row.num }} Y币
                        </template>
                    </el-table-column>
                    <el-table-column label="剩余数量" prop="left_num" show-overflow-tooltip>
                        <template #default="{ row }">
                            {{ row.left_num }} Y币
                        </template>
                    </el-table-column>
                    <el-table-column label="出售单价" prop="price" show-overflow-tooltip />
                    <el-table-column label="最小交易额" prop="min_price" show-overflow-tooltip>
                        <template #default="{ row }">
                            {{ row.min_price }} Y币
                        </template>
                    </el-table-column>
                    <el-table-column label="最大交易额" prop="max_price" show-overflow-tooltip>
                        <template #default="{ row }">
                            {{ row.max_price }} Y币
                        </template>
                    </el-table-column>
                    <el-table-column label="交易时限" prop="pay_time" show-overflow-tooltip>
                        <template #default="{ row }">
                            {{ row.pay_time }} 分钟
                        </template>
                    </el-table-column>
                    <el-table-column label="支付方式" prop="pay_type" show-overflow-tooltip>
                        <template #default="{ row }">
                            <span v-if="row.pay_type.includes('wx')">微信<br /></span>
                            <span v-if="row.pay_type.includes('zfb')">支付宝<br /></span>
                            <span v-if="row.pay_type.includes('yhk')">银行卡<br /></span>
                            <span v-if="row.pay_type.includes('usdt')">USTD<br /></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商家提示" prop="tips" show-overflow-tooltip />
                    <el-table-column label="状态" prop="status" show-overflow-tooltip>
                        <template #default="{ row }">
                            <span v-if="row.status == 1">未上架</span>
                            <span v-else>已上架</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="发布时间" prop="create_time" show-overflow-tooltip />
                    <el-table-column label="操作" min-width="110" fixed="right">
                        <template #default="{ row }">
                            <el-button
                                v-if="row.status == 1"
                                @click="handleOn(row.id)"
                                type="success">
                                上架
                            </el-button>
                            <el-button
                                v-if="row.status == 2"
                                @click="handleOff(row.id)"
                                type="warning">
                                下架
                            </el-button>
                            <el-button
                                v-perms="['ad/delete']"
                                type="danger"
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

<script lang="ts" setup name="adLists">
import { usePaging } from '@/hooks/usePaging'
import { useDictData } from '@/hooks/useDictOptions'
import feedback from '@/utils/feedback'
import EditPopup from './edit.vue'
import { apiAdDelete, apiAdLists, apiAdOn, apiAdBatchOn, apiAdOff, apiAdBatchOff } from '@/api/ad'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)


// 查询条件
const queryParams = reactive({
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
    fetchFun: apiAdLists,
    params: queryParams
})

// 上架
const handleOn = async (id: number | any[]) => {
    await feedback.confirm('确定要上架？')
    await apiAdOn({ id })
    getLists()
}

// 批量上架
const handleBatchOn = async (id: number | any[]) => {
    await feedback.confirm('确定要更新上架？')
    await apiAdBatchOn({ id })
    getLists()
}

// 下架
const handleOff = async (id: number | any[]) => {
    await feedback.confirm('确定要下架？')
    await apiAdOff({ id })
    getLists()
}

// 批量下架
const handleBatchOff = async (id: number | any[]) => {
    await feedback.confirm('确定要更新下架？')
    await apiAdBatchOff({ id })
    getLists()
}

// 删除
const handleDelete = async (id: number | any[]) => {
    await feedback.confirm('确定要删除？')
    await apiAdDelete({ id })
    getLists()
}

getLists()

</script>

