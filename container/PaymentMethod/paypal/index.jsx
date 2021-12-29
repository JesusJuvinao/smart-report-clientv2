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
                            return '';
                        } catch (error) {
                            console.log('');
                        }
                    }}
                    onCancel={(data) => console.log(" ")}
                    onApprove={(data, actions) => {
                        actions.order.capture();
                    }}
                    style={{ layout: "horizontal", color: "blue" }}
                />
            </PayPalScriptProvider>
        </div>
    )
}
