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
                <el-form-item label="购买者" prop="user_id">
                    <el-input v-model="formData.user_id" clearable placeholder="请输入购买者" />
                </el-form-item>
                <el-form-item label="卖家" prop="to_user_id">
                    <el-input v-model="formData.to_user_id" clearable placeholder="请输入卖家" />
                </el-form-item>
                <el-form-item label="广告" prop="ad_id">
                    <el-input v-model="formData.ad_id" clearable placeholder="请输入广告" />
                </el-form-item>
                <el-form-item label="订单号" prop="order_no">
                    <el-input v-model="formData.order_no" clearable placeholder="请输入订单号" />
                </el-form-item>
                <el-form-item label="订单类型" prop="order_type">
                    <el-input v-model="formData.order_type" clearable placeholder="请输入订单类型" />
                </el-form-item>
                <el-form-item label="数量" prop="num">
                    <el-input v-model="formData.num" clearable placeholder="请输入数量" />
                </el-form-item>
                <el-form-item label="总额" prop="price">
                    <el-input v-model="formData.price" clearable placeholder="请输入总额" />
                </el-form-item>
                <el-form-item label="单价" prop="dan_price">
                    <el-input v-model="formData.dan_price" clearable placeholder="请输入单价" />
                </el-form-item>
                <el-form-item label="支付方式" prop="pay_type">
                    <el-input v-model="formData.pay_type" clearable placeholder="请输入支付方式" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-input v-model="formData.status" clearable placeholder="请输入状态" />
                </el-form-item>
                <el-form-item label="取消方式" prop="cancel_type">
                    <el-input v-model="formData.cancel_type" clearable placeholder="请输入取消方式" />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>

<script lang="ts" setup name="adOrderEdit">
import type { FormInstance } from 'element-plus'
import Popup from '@/components/popup/index.vue'
import { apiAdOrderAdd, apiAdOrderEdit, apiAdOrderDetail } from '@/api/ad_order'
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
    return mode.value == 'edit' ? '编辑数字交易' : '新增数字交易'
})

// 表单数据
const formData = reactive({
    id: '',
    user_id: '',
    to_user_id: '',
    ad_id: '',
    order_no: '',
    order_type: '',
    num: '',
    price: '',
    dan_price: '',
    pay_type: '',
    status: '',
    cancel_type: '',
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
    const data = await apiAdOrderDetail({
        id: row.id
    })
    setFormData(data)
}


// 提交按钮
const handleSubmit = async () => {
    await formRef.value?.validate()
    const data = { ...formData,  }
    mode.value == 'edit' 
        ? await apiAdOrderEdit(data) 
        : await apiAdOrderAdd(data)
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
