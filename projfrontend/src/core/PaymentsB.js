import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { emptyCart, loadCart } from './helper/cartHelper';
import { createOrder } from './helper/orderHelper';
import { getToken, processPayment } from './helper/paymentBhelper';
import DropIn from "braintree-web-drop-in-react";

const PaymentsB = ({ products, setReload = f => f, reload = undefined }) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAutheticated() && isAutheticated().user._id;
    const token = isAutheticated() && isAutheticated().token;

    const getMeToken = (userId, token) => {
        getToken(userId, token).then(info => {
            console.log("INFORMATION: ", info)
            if(info.error) {
                // console.log("ERRORS: ", info.error)
                setInfo({...info, error: info.error});
            }
            else {
                const clientToken = info.clientToken;
                setInfo({ clientToken })
            }
        })
    }

    const showdropIn = () => {
        // console.log(typeof amount)
        return (
            <div>
                {(info.clientToken !== null && products.length > 0 && userId !== false) ? (
                    <div>
                        <DropIn
                        options={{ authorization: info.clientToken }}
                        onInstance={(instance) => (info.instance = instance)}
                        />
                        <button className="btn btn-block form-control btn-outline-success" onClick={onBuy}>Buy</button>
                    </div>
                ) : ( (userId === false) ? (<h3>You are not logged In, Please Login <Link to="/signin">here</Link></h3>) : (<></>))}
            </div>
        )
    }    
    useEffect(() => {
        getMeToken(userId, token)
    }, []);

    const onBuy = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    requestPaymentMethodNonce: nonce,
                    amount: getAmount()
                }
                processPayment(userId, token, paymentData)
                .then(response => {
                    setInfo({ ...info, success: response.success, loading: false });
                    console.log("PAYMENT SUCCESS");
                    console.log("ABDUL PRINTING RESPONSE", response);
                    const orderData = {
                        products: products,
                        // transaction_id : response.transaction._id,
                        amount: response.params.transaction.amount
                    }
                    createOrder(userId, token, orderData);
                    emptyCart(() => {
                    })
                    setReload(!reload);
                }).catch(err => {
                    console.log(err);
                })
            })
            .catch(error => {
                setInfo({loading: false, success: false});
                console.log("PAYMENT FAILED");
            })
    }

    const getAmount = () => {
        let amount = 0;
        products.map(product => {
            amount = amount + product.price;
        })
        return amount;
    }

    return (
        <div>
            <h3>Your Bill is <br></br> {getAmount()}$</h3>
            {showdropIn()}
        </div>
    )
}

export default PaymentsB;