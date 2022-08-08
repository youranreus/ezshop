/**
 * @author 季悠然
 * @date 2022-08-05
 */
import Index from "../pages/Index";
import Base from "../pages/base";

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
];
export default routes;