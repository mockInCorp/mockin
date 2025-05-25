import { computed, onMounted, ref } from 'vue'

const MAX_DURATION_MS = 10 * 60 * 1000

const useLocalStream = () => {
  const stream = ref<MediaStream | undefined>(undefined)
  const mediaRecorder = ref<MediaRecorder | undefined>(undefined)
  const audioChunks = ref<Blob[]>([])

  const streamError = ref<Error | undefined>(undefined)
  const isMicrophoneAllowed = ref<boolean>(false)

  const isRecording = ref<boolean>(false)

  const volume = ref<number>(0)

  const startTime = ref<number | null>(null)
  const now = ref(Date.now())
  const elapsed = computed(() => {
    if (startTime.value === null) return 0
    return now.value - startTime.value
  })
  const timerId = ref<number | null>(null)

  const _isAudioAvailable = ref(false)
  const isAudioAvailable = computed(() => _isAudioAvailable.value || audioChunks.value.length > 0)

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
      startTimer()

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

    if (audioContext.value?.state !== 'closed') {
      audioContext.value?.close()
    }
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

  const startTimer = () => {
    startTime.value = Date.now()
    now.value = startTime.value
    timerId.value = window.setInterval(() => {
      now.value = Date.now()
      if (elapsed.value >= MAX_DURATION_MS) {
        stopTimer()
        stop()
        _isAudioAvailable.value = true
      }
    }, 200)
  }

  const stopTimer = () => {
    if (timerId.value !== null) {
      clearInterval(timerId.value)
      timerId.value = null
    }
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
