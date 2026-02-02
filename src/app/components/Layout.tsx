import { Outlet, useLocation } from "react-router";
import { ScrollToTop } from "@/app/components/ScrollToTop";
import { FloatingSearchBar } from "@/app/components/FloatingSearchBar";

export function Layout() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <>
            <ScrollToTop />
            <Outlet />
            {!isLoginPage && <FloatingSearchBar />}
        </>
    );
}
