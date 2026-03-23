const URL = "https://jawad-gbvq.onrender.com/api/v1/coupon/update/";

const UpdateCoupon = async (setloading, setError, couponId, data, onSuccess) => {
  setloading(true);
  const token = localStorage.getItem("jawadToken");

  try {
    const response = await fetch(`${URL}${couponId}`, {
      method: "PUT",
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
      setError(result?.message || "Failed to update coupon");
    }
  } catch (error) {
    setError("An error occurred");
    console.log(error);
  } finally {
    setloading(false);
  }
};

export default UpdateCoupon;
