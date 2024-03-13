type Props = {
    children: React.ReactNode
}

const Modal = (props: Props) => {
    return (
        <div className="h-full min-w-full bg-[#ea5a0c94] flex justify-center items-center absolute top-0 left-0 z-40">{props.children}</div>
    )
}

export default Modal