import { useEffect, useState } from "react";
import { Form, Input, Alert } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../store/actions/auth";
import { login, loginCleanup } from "../../store/actions/login";
import "./style.css";
import { Link } from "react-router-dom";
const LoginInputWrapper = () => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const loginState = useSelector((s: any) => s.login)
    const onFinish = (values: any) => {
        if (!error) setError(null)
        dispatch(login(values))
    }

    useEffect(() => {
        if (loginState.isSuccessful) {
            setSuccess(true)
            dispatch(loginCleanup());
        } else if (loginState.error) {
            setError(loginState.error)
            dispatch(loginCleanup())
            dispatch(clearAuth())
        } else if (loginState.isLoading) {
            setLoading(true);
        }
    }, [dispatch, loginState, success])

    return (
        <div className="wrapper fadeInDown">
            {loading && (<div className="spinner-grow" role="status"></div>)}
            {success && window.location.reload()}
            {!loading && (<div id="formContent">
                {error ? (
                    <Alert message={error} type='error' className="mb-3 bg-danger px-3 py-3 text-white" style={{ borderRadius: 8 }} />
                ) : null}
                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name='login'
                    onFinish={onFinish}
                >
                    <Form.Item
                        label='Email'
                        name='email'
                        className="fadeIn second mt-5"
                        rules={[
                            {
                                required: true,
                                message: 'please input an email'
                            },
                            {
                                type: 'email',
                                message: 'Enter a valid email'
                            }
                        ]}
                        labelAlign='left'
                    >
                        <Input placeholder="Enter Your Email"/>
                    </Form.Item>
                    <Form.Item
                        className='fadeIn third mt-5 mb-5'
                        labelAlign='left'
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password'
                            },
                            {
                                min: 8,
                                message: 'minimum of 8 characters'
                            }
                        ]}
                    >
                        <Input.Password placeholder="Enter Your Password" />
                    </Form.Item>
                    <Form.Item>
                        <input type="submit" value="Login" />
                    </Form.Item>
                </Form>
                <div id="formFooter">
                    <Link to={"/register"}>Register</Link>
                </div>

            </div>)}
        </div>
    )
}

export default LoginInputWrapper;