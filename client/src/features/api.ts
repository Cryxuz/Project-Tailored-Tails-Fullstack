export const url = 'https://tailored-tails.onrender.com/'

export const setHeaders = () => {
  const headers = {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  }
  return headers
}
