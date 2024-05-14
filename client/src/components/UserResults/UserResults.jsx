import Result from "../Result/Result.jsx"; // <Result />
import { useEffect, useState } from "react"; // useEffect(), useState()
const server = import.meta.env.VITE_BACKEND_SERVER;

export default function UserResults({ input }) {
  const [loading, setLoading] = useState(false); // Loading state for component
  const [data, setData] = useState(null); // Variable to hold fetched data

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${server}users`);
        const data = await response.json();

        if (response.ok) setData(data.filter(u => u.username.search(input) !== -1));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData(); // Fetch users from back-end
  }, []);

  return (
    <>
      {(loading) ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {(data) ? (
            <div className="row">
              {(data.length === 0) && (
                <p>No users match your search.</p>
              )}
              {(data.length > 0) && (
                data.map(u => (
                  <Result
                    key={u._id}
                    type={"user"}
                    heading={u.username}
                    subheading={`${u.reviews} review${(u.reviews === 1) ? "" : "s"}`}
                    link={`/Profile/${u.username}`}
                  />
                ))
              )}
            </div>
          ) : (
            <p>Users could not be loaded.</p>
          )}
        </>
      )}
    </>
  );
}