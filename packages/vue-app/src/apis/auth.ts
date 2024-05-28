export function getJwtToken() {
  return localStorage.getItem('jwtToken')
}
export function setJwtToken(token: string) {
  return localStorage.setItem('jwtToken', token)
}
