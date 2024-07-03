
export let DEV_MODE = false
export let CURRENT_USER = DEV_MODE ? 'admin' : null

export function SetCurrentUser(user) { CURRENT_USER = user }