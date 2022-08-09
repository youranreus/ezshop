/**
 * @author 季悠然
 * @date 2022-08-05
 */
import Index from "../pages/Index";
import Base from "../pages/base";
import Admin from "../pages/Admin";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";

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
        element: <Admin/>,
        children: [
            {
                path: "/admin/login",
                element: <Login/>
            },
            {
                index: true,
                element: <Dashboard/>
            }
        ]
    }
];
export default routes;