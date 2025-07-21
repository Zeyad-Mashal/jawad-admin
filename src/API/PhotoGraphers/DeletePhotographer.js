const URL = "https://jawad-gbvq.onrender.com/api/v1/photographer/delete/";

const DeletePhotographer = async (setloading, setError, DeletePhotographerId, setDeleteModalOpen, getAllPhotographers) => {
    setloading(true)
    const lang = localStorage.getItem("lang") || "ar"
    const token = localStorage.getItem("jawadToken")

    try {
        const response = await fetch(`${URL}${DeletePhotographerId}`, {
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
            setDeleteModalOpen(false)
            getAllPhotographers()
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
export default DeletePhotographer;