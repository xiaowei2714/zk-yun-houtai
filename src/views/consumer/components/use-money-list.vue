<template>
    <popup
        ref="popupRef"
        title="账单流水"
        width="1500px"
        :async="true"
        :confirmButtonText="false"
        @close="popupClose"
    >
        <div class="pr-8">

            <!--搜索条件-->
            <el-card class="!border-none mb-4" shadow="never">
                <el-form
                    class="mb-[-16px]"
                    :model="queryParams"
                    inline
                >
                    <el-form-item label="类型" prop="status">
                        <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.type"
                                   placeholder="请选择类型">
                            <el-option label="全部" value="" />
                            <el-option label="话费" :value="1" />
                            <el-option label="电费" :value="2" />
                            <el-option label="话费快充" :value="9" />
                            <el-option label="礼品卡" :value="10" />
                            <el-option label="返佣" :value="3" />
                            <el-option label="查询" :value="4" />
                            <el-option label="充值" :value="5" />
                            <el-option label="提现" :value="8" />
                            <el-option label="转入" :value="12" />
                            <el-option label="转出" :value="11" />
                            <el-option label="广告发布" :value="6" />
                            <el-option label="广告交易" :value="13" />
                            <el-option label="开通分站" :value="7" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变动类型" prop="status">
                        <el-select style="width: 150px;margin-left: 10px" v-model="queryParams.change_type"
                                   placeholder="请选择状态">
                            <el-option label="全部" value="" />
                            <el-option label="增加" :value="1" />
                            <el-option label="减少" :value="2" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="resetPage">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-card class="!border-none" v-loading="pager.loading" shadow="never">

                <!--列表-->
                <div class="mt-4">
                    <el-table :data="pager.lists" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" />
                        <el-table-column label="分类" prop="type" show-overflow-tooltip />
                        <el-table-column label="描述" prop="desc" show-overflow-tooltip />
                        <el-table-column label="变动金额" prop="change_money" show-overflow-tooltip>
                            <template #default="{ row }">
                                {{ row.change_type == 1 ? '+' : '-' }} {{ row.change_money }} Y币
                            </template>
                        </el-table-column>
                        <el-table-column label="变动后金额" prop="changed_money" show-overflow-tooltip />
                        <el-table-column label="时间" prop="create_time" show-overflow-tooltip />
                    </el-table>
                </div>
                <div class="flex mt-4 justify-end">
                    <pagination v-model="pager" @change="getLists" />
                </div>
            </el-card>
        </div>
    </popup>
</template>

<script lang="ts" setup>
import { usePaging } from '@/hooks/usePaging'
import { useDictData } from '@/hooks/useDictOptions'
import { getUserMoneyLog } from '@/api/consumer'
import Popup from '@/components/popup/index.vue'

// 是否显示编辑框
const showEdit = ref(false)

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    value: {
        type: [Number, String],
        required: true
    }
})
const popupRef = shallowRef<InstanceType<typeof Popup>>()

// 查询条件
const queryParams = reactive({
    user_id: popupRef.value,
    type: '',
    change_type: ''
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
    fetchFun: getUserMoneyLog,
    params: queryParams
})

const emit = defineEmits<{
    (event: 'update:show', value: boolean): void
}>()

const popupClose = () => {
    emit('update:show', false)
    queryParams.type = ''
    queryParams.change_type = ''
    // formRef.value?.resetFields()
}

watch(
    () => props.show,
    (val) => {
        if (val) {
            popupRef.value?.open()
        } else {
            popupRef.value?.close()
        }
    }
)
const getUserMoneyList = (id) => {
    queryParams.user_id = id
    getLists()
}

defineExpose({getUserMoneyList})


</script>
