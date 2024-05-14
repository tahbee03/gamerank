import Result from "../Result/Result.jsx"; // <Result />
import { useEffect, useState } from "react"; // useEffect(), useState()
const api = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_API_KEY;

export default function GameResults({ input }) {
  const [loading, setLoading] = useState(false); // Loading state for component
  const [data, setData] = useState(null); // Variable to hold fetched data

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${api}games?key=${key}&search=${input}`);
        const data = await response.json();

        if (response.ok) setData(data.results.slice(0, 10)); // Return the top ten results
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData(); // Fetch games from API
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
                <p>No games match your search.</p>
              )}
              {(data.length > 0) && (
                data.map(g => (
                  <Result
                    key={g.id}
                    type={"game"}
                    heading={g.name}
                    subheading={`[${g.id}]`}
                    link={`/Games/${g.id}`}
                  />
                ))
              )}
            </div>
          ) : (
            <p>Games could not be loaded.</p>
          )}
        </>
      )}
    </>
  );
}