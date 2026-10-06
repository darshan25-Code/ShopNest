
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga4";

ReactGA.initialize("G-7SG5129P0Y");

// Matomo Analytics
window._paq = window._paq || [];
window._paq.push(["trackPageView"]);
window._paq.push(["enableLinkTracking"]);

(function () {
  const u = "https://shopnestrhovercelapp.matomo.cloud/";
  window._paq.push(["setTrackerUrl", u + "matomo.php"]);
  window._paq.push(["setSiteId", "1"]);

  const d = document;
  const g = d.createElement("script");
  const s = d.getElementsByTagName("script")[0];

  g.async = true;
  g.src = "https://cdn.matomo.cloud/shopnestrhovercelapp.matomo.cloud/matomo.js";
  s.parentNode.insertBefore(g, s);
})();

createRoot(document.getElementById('root')).render(
 <StrictMode>
    <AuthProvider>
  <CartProvider>
    <App />
  <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="dark"
/>
  </CartProvider>
</AuthProvider>
  </StrictMode>
)
