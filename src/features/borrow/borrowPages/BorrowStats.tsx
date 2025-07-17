
import { useGetBorrowStatsQuery } from "../borrowApi";

const BorrowStats = () => {
  const { data: stats, isLoading, isError } = useGetBorrowStatsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError || !stats) return <p>Error loading stats</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Borrowed Books Summary</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Book Title</th>
            <th className="border p-2">ISBN</th>
            <th className="border p-2">Total Quantity Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
              <tr key={stat.isbn}>
                <td className="border p-2">{stat.title}</td>
                <td className="border p-2">{stat.isbn}</td>
                <td className="border p-2">{stat.totalQuantity}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowStats;
