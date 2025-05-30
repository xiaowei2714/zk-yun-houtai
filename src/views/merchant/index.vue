<template>
    <div>
        <el-card class="!border-none mb-4" shadow="never">
            <el-form
                class="mb-[-16px]"
                :model="queryParams"
                inline
            >
                <el-form-item label="会员" prop="user_id">
                    <el-input class="w-[280px]" v-model="queryParams.user_id" clearable placeholder="请输入昵称或手机号" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select style="width: 100px" v-model="queryParams.status" placeholder="请选择">
                        <el-option label="启用" :value="1" />
                        <el-option label="停用" :value="2" />
                    </el-select>
<!--                    <el-input class="w-[280px]" v-model="queryParams.status" clearable placeholder="请输入状态" />-->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none" v-loading="pager.loading" shadow="never">
            <el-button v-perms="['merchant/add']" type="primary" @click="handleAdd">
                <template #icon>
                    <icon name="el-icon-Plus" />
                </template>
                新增
            </el-button>
            <el-button
                v-perms="['merchant/delete']"
                :disabled="!selectData.length"
                @click="handleDelete(selectData)"
            >
                删除
            </el-button>
            <div class="mt-4">
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="ID" prop="id" show-overflow-tooltip />
                    <el-table-column label="会员" prop="user_id" show-overflow-tooltip />
                    <el-table-column label="上级" prop="parent_user_id" show-overflow-tooltip />
                    <el-table-column label="下级" prop="parent_user_id" show-overflow-tooltip />
                    <el-table-column label="余额" prop="parent_user_id" show-overflow-tooltip />
                    <el-table-column label="今日完成" prop="parent_user_id" show-overflow-tooltip />
                    <el-table-column label="总完成" prop="parent_user_id" show-overflow-tooltip />
                    <el-table-column label="TG" prop="parent_user_id" show-overflow-tooltip />
                    <el-table-column label="注册时间" prop="create_time" show-overflow-tooltip />
                    <el-table-column label="状态" prop="status" show-overflow-tooltip />
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
                             <el-button
                                v-perms="['merchant/edit']"
                                type="primary"
                                link
                                @click="handleEdit(row)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                v-perms="['merchant/delete']"
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

<script lang="ts" setup name="merchantLists">
import { usePaging } from '@/hooks/usePaging'
import { useDictData } from '@/hooks/useDictOptions'
import { apiMerchantLists, apiMerchantDelete } from '@/api/merchant'
import { timeFormat } from '@/utils/util'
import feedback from '@/utils/feedback'
import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)


// 查询条件
const queryParams = reactive({
    user_id: '',
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
    fetchFun: apiMerchantLists,
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
    await apiMerchantDelete({ id })
    getLists()
}

getLists()
</script>

