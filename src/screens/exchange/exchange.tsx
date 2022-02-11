import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exchange, exchangeCleanup } from "../../store/actions/currencies";
import { currencyRate, currencyRateCleanup } from "../../store/actions/currencyRate.tsx";
import { allCurrency } from "../../store/actions/fetchCurrencies";
import { fetchUser, fetchUserCleanup } from "../../store/actions/home";

/**
 * @const ExchangeInputWrapper 
 * @returns The Exchange page Component
 */
const ExchangeInputWrapper = () => {
    const [from, setFrom] = useState(""); // state for storing the sell currency
    const [to, setTo]: any = useState(""); // state for buy cuurency
    const [loggedinUser, setLoggedinUser]: any = useState(); // the logged in user state variable
    const [allCurrencies, setCurrencies] = useState([]); // all currency state
    const [error, setError] = useState("") // stores teh error and send it back to user
    const [available, setAvailable] = useState(0) // lists the availbale exchange currency
    const [conversionRate, setRate] = useState(0); // stores the conversion rate
    const [converBox, setConverBox] = useState(0); 
    const [amount, setAmount] = useState(0) // returns the amount to recieve after exchangw
    const [loading, setLoading] = useState(false) // stores the state of the app in loading state
    const [balances, setBalances]: any = useState([]) // stores the user's balances
    const fetchUserState = useSelector((s: any) => s.fetchuser) // fetch the logged in user details
    const allCurrencyState = useSelector((s: any) => s.fetchAllCurrency) // fetch all currencies
    const dispatch = useDispatch() // for firing actions
    const exchangeState = useSelector((s: any) => s.exchange) 
    const exchangeRate = useSelector((s: any) => s.currencyRate)
    const fromCurrency: any = document.querySelector(".from"); // get the value of the sell currency(DOM)
    const toCurrency: any = document.querySelector('.to'); // gets the value of the buy currency(DOM)
    var searchBox: any = document.querySelector('.searchBox');
/**
 * dispatch the fetuser and allcurrency action to fetch the login user 
 * and fetch the available currencies respectively
 */
    useEffect(() => {
        dispatch(fetchUser())
        dispatch(allCurrency())
    }, [dispatch,]);

/**
 * To get the exchange rate for two selected currency
 */
    useEffect(() => {
        // the endpoint payload
        const values = {
            "buyCcy": from === "" ? fromCurrency && fromCurrency.value : from,
            "sellCcy": to === "" ? toCurrency && toCurrency.value : to,
        }
    // dispatch action to fetch the currency pair rate
        dispatch(currencyRate(values))
    }, [dispatch, from, fromCurrency, to, toCurrency]);


    useEffect(() => {
        if (fetchUserState.isSuccessful) {
            setLoggedinUser(fetchUserState.data.user)
            // console.log(fetchUserState.data.user)
            dispatch(fetchUserCleanup());
        } else if (fetchUserState.error) {
            setError(fetchUserState.error)
            dispatch(fetchUserCleanup())
        }
    }, [fetchUserState]);

    useEffect(() => {
        if (allCurrencyState && allCurrencyState.isSuccessful) {
            setCurrencies(allCurrencyState.data.currencies.filter((single: any) => single.id !== loggedinUser.balances[0].currency_id));
            dispatch(fetchUserCleanup());
        } else if (allCurrencyState.error) {
            setError(allCurrencyState.error)
            dispatch(fetchUserCleanup())
        }
    }, [allCurrencyState, dispatch])
    useEffect(() => {
        loggedinUser && loggedinUser.balances.map((sing: any) => {
            allCurrencies.map((single: any) => {
                const image = single.code.toLowerCase()
                single.id === sing.currency_id && setBalances([...balances, { "id": single.id, "code": single.code, "amount": sing.amount, "image": image }]);
            })
        })
    }, [allCurrencies, balances, loggedinUser])
    useEffect(() => {
        axios({
            url: 'https://homechallenge.volopa.com/currencies',
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                'Accept': 'application/json',
            },
        }).then(
            (currencies: any) => {
                setCurrencies(currencies.data.data.currencies);
            }
        );

    },[setCurrencies]);
    useEffect(() => {
        if (exchangeRate.isSuccessful) {
            setRate(exchangeRate.data.currentRate.rate)
            console.log(exchangeRate);
            dispatch(currencyRateCleanup());
        } else if (exchangeRate.error) {
            setError(exchangeRate.error)
            dispatch(currencyRateCleanup())
        }
    }, [dispatch, exchangeRate])
    const onFinish = () => {
        const values = {
            "buyCcy": fromCurrency.value,
            "sellCcy": toCurrency.value,
            "amount": searchBox.value,
        }
        dispatch(exchange(values))
    }

    useEffect(() => {
        if (exchangeState.isSuccessful) {
            dispatch(exchangeCleanup())
        } else if (exchangeState.error) {
            setError(exchangeState.error)
            dispatch(exchangeCleanup())
        } else if (exchangeState.isLoading) {
            setLoading(true);
        }
    }, [dispatch, exchangeState])
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <h5 >Your Available {from === "" ? balances.map((balance: any, index: any) => index === 0 && balance.code) : from} fund : <span className="available_bal">{available === 0 && balances.map((balance: any, index: any) => index === 0 && balance.amount)}</span></h5>

                <form onSubmit={(e) => { e.preventDefault();}}>
                    <label className="text-start px-2 mt-4" style={{ width: "100%" }}>I NEED TO EXCHANGE</label>
                    <div className="d-flex flex-row ">
                        <input defaultValue={0} onChange={(e: any) => { setConverBox(e.target.value); setAmount(e.target.value) }} type="number" style={{ width: "60%" }} id="login" className="fadeIn second searchBox" name="login" placeholder="100" />
                        <select className="fadeIn second from" onChange={(e: any) => { setFrom(e.target.value); setAvailable(() => balances.filter((balance: any) => balance.code === e.target.value)) }} style={{ width: "40%", marginTop: 7, marginBottom: 7, border: "none", borderRadius: 6, marginRight: 7 }}>
                            {
                                balances && balances.map((balance: any) => <option key={balance.id} value={balance.code}> {balance.code}</option>)
                            }
                        </select>
                    </div>
                    <div id="finalAmount" className="text-start px-2 mt-4" style={{ width: "100%" }}><span>CURRENT EXCHANGE RATE: </span><span className="finalValue" style={{ color: "green" }}>{conversionRate}</span></div>
                    <label className="text-start px-2 mt-4" style={{ width: "100%" }}>I NEED TO EXCHANGE</label>
                    <div className="d-flex flex-row ">
                        <input value={amount} style={{ width: "60%" }} type="number" id="login" className="fadeIn second convert" placeholder="100" />
                        <select onChange={(e: any) => setTo(e.target.value)} className="fadeIn second to" style={{ width: "40%", marginTop: 7, marginBottom: 7, border: "none", borderRadius: 6, marginRight: 7 }}>
                            {
                                allCurrencies && allCurrencies.map((cur: any) => <option value={cur.code}> {cur.code}</option>)
                            }
                        </select>
                    </div>
                    {loading && <div className="spinner-grow" role="status">
                    </div>}
                    {!loading && <input disabled={(amount === 0 || amount > (available === 0 && balances.map((balance: any, index: any) => index === 0 && balance.amount))) && true} onClick={() => { amount > (available === 0 && balances.map((balance: any, index: any) => index === 0 && balance.amount)) && alert("Sell anmount is greater than available fund for this currency") }} type="submit" />}
                </form>

            </div>
        </div>
    )
}

export default ExchangeInputWrapper;