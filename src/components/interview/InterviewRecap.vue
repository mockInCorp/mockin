<template></template>

<script lang="ts" setup>
import globalUtils from '@/utils/global.utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

globalUtils.setPageTitle(t('interview.recap.title'))
</script>
