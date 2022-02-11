
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Alert } from 'antd'
import { signup } from "../../store/actions/signup";
import { signupCleanup } from "../../store/actions/signup";

const RegisterInputWrapper = () => {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errormsg, setErrormsg] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const signupState = useSelector((s: any) => s.signup)

    const onFinish = (values: any) => {
        if (error) setError(false)
        dispatch(signup(values))
    }

    useEffect(() => {
        if (signupState.isSuccessful) {
            if (signupState.data.success === true){
                setSuccess(true)
            }else{
                setError(true);
                setLoading(false)
                setErrormsg(signupState.data.data.message);
            }
            dispatch(signupCleanup())
        } else if (signupState.error) {
            setError(signupState.error)
            dispatch(signupCleanup())
        } else if (signupState.isLoading) {
            setLoading(true);
        }
    }, [dispatch, signupState])
    return (
        <div className="wrapper fadeInDown">
            {success ? (
                    <Alert message="Registered succesfully!! Proceed to Login" type='error'className="mb-3 bg-success px-3 py-3 text-white" style={{borderRadius: 8}} />
            ): null}
            {error ? (
                    <Alert message={errormsg} type='error'className="mb-3 bg-danger px-3 py-3 text-white" style={{borderRadius: 8}} />
            ): null}
            <div id="formContent">
                {loading && <div className="spinner-grow" role="status">
                </div>}
                <div className="fadeIn first mt-5">
                    <h6>Please use this form to create an account.</h6>
                </div>
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
                        <Input placeholder="Enter Your Email" />
                    </Form.Item>
                    <Form.Item
                        className='fadeIn third mt-5'
                        labelAlign='left'
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password'
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter Your Pasword"/>
                    </Form.Item>
                    <Form.Item>
                        <input className="mt-5" type="submit" value={loading ? "Registering":(success ? "Redirecting to Login Page" : "Register")} />
                    </Form.Item>
                </Form>
                <div id="formFooter">
                    <Link to={"/"}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterInputWrapper;