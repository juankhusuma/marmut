export default function RoyaltyPage() {
  const f = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  return (
    <div className="p-10 flex justify-center">
      <div className="">
        <table className="table">
          <thead>
            <tr>
              <td>Judul Lagu</td>
              <td>Judul Album</td>
              <td>Total Play</td>
              <td>Total Download</td>
              <td>Total Royalti Didapat</td>
            </tr>
          </thead>
          <tbody>
            {new Array(50).fill(null).map((_, index) => (
              <tr key={index} className="hover">
                <td>Lagu {index + 1}</td>
                <td>Album {index + 1}</td>
                <td className="text-center">{Math.floor(Math.random() * 100)}</td>
                <td className="text-center">{Math.floor(Math.random() * 50)}</td>
                <td>{f.format(Math.floor(Math.random() * 1000000) + 100000)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}