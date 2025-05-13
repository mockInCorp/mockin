<template>
  <BaseModal
    v-slot="{ closeModal }"
    v-show="!!confirm"
    @close="confirm = undefined"
    :title="confirm?.title ?? ''"
  >
    <p v-if="confirm?.description">{{ confirm?.description }}</p>
    <footer>
      <BaseButton @click="closeModal" :text="$t('modals.confirm.cancelButton')" type="thirdery" />
      <BaseButton
        @click="
          () => {
            confirm?.onConfirm()
            closeModal()
          }
        "
        :text="$t('modals.confirm.confirmButton')"
        icon="check"
        icon-position="right"
      />
    </footer>
  </BaseModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseButton from '../BaseButton.vue'
import BaseModal from '../BaseModal.vue'

export interface IConfirmParams {
  title: string
  description?: string
  onConfirm: () => void
}

const confirm = ref<undefined | IConfirmParams>(undefined)

window.confirmModal = (params: IConfirmParams) => {
  confirm.value = params
}
</script>

<style scoped>
footer {
  display: flex;
  gap: 1em;
  justify-content: end;
  margin-top: 1em;
}
p {
  margin-top: 1em;
  border-radius: 5px;
  color: var(--red);
  background-color: var(--red-200);
  padding: 1em;
  font-family: 'manrope-bold', sans-serif;
  border-left: 4px solid var(--red);
}
</style>
