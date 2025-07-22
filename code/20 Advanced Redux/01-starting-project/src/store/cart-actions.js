import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch("https://bt3103-week-6-7c79c-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json")

            if (!response.ok){
                throw new Error("Could not fetch cart data")
            }
            const data = await response.json()

            return data
        }

        try { 
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
        } catch (error){
           dispatch(uiActions.showNotification({
                title: "Error!",
                status: "error",
                message: "Sending Cart Data Failed!"
            })) 
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            title: "Sending...",
            status: "pending",
            message: "Sending Cart Data!"
        }))
        const sendRequest = async () => {
            const response = await fetch("https://bt3103-week-6-7c79c-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", 
                { 
                method: "PUT", 
                body: JSON.stringify(cart)
                })
        
                if (!response.ok){
                throw new Error("Sending cart failed")
                }
        }

        try {
            await sendRequest()
            dispatch(uiActions.showNotification({
                title: "Success",
                status: "success",
                message: "Sent Cart Data successfully!"
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                title: "Error!",
                status: "error",
                message: "Sending Cart Data Failed!"
            }))
        }
    }
}