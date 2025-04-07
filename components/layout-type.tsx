interface LayoutTypeProps {
    type: string;
}

const LayoutType = ({ type }: LayoutTypeProps) => {

    if (type === "farm") {
        return (
            <div className="text-lime-200 ">
                {type}
            </div>
        )
    }

    if (type === "push") {
        return (
            <div className="text-violet-500 ">
                {type}
            </div>
        )
    }

    if (type === "war") {
        return (
            <div className="text-orange-600">
                {type}
            </div>
        )
    }

    if (type === "troll") {
        return (
            <div className="text-pink-600">
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
