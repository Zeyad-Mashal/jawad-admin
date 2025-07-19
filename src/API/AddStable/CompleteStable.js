const URL = "https://jawad-gbvq.onrender.com/api/v1/stable/completed/";

const CompleteStable = async (setloading, setError, data, completeStableId, setCompleteModel, getAllStables) => {
    setloading(true)
    const lang = localStorage.getItem("lang") || "ar"
    try {
        const response = await fetch(`${URL}${completeStableId}`, {
            method: 'PUT',
            headers: {
                "accept-language": `${lang}`,
            },
            body: data,
        });

        const result = await response.json();

        if (response.ok) {
            setloading(false);
            setCompleteModel(false)
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
    }
}
export default CompleteStable;