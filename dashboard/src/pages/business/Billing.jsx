import React, { useState, useEffect } from 'react';
import { businessService, billingService } from '../../services/api';

const Billing = () => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const data = await businessService.getBusinessDetails();
        setBusiness(data);
      } catch (error) {
        console.error('Failed to load business details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, []);

  const handleUpgrade = async (planName, price) => {
    try {
      // 1. Create order on backend
      const { order } = await billingService.createOrder({
        amount: price,
        plan: planName
      });

      if (!order) {
        alert("Failed to create order. Please try again.");
        return;
      }

      // 2. Open Razorpay Checkouts
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_dummykey12345',
        amount: order.amount,
        currency: order.currency,
        name: "GRB App",
        description: `${planName} Plan Subscription`,
        order_id: order.id,
        handler: async (response) => {
          try {
            // 3. Verify payment on backend
            await billingService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: planName
            });

            alert(`Success! You are now subscribed to the ${planName} plan.`);
            window.location.reload(); // Refresh to show new status
          } catch (err) {
            console.error("Verification failed", err);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: business?.ownerName || "",
          email: business?.email || "",
        },
        theme: {
          color: "#4F46E5", // Indigo 600
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp1.open();

    } catch (error) {
      console.error('Upgrade failed', error);
      alert('Failed to initiate upgrade process.');
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading billing information...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Billing & Subscription</h2>
        <p className="text-gray-500 mt-1">Manage your active plans and billing limits.</p>
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl p-8 text-white shadow-lg mb-10 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-1">Current Plan</p>
          <h3 className="text-4xl font-extrabold">{business?.subscriptionPlan || 'Free Trial'}</h3>
          <p className="text-gray-300 mt-2">
            Status: <span className="text-green-400 font-semibold">{business?.subscriptionStatus || 'Active'}</span>
          </p>
        </div>
        <div className="mt-6 md:mt-0 text-right">
          <p className="text-gray-400 text-sm mb-1">Renews On</p>
          <p className="font-mono text-xl">{business?.trialEndsAt ? new Date(business.trialEndsAt).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-6">Available Upgrades</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pro Plan */}
        <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
          <h4 className="text-2xl font-bold text-gray-900 mb-2">Pro Plan</h4>
          <p className="text-gray-600 text-sm mb-6 h-10">Perfect for growing restaurants needing deep analytics.</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-gray-900">₹999</span>
            <span className="text-gray-500">/year</span>
          </div>
          <ul className="space-y-3 mb-8 text-sm text-gray-700">
            <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Unlimited QR Scans</li>
            <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> WhatsApp Instant Alerts</li>
            <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> AI Reply Suggestions</li>
          </ul>
          <button
            onClick={() => handleUpgrade('Pro', 999)}
            className="w-full py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-colors border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white"
          >
            Upgrade to Pro
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <h4 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h4>
          <p className="text-gray-600 text-sm mb-6 h-10">For chains with multiple branches and teams.</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-gray-900">₹3,499</span>
            <span className="text-gray-500">/year</span>
          </div>
          <ul className="space-y-3 mb-8 text-sm text-gray-700">
            <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Everything in Pro</li>
            <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Up to 10 Brand Branches</li>
            <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Dedicated Account Manager</li>
          </ul>
          <button
            onClick={() => handleUpgrade('Enterprise', 3499)}
            className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors"
          >
            Upgrade to Enterprise
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
