import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export const IndexPaypal = () => {
    return (
        <div>
            <PayPalScriptProvider options={{ "client-id": "", }} >
                <PayPalButtons
                    createOrder={async () => {
                        try {
                            // const res = await axios({
                            //     url: "http://localhost:3000/api/payment",
                            //     method: "POST",
                            //     headers: {
                            //         "Content-Type": "application/json",
                            //     },
                            // });
                            console.log('object')
                            return '';
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    onCancel={(data) => console.log("compra cancelada")}
                    onApprove={(data, actions) => {
                        console.log(data);
                        actions.order.capture();
                    }}
                    style={{ layout: "horizontal", color: "blue" }}
                />
            </PayPalScriptProvider>
        </div>
    )
}
