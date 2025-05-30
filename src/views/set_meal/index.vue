<template>
    <div>
        <el-card class="!border-none mb-4" shadow="never">
            <el-form
                class="mb-[-16px]"
                :model="queryParams"
                inline
            >
                <el-form-item label="类型" prop="type">
                    <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.type"
                               placeholder="请选择类型">
                        <el-option label="全部" :value="0" />
                        <el-option label="话费" :value="1" />
                        <el-option label="电费" :value="2" />
                        <el-option label="话费快充" :value="3" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none" v-loading="pager.loading" shadow="never">
            <el-button v-perms="['set_meal/add']" type="primary" @click="handleAdd">
                <template #icon>
                    <icon name="el-icon-Plus" />
                </template>
                新增
            </el-button>
            <el-button
                v-perms="['set_meal/delete']"
                :disabled="!selectData.length"
                @click="handleDelete(selectData)"
            >
                删除
            </el-button>
            <div class="mt-4">
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="套餐名称" prop="name" show-overflow-tooltip />
                    <el-table-column label="类型" prop="type" show-overflow-tooltip>
                        <template #default="{ row }">
                            <span v-if="row.type == 1" style="color: #8A2BE2;">
                                话费
                            </span>
                            <span v-else-if="row.type == 2" style="color: #FFD700">
                                电费
                            </span>
                            <span v-else-if="row.type == 3" style="color: #4ECDC4;">
                                话费快充
                            </span>
                            <span v-else></span>
                        </template>
                    </el-table-column>
                    <!--                    <el-table-column label="显示端" prop="show_type" show-overflow-tooltip />-->
                    <el-table-column label="运营商" prop="operator_txt" show-overflow-tooltip />
                    <el-table-column label="价格" prop="price" show-overflow-tooltip />
                    <el-table-column label="折扣" prop="discount" show-overflow-tooltip />
                    <!--                    <el-table-column label="禁止下单省份" prop="forbid_buy_city" show-overflow-tooltip />-->
                    <el-table-column label="排序" prop="sort" show-overflow-tooltip />
                    <!--                    <el-table-column label="每日产品限制" prop="day_astrict_num" show-overflow-tooltip />-->
                    <!--                    <el-table-column label="同时存在订单" prop="meanwhile_order_num" show-overflow-tooltip />-->
                    <!--                    <el-table-column label="用户必填信息" prop="user_required_info" show-overflow-tooltip />-->
                    <!--                    <el-table-column label="商家必填信息" prop="merchant_required_info" show-overflow-tooltip />-->
                    <!--                    <el-table-column label="允许下单号段" prop="allow_buy_nums" show-overflow-tooltip />-->
                    <!--                    <el-table-column label="禁止下单号段" prop="forbid_buy_nums" show-overflow-tooltip />-->
                    <el-table-column label="状态" prop="status" show-overflow-tooltip>
                        <template #default="{ row }">
                            <span>{{ row.status == 1 ? '上架' : '下架' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
                            <el-button
                                v-perms="['set_meal/edit']"
                                type="primary"
                                link
                                @click="handleEdit(row)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                v-perms="['set_meal/delete']"
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

<script lang="ts" setup name="setMealLists">
import { usePaging } from '@/hooks/usePaging'
import { useDictData } from '@/hooks/useDictOptions'
import { apiSetMealLists, apiSetMealDelete } from '@/api/set_meal'
import { timeFormat } from '@/utils/util'
import feedback from '@/utils/feedback'
import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)


// 查询条件
const queryParams = reactive({})

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
    fetchFun: apiSetMealLists,
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
    await apiSetMealDelete({ id })
    getLists()
}

getLists()
</script>

