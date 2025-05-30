<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            :title="popupTitle"
            :async="true"
            width="550px"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <el-form ref="formRef" :model="formData" label-width="90px" :rules="formRules">
                <el-form-item label="会员" prop="user_id">
                    <el-select
                        v-model="formData.user_id"
                        filterable
                        remote
                        :remote-method="remoteMethod"
                        :loading="loading"
                        placeholder="请选择"
                        style="width: 400px"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.nickname"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上级" prop="parent_user_id">
                    <el-select
                        v-model="formData.parent_user_id"
                        filterable
                        remote
                        :remote-method="remoteMethod"
                        :loading="loading"
                        placeholder="请选择上级"
                        style="width: 400px"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.nickname"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="formData.status" placeholder="请选择" style="width: 400px">
                        <el-option label="启用" :value="1" />
                        <el-option label="停用" :value="2" />
                    </el-select>
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>

<script lang="ts" setup name="substationEdit">
import type { FormInstance } from 'element-plus'
import Popup from '@/components/popup/index.vue'
import { apiSubstationAdd, apiSubstationEdit, apiSubstationDetail } from '@/api/substation'
import { searchUser } from '@/api/user'
import { timeFormat } from '@/utils/util'
import type { PropType } from 'vue'

defineProps({
    dictData: {
        type: Object as PropType<Record<string, any[]>>,
        default: () => ({})

    }
})

const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref('add')
const loading = ref(false)
const options = ref([])

// 弹窗标题
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑分站' : '新增分站'
})

// 表单数据
const formData = reactive({
    id: '',
    user_id: '',
    parent_user_id: '',
    status: ''
})


// 表单验证
const formRules = reactive<any>({
    user_id: [{
        required: true,
        message: '请输入会员',
        trigger: ['blur']
    }]
})


// 获取详情
const setFormData = async (data: Record<any, any>) => {
    for (const key in formData) {
        if (data[key] != null && data[key] != undefined) {
            //@ts-ignore
            formData[key] = data[key]
        }
    }

    options.value = [
        {
            id: data.user_id,
            nickname: data.user_show
        },
        {
            id: data.parent_user_id,
            nickname: data.p_user_show
        },
    ]

}

const getDetail = async (row: Record<string, any>) => {
    const data = await apiSubstationDetail({
        id: row.id
    })
    setFormData(data)
}


// 提交按钮
const handleSubmit = async () => {
    await formRef.value?.validate()
    const data = { ...formData }
    mode.value == 'edit'
        ? await apiSubstationEdit(data)
        : await apiSubstationAdd(data)
    popupRef.value?.close()
    emit('success')
}

//打开弹窗
const open = (type = 'add') => {
    mode.value = type
    popupRef.value?.open()
}

// 关闭回调
const handleClose = () => {
    emit('close')
}

const remoteMethod = async (query) => {
    if (query !== '') {
        loading.value = true

        const data = await searchUser({
            search: query
        })

        loading.value = false
        options.value = data

    } else {
        options.value = []
    }
}

defineExpose({
    open,
    setFormData,
    getDetail
})
</script>
