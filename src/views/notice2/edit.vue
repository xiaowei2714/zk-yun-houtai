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
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="formData.title" clearable placeholder="请输入公告标题" />
                </el-form-item>
                <el-form-item label="公告封面" prop="pic">
                    <div>
                        <material-picker v-model="formData.pic" :limit="1" />
                        <div class="form-tips">建议尺寸：100*100px，支持jpg，jpeg，png格式</div>
                    </div>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <editor class="flex-1" v-model="formData.content" :height="500" />
                </el-form-item>

<!--                <el-form-item label="公告类型" prop="type">-->
<!--                    <el-input v-model="formData.type" clearable placeholder="请输入公告类型" />-->
<!--                </el-form-item>-->
            </el-form>
        </popup>
    </div>
</template>

<script lang="ts" setup name="noticeEdit">
import type { FormInstance } from 'element-plus'
import Popup from '@/components/popup/index.vue'
import { apiNoticeAdd, apiNoticeEdit, apiNoticeDetail } from '@/api/notice'
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
    return mode.value == 'edit' ? '编辑公告' : '新增公告'
})

// 表单数据
const formData = reactive({
    id: '',
    title: '',
    content: '',
    type: '',
    pic: ''
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
    const data = await apiNoticeDetail({
        id: row.id
    })
    setFormData(data)
}


// 提交按钮
const handleSubmit = async () => {
    await formRef.value?.validate()
    const data = { ...formData,  }
    mode.value == 'edit' 
        ? await apiNoticeEdit(data) 
        : await apiNoticeAdd(data)
    popupRef.value?.close()
    emit('success')
}

//打开弹窗
const open = (type = 'add', value: any) => {
    mode.value = type
    formData.type = value
    console.log(value)
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
