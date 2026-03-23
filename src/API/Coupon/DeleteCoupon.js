const URL = "https://jawad-gbvq.onrender.com/api/v1/coupon/delete/";

const DeleteCoupon = async (setLoading, setError, couponId, onSuccess) => {
  setLoading(true);
  const token = localStorage.getItem("jawadToken");

  try {
    const response = await fetch(`${URL}${couponId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `jawJQ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      setError(null);
      onSuccess?.(result);
    } else {
      setError(result?.message || "Failed to delete coupon");
    }
  } catch (error) {
    setError("An error occurred");
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export default DeleteCoupon;
