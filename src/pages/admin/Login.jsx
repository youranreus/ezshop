/**
 * @author 季悠然
 * @date 2022-08-08
 */
import {useState} from "react";
import {Card, Input,  Button} from "@douyinfe/semi-ui";

export default function Login () {
    const [password, setPwd] = useState('');
    const [username, setUsername] = useState('');

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
                    <Button block theme={'solid'} type={"primary"}>登录</Button>
                </div>
            </Card>
        </div>
    );
}