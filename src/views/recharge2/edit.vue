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
                <el-form-item label="用户ID" prop="user_id">
                    <el-input v-model="formData.user_id" clearable placeholder="请输入用户ID" />
                </el-form-item>
                <el-form-item label="金额" prop="money">
                    <el-input v-model="formData.money" clearable placeholder="请输入金额" />
                </el-form-item>
                <el-form-item label="订单描述" prop="desc">
                    <el-input v-model="formData.desc" clearable placeholder="请输入订单描述" />
                </el-form-item>
                <el-form-item label="订单号" prop="order_no">
                    <el-input v-model="formData.order_no" clearable placeholder="请输入订单号" />
                </el-form-item>
                <el-form-item label="付款时间" prop="pay_time">
                    <el-input v-model="formData.pay_time" clearable placeholder="请输入付款时间" />
                </el-form-item>
                <el-form-item label="回调稀哈" prop="hash">
                    <el-input v-model="formData.hash" clearable placeholder="请输入回调稀哈" />
                </el-form-item>
                <el-form-item label="订单状态" prop="status">
                    <el-input v-model="formData.status" clearable placeholder="请输入订单状态" />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>

<script lang="ts" setup name="rechargeEdit">
import type { FormInstance } from 'element-plus'
import Popup from '@/components/popup/index.vue'
import { apiRechargeAdd, apiRechargeEdit, apiRechargeDetail } from '@/api/recharge'
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
    return mode.value == 'edit' ? '编辑充值' : '新增充值'
})

// 表单数据
const formData = reactive({
    id: '',
    user_id: '',
    money: '',
    desc: '',
    order_no: '',
    pay_time: '',
    hash: '',
    status: '',
})


// 表单验证
const formRules = reactive<any>({
    user_id: [{
        required: true,
        message: '请输入用户ID',
        trigger: ['blur']
    }],
    money: [{
        required: true,
        message: '请输入金额',
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
    
    
}

const getDetail = async (row: Record<string, any>) => {
    const data = await apiRechargeDetail({
        id: row.id
    })
    setFormData(data)
}


// 提交按钮
const handleSubmit = async () => {
    await formRef.value?.validate()
    const data = { ...formData,  }
    mode.value == 'edit' 
        ? await apiRechargeEdit(data) 
        : await apiRechargeAdd(data)
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
