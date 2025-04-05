import Image from "next/image"
import { DotLoader } from "react-spinners"

export const LogoLoader = () => {
    return (
        <>
            <div className="flex justify-center items-center w-full" >
                <div className="animate-pulse">
                    <Image
                        alt="barbaro photo"
                        width={300}
                        height={300}
                        src={'/barbaro.jpg'}
                        className="rounded-full"
                        priority
                    />
                    <div className="flex justify-center items-center ">
                        <DotLoader
                            color="#732e06"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
