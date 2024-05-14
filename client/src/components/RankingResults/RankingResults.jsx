import Result from "../Result/Result.jsx"; // <Result />
import { useEffect, useState } from "react"; // useEffect(), useState()
const server = import.meta.env.VITE_BACKEND_SERVER;

export default function RankingResults({ input }) {
  const [loading, setLoading] = useState(false); // Loading state for component
  const [data, setData] = useState(null); // Variable to hold fetched data
  const [mappings, setMappings] = useState([]); // List of ranking-user pairs

  // Helper function to fetch specific user
  async function fetchUser(id) {
    const response = await fetch(`${server}users/${id}`);
    const data = await response.json();
    return data;
  }

  // Helper function to match ranking ID with username
  function getValue(key) {
    for (let pair of mappings) {
      if (Object.keys(pair).includes(key)) return pair[key];
    }
  }

  // Helper function to shrink long text
  function shrink(str, size) {
    return (str.length > size) ? str.slice(0, size - 1) + "..." : str;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${server}rankings`);
        const data = await response.json();

        if (response.ok) setData(data.filter(r => r.desc.search(input) !== -1));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData(); // Fetch rankings from back-end
  }, []);

  useEffect(() => {
    async function process() {
      if (data) {
        let temp = [];
        for (let r of data) {
          const { username } = await fetchUser(r.author);
          temp.push({ [r._id]: username });
        }
        setMappings(temp);
      }
    }

    process(); // Create ranking-user pairs
  }, [data]);

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
                <p>No rankings match your search.</p>
              )}
              {(data.length > 0) && (
                data.map(r => (
                  <Result
                    key={r._id}
                    type={"ranking"}
                    heading={`"${shrink(r.desc, 20)}"`}
                    subheading={`${r.title} | ${getValue(r._id)}`}
                    link={`/Profile/${getValue(r._id)}`}
                  />
                ))
              )}
            </div>
          ) : (
            <p>Rankings could not be loaded.</p>
          )}
        </>
      )}
    </>
  );
}