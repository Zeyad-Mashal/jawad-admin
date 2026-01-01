const URL = "https://jawad-gbvq.onrender.com/api/v1/percentage/";

const SchoolPercentage = async (setloading, setError, data, percentageSchoolId, setPercentageModel, getAllSchools) => {
    setloading(true)
    // const lang = localStorage.getItem("lang") || "ar"
    const token = localStorage.getItem("jawadToken")
    try {
        const response = await fetch(`${URL}${percentageSchoolId}?type=school`, {
            method: 'PUT',
            headers: {
                // "accept-language": `${lang}`,
                "Content-Type": "application/json",
                "authorization": `jawJQ${token}`
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            setloading(false);
            setPercentageModel(false);
            getAllSchools();
        } else {
            if (response.status == 401) {
                setError(result.message)
                setloading(false);
                console.log(result.message);

            } else if (response.status == 404) {
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
export default SchoolPercentage;