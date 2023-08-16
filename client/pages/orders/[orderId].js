import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRquest from "../../hooks/use-request";


const OrderShow = ({order, currentUser}) => {

    const[timeLeft, setTimeLeft] = useState(0);
    const {doRequest, errors } = useRquest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId : order.id
        },
        onSuccess: () => Router.push('/orders'),
    })


    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft/1000));
        };
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        }
    },[order]);

    if(timeLeft < 0){
        return <div>Order Expired!</div>
    }



    return(
        <div>
           Time left to Pay: {timeLeft} seconds
           <StripeCheckout 
            token ={(id) => doRequest({token: id})}
            // turn stripe key into an Environment Variable - 495
            stripeKey ="pk_test_51Nd3ZNDW6tEQRg7NcgvJ4Fw8iZdspUDtjnNgHlHkqVNXOtrTDVNNfwli9nhMK4lZAPOq3ekwwaW7wrK2S4HXvoAu00DNXMAxhU"
            amount ={order.ticket.price * 100}
            email = {currentUser.email}
           />
           {errors}
        </div>
    )
}


OrderShow.getInitialProps = async (context, client) => {
    const {orderId} = context.query;
    const {data} = await client.get(`/api/orders/${orderId}`);

    return { order: data};
}

export default OrderShow;