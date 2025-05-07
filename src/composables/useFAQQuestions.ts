import { useAPIRequestStore } from '@/stores/apiRequest'
import gql from 'graphql-tag'
import { onMounted, ref } from 'vue'

export interface IQuestion {
  title: string
  answer: string
}

const useQuestions = () => {
  const questions = ref<IQuestion[]>([])
  const isLoading = ref(false)

  onMounted(async () => {
    isLoading.value = true
    const response = await useAPIRequestStore().request<{
      questions: IQuestion[]
    }>({
      type: 'QUERY',
      document: gql`
        query Questions {
          questions {
            title
            answer
          }
        }
      `,
    })
    questions.value = response?.questions ?? []
    isLoading.value = false
  })
  return {
    questions,
    isLoading,
  }
}
export default useQuestions
