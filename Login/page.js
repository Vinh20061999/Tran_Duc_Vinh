// import AppBar from "../Component/AppBar";


export default function Login() {
    return (
        <div className="ml-20">
            {/* <AppBar /> */}
            <div className="bg-main-grey flex flex-col min-h-screen text-black">
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-main-grey min-h-screen">
                        <p className="m-4 text-[4rem] font-bold font-mono">YVCSE</p>
                        <p className="m-4 text-[1.5rem] font-normal font-mono">
                            Youtube Video Comment Sentiment Explorer
                        </p>
                        <p className="ml-4 mt-2 font-bold">by: Tran Duc Vinh</p>
                    </div>
                </div>
            </div>
        </div>
    )
}