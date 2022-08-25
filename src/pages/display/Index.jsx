/**
 * @author 季悠然
 * @date 2022-08-05
 */
import Filter from "../../components/filter";
import {useState} from "react";
import {QueryThingList} from "../../api/gift";

function Index() {
    const [filterObj, setFilterObj] = useState({});

    const getFilterObject = (obj) => {
        setFilterObj(obj);
        QueryThingList(obj).then(res => {
            console.log(res);
        })
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
