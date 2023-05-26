import '../style/modal.scss';

export default function Modal({ hidden, handleModal, title, msg })
{
    //console.log(modalInfo);
    if (hidden)
        return null;

    return (
        <>
            <div className="modalOverlay" onClick={handleModal} />
            <div className="modalContainer">
                <h2> {title} </h2>
                <p> {msg} </p>
            </div>
        </>
    )
}