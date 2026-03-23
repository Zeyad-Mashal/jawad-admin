import React, { useEffect, useMemo, useState } from "react";
import "./Coupons.css";
import CreateCoupon from "../../API/Coupon/CreateCoupon";
import UpdateCoupon from "../../API/Coupon/UpdateCoupon";
import GetCouponByOwner from "../../API/Coupon/GetCouponByOwner";
import ToggleCouponStatus from "../../API/Coupon/ToggleCouponStatus";
import DeleteCoupon from "../../API/Coupon/DeleteCoupon";

const STABLE_URL = "https://jawad-gbvq.onrender.com/api/v1/stable/get?page=1";
const PHOTOGRAPHER_URL =
  "https://jawad-gbvq.onrender.com/api/v1/photographer/get?page=1";
const SCHOOL_URL = "https://jawad-gbvq.onrender.com/api/v1/school/get?page=1";

const defaultForm = {
  type: "stable",
  coupon: "",
  discount: "",
  startingDate: "",
  expiryDate: "",
};

const Coupons = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [switchLoadingId, setSwitchLoadingId] = useState(null);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [tableTypeFilter, setTableTypeFilter] = useState("stable");

  const [createForm, setCreateForm] = useState(defaultForm);
  const [editForm, setEditForm] = useState(defaultForm);
  const [editingCouponId, setEditingCouponId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDeleteCoupon, setSelectedDeleteCoupon] = useState(null);

  useEffect(() => {
    getAllCoupons(tableTypeFilter);
  }, [tableTypeFilter]);

  const authHeaders = useMemo(() => {
    const lang = localStorage.getItem("lang") || "ar";
    return {
      "Content-Type": "application/json",
      "accept-language": lang,
      "x-is-dashboard": "true",
    };
  }, []);

  const normalizeDate = (value) => {
    if (!value) return "";
    return String(value).slice(0, 10);
  };

  const extractCouponListPayload = (apiResult) => {
    if (!apiResult || typeof apiResult !== "object") return [];

    if (Array.isArray(apiResult?.allCoupons)) return apiResult.allCoupons;
    if (Array.isArray(apiResult?.coupons)) return apiResult.coupons;

    if (apiResult?.coupon && typeof apiResult.coupon === "object") {
      return [apiResult.coupon];
    }
    if (apiResult?.data && typeof apiResult.data === "object") return [apiResult.data];
    if (apiResult?.result && typeof apiResult.result === "object") return [apiResult.result];
    if (apiResult?.coupon && typeof apiResult.coupon === "string") return [apiResult];

    return [];
  };

  const normalizeEntityCoupons = async (arr, type) => {
    if (!Array.isArray(arr)) return [];

    const couponsPerEntity = await Promise.all(
      arr.map(async (entity) => {
        if (!entity?._id) return null;

        const couponResponse = await GetCouponByOwner(entity._id, type);
        const couponsList = extractCouponListPayload(couponResponse);
        if (!couponsList.length) return null;

        const ownerName =
          entity?.name?.ar || entity?.name?.en || entity?.email || "N/A";

        return couponsList
          .map((coupon) => {
            if (!coupon?.coupon) return null;

            const couponId = coupon?._id || coupon?.id || null;
            return {
              couponId,
              ownerId: entity?._id,
              ownerName,
              type,
              isDisabled: Boolean(
                coupon?.disable ??
                  coupon?.isDisabled ??
                  coupon?.disabled ??
                  coupon?.isActive === false
              ),
              coupon: coupon?.coupon || "",
              discount:
                coupon?.discount === 0 || coupon?.discount
                  ? String(coupon.discount)
                  : "",
              startingDate: normalizeDate(coupon?.startingDate),
              expiryDate: normalizeDate(coupon?.expiryDate),
            };
          })
          .filter(Boolean);
      })
    );

    return couponsPerEntity.flat().filter(Boolean);
  };

  const getEntitiesByType = async (type) => {
    const endpointMap = {
      stable: STABLE_URL,
      photographer: PHOTOGRAPHER_URL,
      school: SCHOOL_URL,
    };

    const response = await fetch(endpointMap[type], {
      method: "GET",
      headers: authHeaders,
    });
    const json = await response.json();

    if (type === "stable") return json?.stables || [];
    if (type === "photographer") return json?.photographers || [];
    return json?.schools || [];
  };

  const getAllCoupons = async (typeFilter = "stable") => {
    setLoading(true);
    setError(null);
    try {
      const entities = await getEntitiesByType(typeFilter);
      const filteredCoupons = await normalizeEntityCoupons(entities, typeFilter);
      setItems(filteredCoupons);
    } catch (err) {
      setError("Failed to load coupons");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onCreateChange = (field, value) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  };

  const onEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormInvalid = (form) =>
    !form.type ||
    !form.coupon.trim() ||
    !form.discount.toString().trim() ||
    !form.startingDate ||
    !form.expiryDate;

  const handleCreateCoupon = () => {
    if (isFormInvalid(createForm)) {
      setError("Please fill all create coupon fields");
      return;
    }

    const payload = {
      coupon: createForm.coupon.trim(),
      discount: Number(createForm.discount),
      startingDate: createForm.startingDate,
      expiryDate: createForm.expiryDate,
    };

    CreateCoupon(
      setSaving,
      setError,
      createForm.type,
      payload,
      () => {
        setCreateForm(defaultForm);
        getAllCoupons(tableTypeFilter);
      }
    );
  };

  const startEdit = (row) => {
    if (!row.couponId) {
      setError("Coupon id is missing for this row");
      return;
    }
    setEditingCouponId(row.couponId);
    setEditForm({
      type: row.type,
      coupon: row.coupon || "",
      discount: row.discount || "",
      startingDate: row.startingDate || "",
      expiryDate: row.expiryDate || "",
    });
    setError(null);
  };

  const cancelEdit = () => {
    setEditingCouponId(null);
    setEditForm(defaultForm);
  };

  const handleUpdateCoupon = () => {
    if (!editingCouponId) return;

    if (isFormInvalid(editForm)) {
      setError("Please fill all update coupon fields");
      return;
    }

    const payload = {
      coupon: editForm.coupon.trim(),
      discount: Number(editForm.discount),
      startingDate: editForm.startingDate,
      expiryDate: editForm.expiryDate,
    };

    UpdateCoupon(setSaving, setError, editingCouponId, payload, () => {
      cancelEdit();
      getAllCoupons(tableTypeFilter);
    });
  };

  const handleToggleCoupon = (couponId) => {
    if (!couponId) return;

    setSwitchLoadingId(couponId);
    ToggleCouponStatus(setSaving, setError, couponId, () => {
      getAllCoupons(tableTypeFilter);
    }).finally(() => {
      setSwitchLoadingId(null);
    });
  };

  const openDeleteModal = (row) => {
    if (!row?.couponId) return;
    setSelectedDeleteCoupon(row);
    setDeleteModalOpen(true);
    setError(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDeleteCoupon(null);
  };

  const confirmDeleteCoupon = () => {
    if (!selectedDeleteCoupon?.couponId) return;

    DeleteCoupon(setSaving, setError, selectedDeleteCoupon.couponId, () => {
      closeDeleteModal();
      getAllCoupons(tableTypeFilter);
    });
  };

  return (
    <div className="coupons_page">
      <div className="coupons_container">
        <div className="coupons_header">
          <h1>Coupons</h1>
          <p>Add and update coupons for stable, photographer, and school.</p>
        </div>

        <div className="coupons_form">
          <h3>Add Coupon</h3>
          <div className="coupons_form_grid">
            <select
              value={createForm.type}
              onChange={(e) => onCreateChange("type", e.target.value)}
            >
              <option value="stable">stable</option>
              <option value="photographer">photographer</option>
              <option value="school">school</option>
            </select>
            <input
              type="text"
              placeholder="Coupon code"
              value={createForm.coupon}
              onChange={(e) => onCreateChange("coupon", e.target.value)}
            />
            <input
              type="number"
              placeholder="Discount (%)"
              value={createForm.discount}
              onChange={(e) => onCreateChange("discount", e.target.value)}
            />
            <input
              type="date"
              value={createForm.startingDate}
              onChange={(e) => onCreateChange("startingDate", e.target.value)}
            />
            <input
              type="date"
              value={createForm.expiryDate}
              onChange={(e) => onCreateChange("expiryDate", e.target.value)}
            />
            <button
              onClick={handleCreateCoupon}
              disabled={saving || isFormInvalid(createForm)}
            >
              {saving ? "Saving..." : "Add Coupon"}
            </button>
          </div>
        </div>

        {error && <div className="coupons_error">{error}</div>}

        <div className="coupons_table_wrapper">
          <div className="coupons_table_filter">
            <label htmlFor="coupons-type-filter">Filter by type:</label>
            <select
              id="coupons-type-filter"
              value={tableTypeFilter}
              onChange={(e) => setTableTypeFilter(e.target.value)}
            >
              <option value="stable">stable</option>
              <option value="photographer">photographer</option>
              <option value="school">school</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Owner</th>
                <th>Coupon</th>
                <th>Discount</th>
                <th>Start</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="coupons_empty">
                    Loading coupons...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="8" className="coupons_empty">
                    No coupons found
                  </td>
                </tr>
              ) : (
                items.map((row, idx) => (
                  <tr key={`${row.couponId || row.ownerId}-${idx}`}>
                    <td>{row.type}</td>
                    <td>{row.ownerName}</td>
                    <td>{row.coupon}</td>
                    <td>{row.discount}%</td>
                    <td>{row.startingDate}</td>
                    <td>{row.expiryDate}</td>
                    <td>
                      <button
                        type="button"
                        className={`status_switch ${row.isDisabled ? "off" : "on"}`}
                        onClick={() => handleToggleCoupon(row.couponId)}
                        disabled={!row.couponId || switchLoadingId === row.couponId}
                      >
                        <span className="status_switch_thumb" />
                        <span className="status_switch_label">
                          {switchLoadingId === row.couponId
                            ? "..."
                            : row.isDisabled
                            ? "Disabled"
                            : "Enabled"}
                        </span>
                      </button>
                    </td>
                    <td>
                      <div className="actions_group">
                        <button
                          className="edit_btn"
                          onClick={() => startEdit(row)}
                          disabled={!row.couponId}
                        >
                          Edit
                        </button>
                        <button
                          className="delete_btn"
                          onClick={() => openDeleteModal(row)}
                          disabled={!row.couponId}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {editingCouponId && (
          <div className="edit_coupon_card">
            <h3>Update Coupon</h3>
            <div className="coupons_form_grid">
              <select value={editForm.type} disabled>
                <option value="stable">stable</option>
                <option value="photographer">photographer</option>
                <option value="school">school</option>
              </select>
              <input
                type="text"
                placeholder="Coupon code"
                value={editForm.coupon}
                onChange={(e) => onEditChange("coupon", e.target.value)}
              />
              <input
                type="number"
                placeholder="Discount (%)"
                value={editForm.discount}
                onChange={(e) => onEditChange("discount", e.target.value)}
              />
              <input
                type="date"
                value={editForm.startingDate}
                onChange={(e) => onEditChange("startingDate", e.target.value)}
              />
              <input
                type="date"
                value={editForm.expiryDate}
                onChange={(e) => onEditChange("expiryDate", e.target.value)}
              />
              <div className="edit_actions">
                <button
                  onClick={handleUpdateCoupon}
                  disabled={saving || isFormInvalid(editForm)}
                >
                  {saving ? "Saving..." : "Update Coupon"}
                </button>
                <button className="cancel_btn" onClick={cancelEdit} disabled={saving}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteModalOpen && (
          <div className="coupon_modal_overlay" onClick={closeDeleteModal}>
            <div className="coupon_modal" onClick={(e) => e.stopPropagation()}>
              <h3>Delete Coupon</h3>
              <p>
                Are you sure you want to delete coupon{" "}
                <strong>{selectedDeleteCoupon?.coupon || ""}</strong>?
              </p>
              <div className="coupon_modal_actions">
                <button
                  className="delete_btn"
                  onClick={confirmDeleteCoupon}
                  disabled={saving}
                >
                  {saving ? "Deleting..." : "Yes, delete"}
                </button>
                <button className="cancel_btn" onClick={closeDeleteModal} disabled={saving}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupons;
