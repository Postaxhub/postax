import React, { useState } from "react";
import "./CRMLeadProcess.css";

function CRMLeadProcess() {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please enter name and email");
      return;
    }
    setLeads([...leads, { ...formData, id: Date.now() }]);
    setFormData({ name: "", email: "", phone: "", status: "New" });
  };

  const updateStatus = (id, newStatus) => {
    setLeads(
      leads.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    );
  };

  const deleteLead = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  return (
    <div className="crm-container">
      <h2 className="crm-title">CRM Lead Management</h2>

      <form className="crm-form" onSubmit={handleAddLead}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="crm-input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="crm-input"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="crm-input"
        />
        <button type="submit" className="crm-btn">
          Add Lead
        </button>
      </form>

      <h3 className="leads-heading">Leads List</h3>

      {leads.length === 0 ? (
        <p className="no-leads">No leads added yet.</p>
      ) : (
        <table className="crm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="lead-row">
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone || "-"}</td>
                <td>
                  <span
                    className={`status-badge status-${lead.status.toLowerCase()}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td>
                  {lead.status !== "Contacted" && (
                    <button
                      className="action-btn contact-btn"
                      onClick={() => updateStatus(lead.id, "Contacted")}
                    >
                      Mark Contacted
                    </button>
                  )}
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteLead(lead.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CRMLeadProcess;
