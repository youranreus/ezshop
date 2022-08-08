/**
 * @author 季悠然
 * @date 2022-08-05
 */
import Index from "../pages/Index";
import Base from "../pages/base";
import Admin from "../pages/Admin";

const routes = [
    {
        path: "/",
        element: <Base/>,
        children: [
            {
                index: true,
                element: <Index/>,
            }
        ],
    },
    {
        path: "/admin",
        element: <Admin/>
    }
];
export default routes;