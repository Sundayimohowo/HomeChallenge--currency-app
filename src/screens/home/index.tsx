import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FlagImages from "../../assets/images";
import { allCurrency } from "../../store/actions/fetchCurrencies";
import { fetchUser, fetchUserCleanup } from "../../store/actions/home";
const HomeWrapper = () => {
    const [loggedinUser, setLoggedinUser]: any = useState();
    const [allCurrencies, setCurrencies]: any = useState();
    const [balances, setBalances]: any = useState([])
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const fetchUserState = useSelector((s: any) => s.fetchuser)
    const allCurrencyState = useSelector((s: any) => s.fetchAllCurrency)
    // const onFinish = (values: any) => {
    //     if (!error) setError(null)
        
    // }
    useEffect(()=>{
        dispatch(fetchUser())
        dispatch(allCurrency())
    },[dispatch]);

    useEffect(() => {
        if (fetchUserState.isSuccessful) {
            setSuccess(true)
            setLoggedinUser(fetchUserState.data.user);
            dispatch(fetchUserCleanup());
        } else if (fetchUserState.error) {
            setError(fetchUserState.error)
            dispatch(fetchUserCleanup())
        } else if (fetchUserState.isLoading) {
            setLoading(true);
        }
        
    },[fetchUserState]);
    
    useEffect(()=>{
        if (allCurrencyState.isSuccessful) {
            // setCurrencies(allCurrencyState.data.currencies.filter((single: any) => single.id !== loggedinUser.balances[0].currency_id));
            console.log("done")
            dispatch(fetchUserCleanup());
        } else if (allCurrencyState.error) {
            setError(allCurrencyState.error)
            dispatch(fetchUserCleanup())
        }
    },[])

    useEffect(()=>{
        loggedinUser && loggedinUser.balances.map((sing: any) => {
            allCurrencies && allCurrencies.map((single: any) => {
                console.log(single)
                const image = single.code.toLowerCase()
                single.id === sing.currency_id && setBalances([...balances, { "id": single.id, "code": single.code, "amount": sing.amount, "image": image }]);
            })
        })
    },[allCurrencies])
    

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                {loggedinUser && loggedinUser.first_name !== "" && loggedinUser.last_name !== "" ? <h4>Hello {loggedinUser.first_name}, your account balances are as per bellow</h4> : <h4>You should set your name in the Profile section. Your account balances are as per bellow:</h4>}

                <div className="d-flex flex-column">
                    {
                        balances && balances.map((balance: any) => <span key={balance.id}> {balance.code}<FlagImages style={{width: 100, height: 100}} src={balance.image} /></span>)
                    }
                </div>
                <input type="submit" value="Exchange" onClick={() => window.location.href = "/exchange"} />
                <div id="formFooter">
                    <Link to={"/profile"}>Update Profile</Link>
                </div>
            </div>
        </div>
    )
}

export default HomeWrapper;