const useGoogleProvider = () => {
  const authenticate = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/auth/google', {
        method: 'POST',
      })
      const data = await response.json()
      window.location.href = data.url
    } catch (e) {
      console.error(e)
      // TODO: manage with alert modal
    }
  }

  return {
    authenticate,
  }
}

export default useGoogleProvider
