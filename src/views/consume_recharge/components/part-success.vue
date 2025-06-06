<template>
    <popup
        ref="popupRef"
        title="设置折扣"
        width="500px"
        @confirm="handleConfirm"
        :async="true"
        @close="popupClose"
    >
        <div class="pr-8">
            <el-form ref="formRef" :model="formData" label-width="120px" :rules="formRules">
                <el-form-item label="充值金额">{{ price }}</el-form-item>
                <el-form-item label="到账金额" prop="num">
                    <el-input
                        :model-value="formData.balances_price"
                        placeholder="请输入到账金额"
                        @input="numberValidate"
                    />
                </el-form-item>
                <el-form-item label="支付金额">Y币 {{ pay_price }}</el-form-item>
                <el-form-item label="返还金额">Y币 {{ adjustmentMoney }}</el-form-item>
            </el-form>
        </div>
    </popup>
</template>
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { getMealList } from '@/api/consumer'
import Popup from '@/components/popup/index.vue'
import feedback from '@/utils/feedback'

const formRef = shallowRef<FormInstance>()
const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    price: {
        type: [Number, String],
        required: true
    },
    pay_price: {
        type: [Number, String],
        required: true
    },
    id: {
        type: [Number, String],
        required: true
    }
})
const emit = defineEmits<{
    (event: 'update:show', value: boolean): void
    (event: 'confirm', value: any): void
}>()
const formData = reactive({
    balances_price: '',
    id: props.id
})
const pageData = reactive({
    meal_list: []
})
const popupRef = shallowRef<InstanceType<typeof Popup>>()

const adjustmentMoney = computed(() => {
    const num = Number(props.pay_price) - Number((formData.balances_price) / Number(props.price)) *  Number(props.pay_price);
    return Math.trunc(num * 1000) / 1000
})

const formRules: FormRules = {}

const numberValidate = (value: any, index: any) => {
    const value1 = Number(value)
    const price = Number(props.price)
    if (value1 < 0) {
        return feedback.msgError('不能输入负数')
    }
    if (value1 > price) {
        return feedback.msgError('不能超过充值金额')
    }

    formData.balances_price = value
}
const handleConfirm = async () => {
    emit('confirm', {
        id: props.id,
        value: formData.balances_price
    })
}
// pageData.meal_list = props.list

const popupClose = () => {
    emit('update:show', false)
    formData.balances_price = ''
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
watch(adjustmentMoney, (val) => {
    if (val < 0) {
        feedback.msgError('调整后余额需大于0')
        formData.num = ''
    }
})
// getMealList2()
</script>
