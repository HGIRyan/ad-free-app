const initialState = {
    user_id: '',
    email: '',
    username: '',
    autoRenew: '',
    renewalPeriod: '',
    isDev: true,
    developer:'',
    dev_id:''
}

// DEFINE
const UPDATEUSER_ID = 'UPDATEUSER_ID'
const UPDATEUSER_EMAIL = 'UPDATEUSER_EMAIL'
const UPDATEDUSERNAME = 'UPDATEDUSERNAME'
const UPDATEUSER_AUTORENEWAL = 'UPDATEUSER_AUTORENEWAL'
const UPDATEUSER_RENEWALPERIOD = 'UPDATEUSER_RENEWALPERIOD'
const UPDATE_ISDEV = 'UPDATE_ISDEV'
const UPDATE_DEVELOPER = 'UPDATE_DEVELOPER'
const UPDATE_DEVID = 'UPDATE_DEVID'
const RESET_STATE = 'RESET_STATE'



// FUNCTION
export function update_user_id(user_id) {
    return {
        type: UPDATEUSER_ID,
        payload: user_id
    }
}
export function update_user_email(email) {
    return {
        type: UPDATEUSER_EMAIL,
        payload: email
    }
}
export function update_username(username) {
    return {
        type: UPDATEDUSERNAME,
        payload: username
    }
}
export function update_autoRenewal(autoRenew) {
    return {
        type: UPDATEUSER_AUTORENEWAL,
        payload: autoRenew
    }
}
export function update_renewalPeriod(renewalPeriod) {
    return {
        type: UPDATEUSER_RENEWALPERIOD,
        payload: renewalPeriod
    }
}
export function update_isDev(isDev) {
    return {
        type: UPDATE_ISDEV,
        payload: isDev
    }
}
export function update_developer(developer) {
    return {
        type: UPDATE_DEVELOPER,
        payload: developer
    }
}
export function update_devid(dev_id) {
    return {
        type: UPDATE_DEVID,
        payload: dev_id
    }
}

export function resetState() {
    return {
        type: RESET_STATE
    }
}

// EXPORT
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATEUSER_ID:
            return { ...state, user_id: action.payload }
        case UPDATEUSER_EMAIL:
            return { ...state, email: action.payload }
        case UPDATEDUSERNAME:
            return { ...state, username: action.payload }
        case UPDATEUSER_AUTORENEWAL:
            return { ...state, autoRenew: action.payload }
        case UPDATEUSER_RENEWALPERIOD:
            return { ...state, renewalPeriod: action.payload }
        case UPDATE_ISDEV:
            return { ...state, isDev: action.payload }
        case UPDATE_DEVELOPER:
            return { ...state, developer: action.payload }
        case UPDATE_DEVID:
            return { ...state, dev_id: action.payload }
        case RESET_STATE:
            return { user_id: 0, email: '', username: '', autoRenew: '', renewalPeriod: '', }
        default:
            return state;
    }
}