import { useState } from "react"

export const useDashboardController = () => {
    const [isChatOpen, setChatOpen] = useState(false)

    return {
        isChatOpen,
        setChatOpen,
    }
}
