import { QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { ToastContainer } from "react-toastify"
import { queryClient } from "./config/query.config"
// import AuthWrapper from "./view/components/layout/auth-wrapper"
import ErrorPage from "./view/page/error/error.page"
import RootRouter from "./view/router/root.router"

// global css
import "react-toastify/dist/ReactToastify.css"

export default function App() {
    return (
        <div className="">
            {/* todo: className="dark" for dark mode*/}
            <div className="font-montserrat bg-[#F6F9FF] dark:bg-gray-900">
                <ErrorBoundary
                    fallbackRender={({ error, resetErrorBoundary }) => {
                        return (
                            <>
                                <ErrorPage error={error as Error} resetErrorBoundary={resetErrorBoundary} />
                            </>
                        )
                    }}
                >
                    <QueryClientProvider client={queryClient}>
                        <RootRouter />
                    </QueryClientProvider>
                    <ToastContainer />
                </ErrorBoundary>
            </div>
        </div>
    )
}
