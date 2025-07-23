const URL = "https://jawad-gbvq.onrender.com/api/v1/school/update/";

const UpdateSchool = async (setloading, setError, data, id, setEditModal, getAllSchools) => {
    setloading(true)
    const lang = localStorage.getItem("lang") || "ar"
    const token = localStorage.getItem("jawadToken")
    try {
        const response = await fetch(`${URL}${id}`, {
            method: 'PUT',
            headers: {
                "accept-language": `${lang}`,
                "authorization": `jawJQ${token}`
            },
            body: data,
        });

        const result = await response.json();

        if (response.ok) {
            setloading(false);
            setEditModal(false)
            getAllSchools()
        } else {
            if (response.status == 401) {
                setError(result.message)
                setloading(false);
                console.log(result.message);

            } else if (response.status == 400) {
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
export default UpdateSchool;