import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { configureChains, WagmiConfig, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet } from "wagmi/chains";

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

const router = createBrowserRouter([
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/user',
    element: <User />,
  },
]);

function App() {
  return (
    <WagmiConfig config={config}>
      <RouterProvider router={router} />
    </WagmiConfig>
  );
}

export default App;
