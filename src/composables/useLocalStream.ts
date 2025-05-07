import { computed, onMounted, ref } from 'vue'

const useLocalStream = () => {
  const stream = ref<MediaStream | undefined>(undefined)
  const mediaRecorder = ref<MediaRecorder | undefined>(undefined)
  const audioChunks = ref<Blob[]>([])

  const streamError = ref<Error | undefined>(undefined)
  const isMicrophoneAllowed = ref<boolean>(false)

  const isRecording = ref<boolean>(false)

  const volume = ref<number>(0)

  const isAudioAvailable = computed(() => audioChunks.value.length > 0)

  const audioContext = ref<AudioContext | undefined>(undefined)
  const analyser = ref<AnalyserNode | undefined>(undefined)
  const dataArray = ref<Uint8Array | undefined>(undefined)

  onMounted(async () => {
    const result = await navigator.permissions.query({ name: 'microphone' })
    if (result.state == 'granted' || result.state === 'prompt') {
      isMicrophoneAllowed.value = true
    } else if (result.state == 'denied') {
      isMicrophoneAllowed.value = false
    }
  })

  const start = async () => {
    try {
      if (!stream.value) {
        stream.value = await navigator.mediaDevices.getUserMedia({ audio: true })
      }

      mediaRecorder.value = new MediaRecorder(stream.value)

      mediaRecorder.value.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.value.push(event.data)
        }
      }

      mediaRecorder.value.start()

      audioContext.value = new AudioContext()
      const source = audioContext.value.createMediaStreamSource(stream.value)
      analyser.value = audioContext.value.createAnalyser()
      analyser.value.fftSize = 256
      dataArray.value = new Uint8Array(analyser.value.frequencyBinCount)
      source.connect(analyser.value)

      const updateVolume = () => {
        if (analyser.value && dataArray) {
          analyser.value.getByteTimeDomainData(dataArray.value!)
          const rms = Math.sqrt(
            dataArray.value!.reduce((sum, val) => sum + Math.pow(val - 128, 2), 0) /
              dataArray.value!.length,
          )
          volume.value = Math.min(100, Math.round((rms / 128) * 100))
        }
        requestAnimationFrame(updateVolume)
      }
      updateVolume()
    } catch (e) {
      streamError.value = e as Error
    }
  }

  const stop = () => {
    if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {
      mediaRecorder.value.stop()
    }

    if (stream.value) {
      stream.value.getTracks().forEach((track) => track.stop())
      stream.value = undefined
    }

    audioContext.value?.close()
  }

  const reset = () => {
    audioChunks.value = []
  }

  const toggle = () => {
    if (isRecording.value) {
      stop()
    } else {
      start()
    }
    isRecording.value = !isRecording.value
  }

  const getAudio = () => {
    const audioBlob = new Blob(audioChunks.value, { type: 'audio/webm' })
    return new File([audioBlob], 'audio.webm', { type: 'audio/webm' })
  }

  return {
    start,
    stop,
    reset,
    getAudio,
    streamError,
    isRecording,
    isAudioAvailable,
    isMicrophoneAllowed,
    volume,
    toggle,
  }
}

export default useLocalStream
