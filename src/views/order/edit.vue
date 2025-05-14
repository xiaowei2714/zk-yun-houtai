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
                <el-form-item label="单号" prop="sn">
                    <el-input v-model="formData.sn" clearable placeholder="请输入单号" />
                </el-form-item>
                <el-form-item label="客户" prop="user_id">
                    <el-input v-model="formData.user_id" clearable placeholder="请输入客户" />
                </el-form-item>
                <el-form-item label="充值账户" prop="account">
                    <el-input v-model="formData.account" clearable placeholder="请输入充值账户" />
                </el-form-item>
                <el-form-item label="运营商" prop="account_type">
                    <el-input v-model="formData.account_type" clearable placeholder="请输入运营商" />
                </el-form-item>
                <el-form-item label="金额" prop="price">
                    <el-input v-model="formData.price" clearable placeholder="请输入金额" />
                </el-form-item>
                <el-form-item label="充值前余额" prop="recharge_up_price">
                    <el-input v-model="formData.recharge_up_price" clearable placeholder="请输入充值前余额" />
                </el-form-item>
                <el-form-item label="充值后余额" prop="recharge_down_price">
                    <el-input v-model="formData.recharge_down_price" clearable placeholder="请输入充值后余额" />
                </el-form-item>
                <el-form-item label="到账金额" prop="balances_price">
                    <el-input v-model="formData.balances_price" clearable placeholder="请输入到账金额" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-input v-model="formData.status" clearable placeholder="请输入状态" />
                </el-form-item>
                <el-form-item label="开始处理时间" prop="start_time">
                    <el-date-picker 
                        class="flex-1 !flex"
                        v-model="formData.start_time"
                        clearable
                        type="datetime"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        placeholder="选择开始处理时间">
                    </el-date-picker>
                </el-form-item>
                
                <el-form-item label="结束处理时间" prop="end_time">
                    <el-date-picker 
                        class="flex-1 !flex"
                        v-model="formData.end_time"
                        clearable
                        type="datetime"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        placeholder="选择结束处理时间">
                    </el-date-picker>
                </el-form-item>
                
                <el-form-item label="支付时间" prop="pay_time">
                    <el-input v-model="formData.pay_time" clearable placeholder="请输入支付时间" />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>

<script lang="ts" setup name="orderEdit">
import type { FormInstance } from 'element-plus'
import Popup from '@/components/popup/index.vue'
import { apiOrderAdd, apiOrderEdit, apiOrderDetail } from '@/api/order'
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
    return mode.value == 'edit' ? '编辑订单' : '新增订单'
})

// 表单数据
const formData = reactive({
    id: '',
    sn: '',
    user_id: '',
    account: '',
    account_type: '',
    price: '',
    recharge_up_price: '',
    recharge_down_price: '',
    balances_price: '',
    status: '',
    start_time: '',
    end_time: '',
    pay_time: '',
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
    
    //@ts-ignore
    formData.start_time = timeFormat(formData.start_time,'yyyy-mm-dd hh:MM:ss') 
    //@ts-ignore
    formData.end_time = timeFormat(formData.end_time,'yyyy-mm-dd hh:MM:ss') 
}

const getDetail = async (row: Record<string, any>) => {
    const data = await apiOrderDetail({
        id: row.id
    })
    setFormData(data)
}


// 提交按钮
const handleSubmit = async () => {
    await formRef.value?.validate()
    const data = { ...formData,  }
    mode.value == 'edit' 
        ? await apiOrderEdit(data) 
        : await apiOrderAdd(data)
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
