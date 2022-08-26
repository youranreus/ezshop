/**
 * @author 季悠然
 * @date 2022-08-17
 */
import Item from "./Item";

export default function ItemList(props) {
    const {listData} = props;

    return (<div className={"item-list"}>
        {listData.map(item => (item.is_active && item.ori_price && item.ori_price !== -1) ? <Item itemData={item} key={item.id}/> : "")}
    </div>)
}