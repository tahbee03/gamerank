import { useLocation } from "react-router-dom"; // useLocation()
import Navbar from "../../components/Navbar/Navbar"; // <Navbar />
import UserResults from "../../components/UserResults/UserResults"; // <UserResults />
import RankingResults from "../../components/RankingResults/RankingResults"; // <RankingResults />
import GameResults from "../../components/GameResults/GameResults"; // <GameResults />

export default function SearchPage() {
  const { search } = useLocation(); // Grab query parameters from URL
  const input = new URLSearchParams(search).get("input"); // Parse query parameter value(s)

  return (
    <>
      <Navbar />
      {(input) ? (
        <div className="container">
          <p>Search results for "{input}":</p>
          <h2>Users</h2>
          <UserResults input={input} />
          <hr />
          <h2>Rankings</h2>
          <RankingResults input={input} />
          <hr />
          <h2>Games</h2>
          <GameResults input={input} />
        </div>
      ) : (
        <p>No search input has been entered.</p>
      )}
    </>
  );
}