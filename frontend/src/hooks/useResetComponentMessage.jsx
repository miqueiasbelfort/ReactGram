// Redux
import {resetMessagePhoto} from "../slices/photoSlice"

export const useResetComponentMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetMessagePhoto())
        }, 2000)
    }
}