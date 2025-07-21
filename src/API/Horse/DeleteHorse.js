const URL = "https://jawad-gbvq.onrender.com/api/v1/horse/delete/";

const DeleteHorse = async (setloading, setError, DeleteHorseId, setShowDeleteModal, getAllStables) => {
    setloading(true)
    const lang = localStorage.getItem("lang") || "ar"
    const token = localStorage.getItem("jawadToken")

    try {
        const response = await fetch(`${URL}${DeleteHorseId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "accept-language": `${lang}`,
                "authorization": `jawJQ${token}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setloading(false);
            setShowDeleteModal(false)
            getAllStables()
        } else {
            if (response.status == 401) {
                setError(result.message)
                setloading(false);
                console.log(result.message);

            } else if (response.status == 413) {
                setError(result.message)
                setloading(false);
                console.log(result.message);

            }
            else if (response.status == 500) {
                console.log(result.message);
            }
            setloading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setloading(false)
        console.log(error);

    }
}
export default DeleteHorse;