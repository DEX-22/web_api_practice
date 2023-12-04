export const addWsUser = (id) =>{
    localStorage.setItem('user_id',id)
}
export const existsUser = (id) =>{
    const exists = localStorage.key('user_id')
    return !!exists
}