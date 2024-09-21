import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Button, Input } from "components/commons";

const Signup = ({
  handleSubmit,
  setName,
  setEmail,
  setPassword,
  loading,
  setPasswordConfirmation,
  setOrganizationId,
}) => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState("");

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/organizations");
        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        logger.error("Error fetching organizations:", error);
      }
    };
    fetchOrganizations();
  }, []);

  const handleOrganizationChange = event => {
    const orgId = event.target.value;
    setSelectedOrganization(orgId);
    setOrganizationId(orgId);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50
      px-4 py-12 sm:px-6 lg:px-8 "
    >
      <div className="w-full max-w-md">
        <h2
          className="mt-6 text-center text-3xl font-extrabold
          leading-9 text-gray-700"
        >
          Sign Up
        </h2>
        <div className="text-center">
          <Link
            className="focus:outline-none font-medium focus:underline"
            to="/"
          >
            Or Login Now
          </Link>
        </div>
        <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input
            label="Name"
            placeholder="Oliver"
            onChange={e => setName(e.target.value)}
          />
          <Input
            label="Email"
            placeholder="oliver@example.com"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            placeholder="********"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            label="Password Confirmation"
            placeholder="********"
            type="password"
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="organization"
          >
            Organization
          </label>
          <select
            required
            className="focus:outline-none mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="organization"
            name="organization"
            value={selectedOrganization}
            onChange={handleOrganizationChange}
          >
            <option value="">Select your organization</option>
            {organizations.map(org => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
          <Button buttonText="Register" loading={loading} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
