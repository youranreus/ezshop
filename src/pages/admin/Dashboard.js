/**
 * @author 季悠然
 * @date 2022-08-09
 */
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Toast} from "@douyinfe/semi-ui";

export default function Dashboard() {
    const navi = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('access_token')) {
            Toast.info({
                content: '请先登录',
                duration: 2
            })
            navi('/admin/login');
        }
        else
        {
            Toast.info({
                content: '自动登录成功',
                duration: 2
            })
        }
    }, [])

    return (
        <div className={"dashboard"}>
            <h2>这里是控制台</h2>
        </div>
    )
}
