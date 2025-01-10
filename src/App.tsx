import { useEffect,useState } from "react";
import Scrollyteller from "./components/Scrollyteller";
import ScrollyTellerItem, { ScrollyTellerItemProps } from "./components/ScrollyTellerItem";

function App() {

  const [scrollyItems, setScrollyItems] = useState<ScrollyTellerItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScrollyItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/scrollyItems');
        if (!response.ok) throw new Error('Failed to fetch scrolly items');
        const data = await response.json();
        setScrollyItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchScrollyItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <Scrollyteller scrollyItems={scrollyItems} />
      </div>
    </>
  );
}

export default App;
