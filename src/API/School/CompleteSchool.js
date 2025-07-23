const URL = "https://jawad-gbvq.onrender.com/api/v1/school/completed/";

const CompleteSchool = async (setloading, setError, data, CompleteSchoolId, setCompletionModal, getAllSchools) => {
    setloading(true)
    const lang = localStorage.getItem("lang") || "ar"
    const token = localStorage.getItem("jawadToken")
    try {
        const response = await fetch(`${URL}${CompleteSchoolId}`, {
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
            setCompletionModal(false)
            getAllSchools()
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
    }
}
export default CompleteSchool;