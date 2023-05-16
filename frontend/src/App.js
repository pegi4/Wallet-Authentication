import { useState, useEffect } from 'react';
import { configureChains, WagmiConfig, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet } from 'wagmi/chains';
import axios from 'axios';

import Signin from './signin';
import User from './user';

const {
  publicClient,
  webSocketPublicClient
} = configureChains([mainnet], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient
});

function App() {
  const [session, setSession] = useState(null);

  // Check if user is authenticated when the app loads
  useEffect(() => {
    axios(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {
      withCredentials: true,
    })
      .then(({ data }) => {
        setSession(data);
      })
      .catch((err) => {
        setSession(null);
      });
  }, []);

  return (
    <WagmiConfig config={config}>
      {session ? (
        <User session={session} onLogout={() => setSession(null)} />
      ) : (
        <Signin onLogin={setSession} />
      )}
    </WagmiConfig>
  );
}

export default App;
