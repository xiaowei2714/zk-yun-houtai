<template>
    <div>
        <el-card class="!border-none mb-4" shadow="never">
<!--            <el-form-->
<!--                class="mb-[-16px]"-->
<!--                :model="queryParams"-->
<!--                inline-->
<!--            >-->
<!--                <el-form-item label="公告类型" prop="type">-->
<!--                    <el-input class="w-[280px]" v-model="queryParams.type" clearable placeholder="请输入公告类型" />-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <el-button type="primary" @click="resetPage">查询</el-button>-->
<!--                    <el-button @click="resetParams">重置</el-button>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
            <el-tabs v-model="queryParams.type" @tab-click="handleClick">
                <el-tab-pane label="首页公告" :name="1"></el-tab-pane>
                <el-tab-pane label="话费公告" :name="2"></el-tab-pane>
                <el-tab-pane label="电费公告" :name="3"></el-tab-pane>
            </el-tabs>
        </el-card>
        <el-card class="!border-none" v-loading="pager.loading" shadow="never">
            <el-button v-perms="['notice/add']" type="primary" @click="handleAdd">
                <template #icon>
                    <icon name="el-icon-Plus" />
                </template>
                新增
            </el-button>
            <el-button
                v-perms="['notice/delete']"
                :disabled="!selectData.length"
                @click="handleDelete(selectData)"
            >
                删除
            </el-button>
            <div class="mt-4">
                <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="公告标题" prop="title" show-overflow-tooltip />
                    <el-table-column label="创建时间" prop="create_time" show-overflow-tooltip />
                    <el-table-column label="操作" width="120" fixed="right">
                        <template #default="{ row }">
                             <el-button
                                v-perms="['notice/edit']"
                                type="primary"
                                link
                                @click="handleEdit(row)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                v-perms="['notice/delete']"
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

<script lang="ts" setup name="noticeLists">
import { usePaging } from '@/hooks/usePaging'
import { useDictData } from '@/hooks/useDictOptions'
import { apiNoticeLists, apiNoticeDelete } from '@/api/notice'
import { timeFormat } from '@/utils/util'
import feedback from '@/utils/feedback'
import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 是否显示编辑框
const showEdit = ref(false)


// 查询条件
const queryParams = reactive({
    type: 1
})

const handleClick = (e: any) => {
    // console.log(e)
    queryParams.type = e.props.name
    // console.log(queryParams.type)
    getLists()
    // console.log(queryParams.type)
}

// const pageData = reactive){
//     type:
// }

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
    fetchFun: apiNoticeLists,
    params: queryParams
})

// 添加
const handleAdd = async () => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('add', queryParams.type)
}

// 编辑
const handleEdit = async (data: any) => {
    showEdit.value = true
    await nextTick()
    data.type = queryParams.type
    editRef.value?.open('edit', queryParams.type)
    editRef.value?.setFormData(data)
}

// 删除
const handleDelete = async (id: number | any[]) => {
    await feedback.confirm('确定要删除？')
    await apiNoticeDelete({ id })
    getLists()
}

getLists()
</script>

