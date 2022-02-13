interface Message {
    show: boolean;
    onClose: any;
    type: string;
    message: string;
    link: string | null;
}
const Message = ({
    show = false,
    onClose,
    type,
    message,
    link = null,
}: Message) => {
    const handleCloseClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.preventDefault();
        onClose();
    };

    const messageModal = show ? (
        <div className={`message-wrapper ${type}`}>
            <div className="close-btn" onClick={handleCloseClick}>
                <span>x</span>
            </div>
            <div className="message">
                {link ? (
                    <a href={link} target="_blank" rel="noreferrer">
                        {message}
                    </a>
                ) : (
                    { message }
                )}
            </div>
        </div>
    ) : null;

    return messageModal;
};

export default Message;
