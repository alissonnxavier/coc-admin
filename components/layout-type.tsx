interface LayoutTypeProps {
    type: string;
}

const LayoutType = ({ type }: LayoutTypeProps) => {

    if (type === "farm") {
        return (
            <div className="text-lime-200 animate-pulse mt-1">
                {type}
            </div>
        )
    }

    if (type === "push") {
        return (
            <div className="text-violet-500 animate-pulse mt-1">
                {type}
            </div>
        )
    }

    if (type === "war") {
        return (
            <div className="text-orange-600 animate-pulse mt-1">
                {type}
            </div>
        )
    }

    return (
        <div>
            {type}
        </div>
    )
};

export default LayoutType;
