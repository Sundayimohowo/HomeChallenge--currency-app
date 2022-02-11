import { Alert, Form, Input, } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGIN } from "../../constants/routes";
import { useNavigate } from "react-router"
import { update_profile, profileCleanup } from "../../store/actions/profile";
import axios from "axios";
import { fetchUser, fetchUserCleanup } from "../../store/actions/home";

const ProfileInputWrapper = () => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const profileState = useSelector((s: any) => s.profile)
    const Navigate = useNavigate()
    const [success, setSuccess] = useState(false)
    const fetchUserState = useSelector((s: any) => s.fetchuser)
    const [theuser, setUser]: any = useState();
    const onFinish = (values: any) => {
        if (!error) setError(null)
        dispatch(update_profile(values))
    }
    useEffect(()=>{
        dispatch(fetchUser())
    },[dispatch]);
    useEffect(() => {
        if (fetchUserState.isSuccessful) {
            setUser(fetchUserState.data.user)
            dispatch(fetchUserCleanup());
        } else if (fetchUserState.error) {
            setError(fetchUserState.error)
            dispatch(fetchUserCleanup())
        }
    },[]);

    useEffect(() => {
        if (profileState.isSuccessful) {
            setSuccess(true);
            setTimeout(()=>Navigate('/exchange'), 3000)
            dispatch(profileCleanup())
        } else if (profileState.error) {
            setError(profileState.error)
            dispatch(profileCleanup())
        }
    }, [Navigate, dispatch, profileState])
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                {error ? (
                    <Alert message={error} style={{display:"flex",flexDirection:"row",justifyContent:"center", fontWeight:"bold",alignItems: "center", width: 300, height: 50,color:"#fff",marginLeft: 60,marginBottom:20, borderRadius: 10}} className="bg-danger" type='error' showIcon />
                ) : null}
                {success ? (
                    <Alert message="Profile updated successfully" type='error'className="mb-5 bg-success px-3 py-3 text-white" style={{borderRadius: 8}} />
            ): null}
                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name='login'
                    onFinish={onFinish}
                >
                    <Form.Item
                        label='Firstname'
                        name='firstName'
                        className="fadeIn second mt-5"
                        rules={[
                            {
                                required: true,
                                message: 'please Enter Your first Name'
                            },
                        ]}
                        labelAlign='left'
                        initialValue={theuser && theuser.first_name}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        className='fadeIn third mt-5'
                        labelAlign='left'
                        label='Lastname'
                        name='lastName'
                        initialValue={theuser && theuser.last_name}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name'
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className='fadeIn third mt-5 mb-5'
                        labelAlign='left'
                        label='Date of Birth'
                        name='dob'
                        initialValue={theuser && theuser.dob}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Dob'
                            },
                        ]}
                    >
                        <Input placeholder="2000-01-19"/>
                    </Form.Item>



                    <input type="submit" value="Update" />

                </Form>
                <div id="formFooter">
                    <Link to={"/"}>Go Home</Link>
                </div>

            </div>
        </div>
    )
}

export default ProfileInputWrapper;