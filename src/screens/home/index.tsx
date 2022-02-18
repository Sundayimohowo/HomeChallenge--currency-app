import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import flags from "../../assets/images";
import { allCurrency } from "../../store/actions/fetchCurrencies";
import { fetchUser, fetchUserCleanup } from "../../store/actions/home";
const HomeWrapper = () => {
    const [loggedinUser, setLoggedinUser]: any = useState({});
    const [allCurrencies, setCurrencies]: any = useState();
    const [balances, setBalances]: any = useState([])
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const fetchUserState = useSelector((s: any) => s.fetchuser)
    const allCurrencyState = useSelector((s: any) => s.fetchAllCurrency)
    // const onFinish = (values: any) => {
    //     if (!error) setError(null)

    // }
    useEffect(() => {
        dispatch(allCurrency())
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);
    useEffect(() => {
        if (fetchUserState && fetchUserState.isSuccessful) {
            setLoggedinUser(fetchUserState.data.user)
            dispatch(fetchUserCleanup());
        } else if (fetchUserState.error) {
            setError(fetchUserState.error)
            dispatch(fetchUserCleanup())
        }
    }, [dispatch, fetchUserState]);

    useEffect(() => {
        if (fetchUserState.isSuccessful && allCurrencyState.isSuccessful) {
            fetchUserState && fetchUserState.data.user.balances.map(
                (sing: any) => {
                    setCurrencies(allCurrencyState.data.currencies.filter((single: any) => single.id === sing.currency_id));
                    allCurrencyState && allCurrencyState.data.currencies.filter((single: any) => single.id === sing.currency_id).map((single: any) => {
                        const image = single.code.toLowerCase()
                        flags.map((flag: any) => {
                            if (flag.name === image) {
                                sing.currency_id === single.id && setBalances([...balances, { "id": single.id, "code": single.code, "amount": sing.amount, "image": flag.flag }]);
                                sing.currency_id === single.id && console.log({ "id": single.id, "code": single.code, "amount": sing.amount, "image": flag.flag })
                            }
                        })
                    })

                }
            )
            dispatch(fetchUserCleanup());
        } else if (allCurrencyState.error) {
            setError(allCurrencyState.error)
            dispatch(fetchUserCleanup())
        }
    }, [allCurrencyState, dispatch, fetchUserState])

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                {loggedinUser && loggedinUser.first_name !== "" && loggedinUser.last_name !== "" ? <h4 className="mt-5">Hello {loggedinUser.first_name}, your account balances are as per bellow</h4> : <h4>You should set your name in the Profile section. Your account balances are as per bellow:</h4>}

                <div className="d-flex flex-column mt-4">
                    <div className="d-flex flex-row justify-content-between mx-4">
                        <div className="col-6">
                            <h6>Currency</h6>
                        </div>
                        <div className="col-6">
                            <h6>Available To Spend</h6>
                        </div>
                    </div>
                    {
                        balances && balances.map((balance: any) =>
                            <div key={balance.id} className="d-flex flex-row justify-content-between">
                                <div className="col-6">
                                    <img src={balance.image} alt="flags" />
                                    <span>{balance.code}</span>
                                </div>
                                <div className="col-6">
                                    <span>{balance.amount}</span>
                                </div>
                            </div>

                        )
                    }

                </div>
                <input className="my-5" type="submit" value="Exchange" onClick={() => window.location.href = "/exchange"} />
                <div id="formFooter">
                    <Link to={"/profile"}>Update Profile</Link>
                </div>
            </div>
        </div>
    )
}

export default HomeWrapper;