import { AllImage } from "@/constants/image.constant"
import MyButton from "@/view/components/common/form/my-button"
import MyInput from "@/view/components/common/form/my-input.comp"
import { MessageSquareOff } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const messages = [
    {
        id: 1,
        question: "Does this contract comply",
        response: "Yes",
    },
    {
        id: 1,
        question: "Does this contract comply",
        response: "Yes",
    },
    {
        id: 1,
        question: "Does this contract comply",
        response: "Yes",
    },
    {
        id: 1,
        question: "Does this contract comply",
        response: "Yes",
    },
    {
        id: 1,
        question: "Does this contract comply",
        response: "Yes",
    },
    {
        id: 1,
        question: "Does this contract comply",
        response: "Yes",
    },
    {
        id: 1,
        question: "Does this contract comply",
        response: "Yes",
    },
    {
        id: 1,
        question: "Does this contract comply",
        response: "Yes",
    },
    {
        id: 1,
        question: "Does this contract comply",
        response: "Yes",
    },
    {
        id: 1,
        question: "Does this contract comply",
        response: "Yes",
    },
    {
        id: 1,
        question: "Does this contract comply",
        response: "Yes",
        time: "10:00",
    },
    {
        id: 1,
        question: "Does this contract comply",
        response: "No",
    },
]
export const ChatHead = ({ isChatOpen }: { isChatOpen: boolean }) => {
    // const { chatHead, setChatHead, control, handleSubmit, isSubmitting, messages } = useChatController()
    const [value, setValue] = useState("")
    const divRef = useRef<HTMLDivElement | null>(null)

    // const { isChatOpen } = useDashboardController()

    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [isChatOpen])

    return (
        <div>
            {isChatOpen && (
                <div>
                    <div className="bg-white w-full h-full rounded-lg relative border">
                        <div className="overflow-y-scroll scroll-smooth h-80 p-4 scrollbar-hide">
                            <>
                                {(messages?.length || 0) < 1 ? (
                                    <div className="h-full w-full relative">
                                        <div className="text-gray-400 p-4 rounded-xl w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div className="flex justify-center items-center gap-1">
                                                <MessageSquareOff size={20} /> <p>No messages</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        {messages
                                            ?.sort((a, b) => a.id - b.id)
                                            ?.map((item) => {
                                                return (
                                                    <div key={item.id} className="space-y-4">
                                                        <p className="text-gray-400 text-xs text-center">
                                                            {item.time}
                                                        </p>
                                                        {/* sender  */}
                                                        <div className="space-y-1 flex justify-end">
                                                            <p className="w-[85%] float-right">
                                                                <span className="float-right py-1.5 px-3 bg-[#55A0FE] dark:bg-[#FAFAFA] text-white dark:text-black inline-block text-sm rounded-t-xl rounded-bl-xl shadow-lg">
                                                                    {item.question}
                                                                </span>
                                                            </p>
                                                        </div>

                                                        {/* receiver  */}
                                                        <div className="space-y-1 w-[85%] pb-4">
                                                            <p>
                                                                <span className="py-1.5 px-3 border inline-block text-sm rounded-tr-xl rounded-b-xl shadow-md">
                                                                    {item.response}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        <div ref={divRef} />
                                    </div>
                                )}
                            </>
                            {/* {isSubmitting && (
                                <div className="space-y-1 float-left w-[85%] pb-4">
                                    <p>
                                        <span className="py-1.5 px-3 bg-[#3F3F46] inline-block text-sm rounded-t-xl rounded-br-xl animate-pulse">
                                            <MoreHorizontal />
                                        </span>
                                    </p>
                                </div>
                            )} */}
                        </div>
                        <div className="w-full mx-auto shadow-2xl border-t rounded-xl">
                            <div>
                                <div className="rounded-xl flex items-center gap-1 w-full bg-white px-2">
                                    <div className="w-full">
                                        <MyInput
                                            isTextArea
                                            textAreaRows={1}
                                            name="question"
                                            value={value}
                                            placeholder="Üzenet szövege.."
                                            hideLabel
                                            onChange={(e) => setValue(e.target.value)}
                                            className="bg-white border-none outline-none w-full py-3 text-sm "
                                        />
                                    </div>
                                    <div>
                                        <MyButton
                                            variant={"secondary"}
                                            className="bg-transparent p-1 pr-2 dark:hover:bg-transparent hover:bg-transparent"
                                            onClick={async () => {
                                                console.log(value)
                                            }}
                                        >
                                            <img src={AllImage.SEND} className="w-6 h-6" />
                                        </MyButton>
                                    </div>
                                </div>
                            </div>
                            {/* <MySpacer className="h-4" /> */}
                        </div>
                    </div>
                </div>
            )}
            {/* <div className="fixed bottom-16 right-12">
                <div
                    className="bg-primary p-4 rounded-full hover:cursor-pointer hover:bg-primary/90"
                    onClick={() => setChatHead((prev) => !prev)}
                >
                    {chatHead ? <MessageCircleX size={28} /> : <MessageCircleMore size={28} />}
                </div>
            </div> */}
        </div>
    )
}
