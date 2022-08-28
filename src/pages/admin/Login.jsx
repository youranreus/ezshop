/**
 * @author 季悠然
 * @date 2022-08-08
 */
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, Input,  Button, Toast} from "@douyinfe/semi-ui";
import {login} from "../../api/admin";

export default function Login () {
    const [password, setPwd] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();

    const submit = () => {
        if(password === '' || username === '') {
            Toast.warning("用户名或密码不能为空")
        }
        else
        {
            setLoading(true);
            login(username, password).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    Toast.success("登陆成功")
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.refresh_token);
                    localStorage.setItem('user_id', username);
                    setLoading(false);
                    navi('/admin');
                }
                else
                {
                    Toast.error({
                        content: res.data.msg,
                        duration: 2
                    })
                    setLoading(false);
                }
            })
        }

    }

    return (
        <div className={"login-wrapper"}>
            <Card
                style={{ Width: "90vw" }}
                bordered
                headerLine={true}
                title='登录'
            >
                <div className={"login-box"}>
                    <h4>用户名</h4>
                    <Input className={"input"} value={username} onChange={(v) => {setUsername(v)}}></Input>
                    <h4>密码</h4>
                    <Input className={"input"} value={password} onChange={(v) => {setPwd(v)}} type={"password"}></Input>
                    <Button disabled={loading} block theme={'solid'} type={"primary"} onClick={submit}>登录</Button>
                </div>
            </Card>
        </div>
    );
}