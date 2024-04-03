import { ReactElement } from "react"
import { NavLink } from "react-router-dom"

type Props = {
    path: string,
    icon: ReactElement
    text: string
}

const Link = (props: Props) => {
    return (
        <NavLink to={props.path} className="text-white group  h-full w-full flex flex-col justify-center items-center ">
            <span className="group-hover:text-green-600 transition-colors whitespace-nowrap">
                {props.icon}
            </span>
            <span className=" text-xs hidden md:inline  group-hover:text-green-600 transition-colors">{props.text}</span>
        </NavLink>
    )
}

export default Link