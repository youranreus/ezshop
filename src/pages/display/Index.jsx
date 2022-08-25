/**
 * @author 季悠然
 * @date 2022-08-05
 */
import Filter from "../../components/filter";
import {useEffect, useState} from "react";
import {QueryThingList} from "../../api/gift";
import {Spin, Toast} from "@douyinfe/semi-ui";
import { IconLoading } from '@douyinfe/semi-icons';

function Index() {
    const [filterObj, setFilterObj] = useState({});
    const [itemList, updateItemList] = useState([]);
    const [loading, setLoading] = useState(false);

    /**
     * 获取礼物列表
     */
    useEffect(()=> {
        setLoading(true);
        QueryThingList(filterObj).then(res => {
            if (res.data.code === 200) {
                updateItemList(res.data.data);
                setLoading(false);
            }
            else throw new Error(res.data.msg);
        }).catch(err => {
            Toast.error(err.message);
        })
    }, [filterObj]);

    /**
     * 更新筛选表单值
     * @param obj
     */
    const getFilterObject = (obj) => {
        setFilterObj(obj);
    }

    return (
        <div className="index">
            <Filter callback={getFilterObject}/>
            <div className="content">
                <div className="loading">
                    <Spin indicator={<IconLoading />} size={"large"} spinning={loading}/>
                </div>
            </div>
        </div>
    );
}

export default Index;
