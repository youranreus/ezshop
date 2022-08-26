/**
 * @author 季悠然
 * @date 2022-08-05
 */
import Display from "../pages/Display";
import Admin from "../pages/Admin";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import ResetPwd from "../pages/admin/ResetPwd";

const routes = [
    {
        path: "/",
        element: <Display/>
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
            },
            {
                path: "/admin/reset",
                element: <ResetPwd/>
            }
        ]
    }
];
export default routes;