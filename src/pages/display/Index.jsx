/**
 * @author 季悠然
 * @date 2022-08-05
 */
import Filter from "../../components/filter";
import {useEffect, useState} from "react";
import {QueryThingList} from "../../api/gift";

function Index() {
    const [filterObj, setFilterObj] = useState({});

    /**
     * 获取礼物列表
     */
    useEffect(()=> {
        QueryThingList(filterObj).then(res => {
            console.log(res);
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

            </div>
        </div>
    );
}

export default Index;
