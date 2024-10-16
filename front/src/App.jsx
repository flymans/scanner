import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './styles/App.css';
import './styles/Spinner.css'


function App() {
  const [qrValue, setQrValue] = useState(null);

  useEffect(() => {
    const fetchActiveQrCode = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/api/qrcodes/active`);
        if (response.status === 404) {
          setQrValue(null);
          return;
        }
        const qrData = await response.json();
        const value = `${qrData.value}/${qrData.id}`;
        setQrValue(value);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActiveQrCode();
  }, []);

  return (
    <div className='app-container'>
      {qrValue
        ? <QRCodeSVG value={qrValue} size={256} />
        : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
    </div>
  );
}

export default App;