/**
 * @author 季悠然
 * @date 2022-08-08
 */
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, Input, Button, Toast} from "@douyinfe/semi-ui";
import {ResetPassword} from "../../api/admin";

export default function ResetPwd() {
    const [password, setPwd] = useState('');
    const [verify_password, setVPwd] = useState('');
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();

    /**
     * 登录态检查
     */
    useEffect(() => {
        if (!localStorage.getItem('access_token') || !localStorage.getItem('user_id')) {
            Toast.info('请先登录')
            navi('/admin/login');
        }
        // eslint-disable-next-line
    }, []);

    /**
     * 提交
     */
    const submit = () => {
        if (password === '') {
            Toast.warning({
                content: "密码不能为空",
                duration: 2
            })
        } else if (password !== verify_password) {
            Toast.warning({
                content: "两次密码不一致",
                duration: 2
            })
        } else {
            setLoading(true);
            ResetPassword({
                name: localStorage.getItem('user_id'),
                password: password,
                verify_password: verify_password
            }).then(res => {
                console.log(res);
                setLoading(false);
            })
        }

    }

    return (
        <div className={"login-wrapper"}>
            <Card
                style={{Width: "90vw"}}
                bordered
                headerLine={true}
                title='修改密码'
            >
                <div className={"login-box"}>
                    <h4>用户名</h4>
                    <Input className={"input"} value={localStorage.getItem('user_id')} disabled={true}></Input>
                    <h4>新密码</h4>
                    <Input className={"input"} value={password} onChange={(v) => {
                        setPwd(v)
                    }} type={"password"}></Input>
                    <h4>确认密码</h4>
                    <Input className={"input"} value={verify_password} onChange={(v) => {
                        setVPwd(v)
                    }} type={"password"}></Input>
                    <Button disabled={loading} block theme={'solid'} type={"primary"} onClick={submit}>登录</Button>
                </div>
            </Card>
        </div>
    );
}