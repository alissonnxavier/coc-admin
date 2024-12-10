import React from 'react';

interface LayoutLevelProps {
    cv: string;
}

const LayoutLevel = ({ cv }: LayoutLevelProps) => {

    if (cv === "17") {
        return (
            <div className='border bg-slate-900 p-0.5 rounded-lg text-slate-300 border-slate-300'>
                CV {cv}
            </div>
        )
    };

    if (cv === "16") {
        return (
            <div className='border bg-orange-900 p-0.5 rounded-lg text-orange-300 border-orange-300'>
                CV {cv}
            </div>
        )
    };

    if (cv === "15") {
        return (
            <div className='border bg-purple-900 p-0.5 rounded-lg text-purple-300 border-purple-300'>
                CV {cv}
            </div>
        )
    };

    if (cv === "14") {
        return (
            <div className='border bg-green-900 p-0.5 rounded-lg text-green-300 border-green-300'>
                CV {cv}
            </div>
        )
    };

    if (cv === "13") {
        return (
            <div className='border bg-blue-900 p-0.5 rounded-lg text-blue-300 border-blue-300'>
                CV {cv}
            </div>
        )
    };

    if (cv === "12") {
        return (
            <div className='border bg-sky-700 p-0.5 rounded-lg text-sky-300 border-sky-300'>
                CV {cv}
            </div>
        )
    };
    if (cv === "11") {
        return (
            <div className='border bg-slate-300 p-0.5 rounded-lg text-black border-white'>
                CV {cv}
            </div>
        )
    };

    return (
        <div className='p-0.5'>
            CV
        </div>
    )
};

export default LayoutLevel;
