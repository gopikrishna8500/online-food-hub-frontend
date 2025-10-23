// // import { useState } from "react";
// // import { CartProvider } from "./context/CartContext";
// // import Navbar from "./components/Navbar";
// // import Hero from "./components/Hero";
// // import Features from "./components/Features";
// // import Menu from "./components/Menu";
// // import About from "./components/About";
// // import Testimonials from "./components/Testimonials";
// // import Contact from "./components/Contact";
// // import Footer from "./components/Footer";
// // import Cart from "./components/Cart";
// // import Checkout from "./components/Checkout";
// // import OrderConfirmation from "./components/OrderConfirmation";

// // // Stripe imports
// // import { Elements } from "@stripe/react-stripe-js";
// // import { loadStripe } from "@stripe/stripe-js";

// // // Load Stripe with your publishable key from environment variables
// // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// // function App() {
// //   const [isCartOpen, setIsCartOpen] = useState(false);
// //   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
// //   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
// //   const [orderId, setOrderId] = useState("");

// //   // Open checkout modal from cart
// //   const handleCheckout = () => {
// //     setIsCartOpen(false);
// //     setIsCheckoutOpen(true);
// //   };

// //   // Called when order is successfully placed
// //   const handleOrderSuccess = (newOrderId) => {
// //     setOrderId(newOrderId);        // store order ID
// //     setIsCheckoutOpen(false);      // close checkout modal
// //     setIsConfirmationOpen(true);   // open confirmation modal
// //   };

// //   // Close confirmation modal
// //   const handleConfirmationClose = () => {
// //     setIsConfirmationOpen(false);
// //     setOrderId("");
// //   };

// //   return (
// //     <CartProvider>
// //       {/* Wrap checkout with Stripe Elements */}
// //       <Elements stripe={stripePromise}>
// //         <div className="min-h-screen">
// //           <Navbar onCartClick={() => setIsCartOpen(true)} />
// //           <Hero />
// //           <Features />
// //           <Menu onAddToCartOpen={() => setIsCartOpen(true)} />
// //           <About />
// //           <Testimonials />
// //           <Contact />
// //           <Footer />

// //           {/* Cart Modal */}
// //           <Cart
// //             isOpen={isCartOpen}
// //             onClose={() => setIsCartOpen(false)}
// //             onCheckout={handleCheckout}
// //           />

// //           {/* Checkout Modal */}
// //           <Checkout
// //             isOpen={isCheckoutOpen}
// //             onClose={() => setIsCheckoutOpen(false)}
// //             onSuccess={handleOrderSuccess} // triggers confirmation modal
// //           />

// //           {/* Order Confirmation Modal */}
// //           <OrderConfirmation
// //             isOpen={isConfirmationOpen}
// //             orderId={orderId}
// //             totalAmount={getCartTotal()}
// //             onClose={handleConfirmationClose}
// //           />
// //         </div>
// //       </Elements>
// //     </CartProvider>
// //   );
// // }

// // export default App;












// import { useState } from "react";
// import { CartProvider } from "./context/CartContext";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Features from "./components/Features";
// import Menu from "./components/Menu";
// import About from "./components/About";
// import Testimonials from "./components/Testimonials";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";
// import Cart from "./components/Cart";
// import Checkout from "./components/Checkout";
// import OrderConfirmation from "./components/OrderConfirmation";

// function App() {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
//   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
//   const [orderId, setOrderId] = useState("");

//   const handleCheckout = () => {
//     setIsCartOpen(false);
//     setIsCheckoutOpen(true);
//   };

//   const handleOrderSuccess = (newOrderId) => {
//     setOrderId(newOrderId);
//     setIsCheckoutOpen(false);
//     setIsConfirmationOpen(true);
//   };

//   const handleConfirmationClose = () => {
//     setIsConfirmationOpen(false);
//     setOrderId("");
//   };

//   return (
//     <CartProvider>
//       <Navbar onCartClick={() => setIsCartOpen(true)} />
//       <Hero />
//       <Features />
//       <Menu onAddToCartOpen={() => setIsCartOpen(true)} />
//       <About />
//       <Testimonials />
//       <Contact />
//       <Footer />

//       <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleCheckout} />
//       <Checkout
//         isOpen={isCheckoutOpen}
//         onClose={() => setIsCheckoutOpen(false)}
//         onSuccess={handleOrderSuccess}
//       />
//       <OrderConfirmation
//         isOpen={isConfirmationOpen}
//         orderId={orderId}
//         onClose={handleConfirmationClose}
//       />
//     </CartProvider>
//   );
// }

// export default App;






import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Menu from "./components/Menu";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home"); // "home", "login", "signup", "account"

  // Checkout handlers
  const handleCheckout = () => {
    if (!user) {
      alert("Please login to place an order!");
      setView("login");
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrderId) => {
    setOrderId(newOrderId);
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    setOrderId("");
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setView("home");
  };

  // Navbar props
  const navbarProps = {
    onCartClick: () => setIsCartOpen(true),
    onLoginClick: () => setView("login"),
    onSignupClick: () => setView("signup"),
    onAccountClick: () => setView("account"),
    user,
    onLogout: handleLogout,
  };

  return (
    <CartProvider>
      <Navbar {...navbarProps} />

      {/* Conditional Rendering */}
      {view === "home" && (
        <>
          <Hero />
          <Features />
          <Menu onAddToCartOpen={() => setIsCartOpen(true)} />
          <About />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      )}

      {view === "login" && <LoginPage setUser={(u) => { setUser(u); setView("home"); }} />}
      {view === "signup" && <SignupPage setUser={(u) => { setUser(u); setView("home"); }} />}
      {view === "account" && user && <AccountPage user={user} />}

      {/* Cart / Checkout / Order Confirmation */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleOrderSuccess}
        user={user}
      />

      <OrderConfirmation
        isOpen={isConfirmationOpen}
        orderId={orderId}
        onClose={handleConfirmationClose}
      />
    </CartProvider>
  );
}

export default App;
