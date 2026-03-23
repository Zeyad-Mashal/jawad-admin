const URL = "https://jawad-gbvq.onrender.com/api/v1/coupon/create";

const CreateCoupon = async (
  setloading,
  setError,
  type,
  data,
  onSuccess
) => {
  setloading(true);
  const token = localStorage.getItem("jawadToken");

  try {
    const response = await fetch(`${URL}?type=${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `jawJQ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      onSuccess?.(result);
      setError(null);
    } else {
      setError(result?.message || "Failed to create coupon");
    }
  } catch (error) {
    setError("An error occurred");
    console.log(error);
  } finally {
    setloading(false);
  }
};

export default CreateCoupon;
