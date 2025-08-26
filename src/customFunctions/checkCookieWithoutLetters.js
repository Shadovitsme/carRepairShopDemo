import { getCookie } from '@/customFunctions/getCookie'

export default function checkCookieWithoutLetters() {
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const cookieName = cookie.split('=')[0].trim()
    if (/^[^a-zA-Z]*$/.test(cookieName) && Number(getCookie(cookieName)) > 0) {
      return true
    }
  }
  return false
}
