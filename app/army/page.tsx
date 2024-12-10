/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

const Army = () => {
    return (
        <div className="flex justify-center items-center w-full">
            <Card className="border border-indigo-500">
                <CardHeader>
                    <CardTitle className="text-indigo-200">
                        DragClone
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <div className="">
                            <span className="absolute font-bold text-2xl ml-1 mt-0">3x</span>
                            <Image
                                className="rounded-lg shadow-lg shadow-pink-400 h-16 w-14"
                                alt="army"
                                width={60}
                                height={60}
                                src='/army/archer.png'
                            />
                        </div>
                        <div>
                            <span className="absolute font-bold text-2xl ml-1 mt-0">3x</span>
                            <Image
                                className="rounded-lg shadow-lg shadow-red-400 h-16 w-14"
                                alt="army"
                                width={60}
                                height={60}
                                src='/army/balloon.png'
                            />
                        </div>
                        <div>
                            <span className="absolute font-bold text-2xl ml-1 mt-0">3x</span>
                            <Image
                                className="rounded-lg shadow-lg shadow-indigo-400 h-16 w-14"
                                alt="army"
                                width={60}
                                height={60}
                                src='/army/dragon.png '
                            />
                        </div>
                        <div>
                            <span className="absolute font-bold text-2xl ml-1 mt-0">3x</span>
                            <Image
                                className="rounded-lg shadow-lg shadow-pink-400 h-16 w-14"
                                alt="army"
                                width={60}
                                height={60}
                                src='/army/apprentice-warden.png'
                            />
                        </div>
                        <div>
                            <span className="absolute font-bold text-2xl ml-1 mt-0">3x</span>
                            <Image
                                className="rounded-lg shadow-lg shadow-green-400 h-16 w-14"
                                alt="army"
                                width={60}
                                height={60}
                                src='/army/babydragon.png'
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant='quality'>
                        Copiar / Usar
                    </Button>
                </CardFooter>
            </Card>

        </div>
    )
};

export default Army;
