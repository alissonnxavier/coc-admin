import React from 'react';

interface LayoutLevelProps {
    cv: string;
}

const LayoutLevel = ({ cv }: LayoutLevelProps) => {

    if (cv === "17") {
        return (
            <div className='border p-1 rounded text-slate-300 border-slate-300 gradient-background-th-17 font-bold' >
                CV {cv}
            </div>
        )
    };

    if (cv === "16") {
        return (
            <div className='border p-1 rounded text-orange-300 border-orange-300 gradient-background-th-16 font-bold'>
                CV {cv}
            </div>
        )
    };

    if (cv === "15") {
        return (
            <div className='border p-1 rounded text-purple-300 border-purple-300 gradient-background-th-15 font-bold'>
                CV {cv}
            </div>
        )
    };

    if (cv === "14") {
        return (
            <div className='border p-1 rounded text-green-300 border-green-300 gradient-background-th-14 font-bold'>
                CV {cv}
            </div>
        )
    };

    if (cv === "13") {
        return (
            <div className='border p-1 rounded text-blue-300 border-blue-300 gradient-background-th-13 font-bold'>
                CV {cv}
            </div>
        )
    };

    if (cv === "12") {
        return (
            <div className='border p-1 rounded text-sky-300 border-sky-300 gradient-background-th-12 font-bold'>
                CV {cv}
            </div>
        )
    };
    if (cv === "11") {
        return (
            <div className='border p-1 rounded border-white gradient-background-th-11 font-bold'>
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
