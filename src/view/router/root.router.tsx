import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "../page/login/login.page"
import NotFoundPage from "../page/not-found/not-found.page"
// import ProtectedRoute from "./protected.route"
import AuthWrapper from "../components/layout/auth-wrapper"
import { SideBarWrapper } from "../components/layout/sidebar-wrapper"
import AuthPage from "../page/auth/auth.page"
import DashboardPage from "../page/dashboard/dashboard.page"
import { ProductPage } from "../page/products/products.page"
import SignUpPage from "../page/sign-up/sign-up.page"
import StarterPage from "../page/starter/starter.page"
import SuccessfulPage from "../page/successful/successful.page"
import ProtectedRoute from "./protected.route"
import PublicRoute from "./public.route"
import { RouteUrl } from "./url"

export default function RootRouter() {
    return (
        <>
            <BrowserRouter>
                <AuthWrapper>
                    <Routes>
                        <Route
                            path={RouteUrl.HOME}
                            element={
                                <ProtectedRoute>
                                    <SideBarWrapper>
                                        <DashboardPage />
                                    </SideBarWrapper>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.PRODUCTS}
                            element={
                                <ProtectedRoute>
                                    <SideBarWrapper>
                                        <ProductPage />
                                    </SideBarWrapper>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.STARTER}
                            element={
                                <ProtectedRoute>
                                    <StarterPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.AUTH}
                            element={
                                <PublicRoute>
                                    <AuthPage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.LOGIN}
                            element={
                                <PublicRoute>
                                    <LoginPage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.SIGN_UP}
                            element={
                                <PublicRoute>
                                    <SignUpPage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.SUCCESSFUL}
                            element={
                                <ProtectedRoute>
                                    <SuccessfulPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route path={RouteUrl.NOT_FOUND} element={<NotFoundPage />} />
                    </Routes>
                </AuthWrapper>
            </BrowserRouter>
        </>
    )
}
