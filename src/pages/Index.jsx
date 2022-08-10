/**
 * @author 季悠然
 * @date 2022-08-05
 */
import Filter from "../components/filter";
import ItemList from "../components/display/itemlist";

function Index() {
    return (
        <div className="index">
            <Filter />
            <ItemList />
        </div>
    );
}

export default Index;
