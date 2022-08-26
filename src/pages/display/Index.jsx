/**
 * @author 季悠然
 * @date 2022-08-05
 */
import Filter from "../../components/filter";
import {useEffect, useState} from "react";
import {QueryThingList} from "../../api/gift";
import {Spin, Toast, Button} from "@douyinfe/semi-ui";
import {IconLoading} from '@douyinfe/semi-icons';
import ItemList from "../../components/display/ItemList";

function Index() {
    const [filterObj, setFilterObj] = useState({
        filter: {
            ori_price: [">=", "0"],
            is_active: ["==", "1"]
        },
        order: {},
        page: 1,
        per_page: 10
    });
    const [itemList, updateItemList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setMore] = useState(true);

    /**
     * 获取礼物列表
     */
    useEffect(() => {
        const len = itemList.length;
        if (len === 0) setLoading(true);
        QueryThingList(filterObj).then(res => {
            console.log(res.data);
            if (res.data.code === 200) {
                if (filterObj.page !== 1) {
                    updateItemList(itemList.concat(res.data.data));
                    if (res.data.returned + len >= res.data.total) setMore(false);
                    else setMore(true);
                } else {
                    updateItemList(res.data.data);
                    if (res.data.returned === res.data.total) setMore(false);
                    else setMore(true);
                }

                setLoading(false);
            } else throw new Error(res.data.msg);
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

    /**
     * 加载更多
     */
    const loadMore = () => {
        const obj = {...filterObj}
        obj.page = obj.page + 1;
        setFilterObj(obj);
    }

    return (
        <div className="index">
            <Filter callback={getFilterObject}/>
            <div className="content">
                {loading && <div className="loading">
                    <Spin indicator={<IconLoading/>} size={"large"}/>
                </div>}
                {!loading && <ItemList listData={itemList}/>}

                {hasMore && <div className="loadMore">
                    <Button theme={"borderless"} block={true} onClick={loadMore}>加载更多</Button>
                </div>}
            </div>
        </div>
    );
}

export default Index;
