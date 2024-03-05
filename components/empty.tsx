import { Annoyed } from "lucide-react"
import Image from "next/image"

interface EmptyProps {
    label: string
}

const Empty = ({
    label
}: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <Annoyed className="text-purple-500 h-32 w-32" />
            <p className="text-muted-foreground text-sm text-center">
                {label}
            </p>
        </div>
    )
}

export default Empty