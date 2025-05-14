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
            <el-form ref="formRef" :model="props.list" label-width="120px" >
                <template v-for="(item, index) in props.list" :key="index">
                    <el-form-item :label="`${item?.name || ''}${item?.type === 1 ? '(话费)' : '(电费)'}`">
                        <el-input
                            :model-value="item?.discount"
                            placeholder="请输入折扣"
                            type="number"
                            @input="(val) => numberValidate(val, index)"
                        />
                    </el-form-item>
                </template>

<!--                <el-form-item label="调整余额" prop="num">-->
<!--                    <el-input-->
<!--                        :model-value="formData.num"-->
<!--                        placeholder="请输入调整的金额"-->
<!--                        type="number"-->
<!--                        @input="numberValidate"-->
<!--                    />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="调整后余额"> ¥ {{ adjustmentMoney }} </el-form-item>-->
<!--                <el-form-item label="备注" prop="remark">-->
<!--                    <el-input v-model="formData.remark" type="textarea" :rows="4" />-->
<!--                </el-form-item>-->
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
    list: {
        type: Array,
        required: true
    },
    value: {
        type: [Number, String],
        required: true
    }
})
const emit = defineEmits<{
    (event: 'update:show', value: boolean): void
    (event: 'confirm', value: any): void
}>()
const formData = reactive({
    action: 1, //变动类型 1-增加 2-减少
    num: '',
    remark: ''
})
const pageData = reactive({
    meal_list: []
})
const popupRef = shallowRef<InstanceType<typeof Popup>>()

const adjustmentMoney = computed(() => {
    return Number(props.value) + Number(formData.num) * (formData.action == 1 ? 1 : -1)
})

const formRules: FormRules = {

}
const getMealList2 = async () => {
    const returnData = await getMealList({ user_id: props.value })
    pageData.meal_list = returnData.list
}
const numberValidate = (value: any, index: any) => {
    emit('update-discount', { index, value: parseFloat(value) || 0 })
    // if (value.includes('-')) {
    //     return feedback.msgError('请输入正整数')
    // }
    // console.log(value)
    // formData.num = value
}
const handleConfirm = async () => {
    // await formRef.value?.validate()
    emit('confirm', props.list)
}
// pageData.meal_list = props.list

const popupClose = () => {
    emit('update:show', false)
    formRef.value?.resetFields()
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
