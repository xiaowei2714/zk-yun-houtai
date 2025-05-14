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
                <el-form-item label="用户" prop="user_id">
                    <el-input v-model="formData.user_id" clearable placeholder="请输入用户" />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-input v-model="formData.type" clearable placeholder="请输入类型" />
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="formData.title" clearable placeholder="请输入标题" />
                </el-form-item>
                <el-form-item label="产品" prop="product_id">
                    <el-input v-model="formData.product_id" clearable placeholder="请输入产品" />
                </el-form-item>
                <el-form-item label="账号" prop="account">
                    <el-input v-model="formData.account" clearable placeholder="请输入账号" />
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input v-model="formData.content" clearable placeholder="请输入内容" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-input v-model="formData.status" clearable placeholder="请输入状态" />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>

<script lang="ts" setup name="orderJobEdit">
import type { FormInstance } from 'element-plus'
import Popup from '@/components/popup/index.vue'
import { apiOrderJobAdd, apiOrderJobEdit, apiOrderJobDetail } from '@/api/order_job'
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


// 弹窗标题
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑工单' : '新增工单'
})

// 表单数据
const formData = reactive({
    id: '',
    user_id: '',
    type: '',
    title: '',
    product_id: '',
    account: '',
    content: '',
    status: '',
})


// 表单验证
const formRules = reactive<any>({

})


// 获取详情
const setFormData = async (data: Record<any, any>) => {
    for (const key in formData) {
        if (data[key] != null && data[key] != undefined) {
            //@ts-ignore
            formData[key] = data[key]
        }
    }
    
    
}

const getDetail = async (row: Record<string, any>) => {
    const data = await apiOrderJobDetail({
        id: row.id
    })
    setFormData(data)
}


// 提交按钮
const handleSubmit = async () => {
    await formRef.value?.validate()
    const data = { ...formData,  }
    mode.value == 'edit' 
        ? await apiOrderJobEdit(data) 
        : await apiOrderJobAdd(data)
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



defineExpose({
    open,
    setFormData,
    getDetail
})
</script>
