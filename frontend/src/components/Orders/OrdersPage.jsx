// components/Orders/OrdersPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaShoppingBag, 
  FaTimes, 
  FaMapMarkerAlt, 
  FaCreditCard,
  FaCalendarAlt,
  FaReceipt,
  FaTrash,
  FaExclamationTriangle
} from "react-icons/fa";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [clearing, setClearing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await fetch(`http://localhost:5000/api/orders/user/${user.id}`);
        if (res.ok) {
          const ordersData = await res.json();
          setOrders(ordersData);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchOrderDetails = async (orderId) => {
    setDetailsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      if (res.ok) {
        const orderData = await res.json();
        setOrderDetails(orderData);
        setSelectedOrder(orderId);
      } else {
        alert("Failed to fetch order details");
      }
    } catch (err) {
      console.error("Error fetching order details:", err);
      alert("Error fetching order details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setOrderDetails(null);
  };

  const clearOldOrders = async () => {
    setClearing(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      // Get orders older than 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      console.log("🗑️ Clearing old orders locally...");
      console.log("📅 30 days ago:", thirtyDaysAgo.toISOString());
      
      const oldOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at);
        const isOld = orderDate < thirtyDaysAgo && 
                     (order.status === 'delivered' || order.status === 'cancelled');
        console.log(`Order ${order.id}:`, {
          date: order.created_at,
          status: order.status,
          isOld: isOld
        });
        return isOld;
      });

      console.log("📊 Old orders found:", oldOrders.length);

      if (oldOrders.length === 0) {
        alert("No old orders to clear. Orders are automatically cleared after 30 days if they are delivered or cancelled.");
        setShowClearConfirm(false);
        setClearing(false);
        return;
      }

      // Update local state by removing cleared orders (client-side only)
      const updatedOrders = orders.filter(order => 
        !oldOrders.some(oldOrder => oldOrder.id === order.id)
      );
      
      setOrders(updatedOrders);
      setShowClearConfirm(false);
      
      if (selectedOrder && oldOrders.some(order => order.id === selectedOrder)) {
        closeOrderDetails();
      }
      
      // Store the filtered orders in localStorage for persistence
      localStorage.setItem(`user_${user.id}_orders`, JSON.stringify(updatedOrders));
      
      console.log("✅ Successfully cleared", oldOrders.length, "old orders from view");
      alert(`Successfully cleared ${oldOrders.length} old orders from view`);

    } catch (err) {
      console.error("❌ Error clearing old orders:", err);
      alert("Error clearing old orders: " + err.message);
    } finally {
      setClearing(false);
    }
  };

  const getOldOrdersCount = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const oldOrdersCount = orders.filter(order => 
      new Date(order.created_at) < thirtyDaysAgo && 
      (order.status === 'delivered' || order.status === 'cancelled')
    ).length;

    console.log("📊 Old orders count:", oldOrdersCount);
    return oldOrdersCount;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      confirmed: "bg-blue-100 text-blue-800 border-blue-200",
      preparing: "bg-orange-100 text-orange-800 border-orange-200",
      out_for_delivery: "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: "Pending",
      confirmed: "Confirmed",
      preparing: "Preparing",
      out_for_delivery: "Out for Delivery",
      delivered: "Delivered",
      cancelled: "Cancelled"
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOrderOld = (orderDate) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(orderDate) < thirtyDaysAgo;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-10 w-full">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition duration-200 hover:scale-105"
          >
            <FaArrowLeft />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <div className="w-20"></div>
        </div>

        {/* Clear Old Orders Button */}
        {orders.length > 0 && (
          <div className="mb-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {orders.length} order{orders.length !== 1 ? 's' : ''}
              {getOldOrdersCount() > 0 && (
                <span className="ml-2 text-orange-600 font-medium">
                  ({getOldOrdersCount()} old orders can be cleared)
                </span>
              )}
            </div>
            <button
              onClick={() => setShowClearConfirm(true)}
              disabled={getOldOrdersCount() === 0}
              className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              <FaTrash />
              Clear Old Orders
            </button>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
            <button
              onClick={() => navigate("/menu")}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition duration-200 hover:scale-105"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className={`border rounded-xl p-4 hover:shadow-md transition duration-200 ${
                        isOrderOld(order.created_at) 
                          ? 'border-orange-200 bg-orange-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg text-gray-800">{order.order_number}</h3>
                            {isOrderOld(order.created_at) && (
                              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full border border-orange-200 font-medium">
                                Old
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <FaCalendarAlt className="text-gray-400" />
                              <span>{formatDate(order.created_at)}</span>
                            </div>
                            <span>•</span>
                            <span>{order.item_count} {order.item_count === 1 ? 'item' : 'items'}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">Rs {parseFloat(order.total_amount).toFixed(2)}</span>
                        <button 
                          onClick={() => fetchOrderDetails(order.id)}
                          className="text-primary hover:text-primary/80 font-medium transition duration-200 hover:scale-105 flex items-center gap-2"
                        >
                          <FaReceipt />
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Details Sidebar */}
            <div className="lg:col-span-1">
              {selectedOrder && (
                <div className="bg-white rounded-2xl shadow-lg sticky top-24">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
                      <button
                        onClick={closeOrderDetails}
                        className="text-gray-400 hover:text-gray-600 transition duration-200 hover:scale-110"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>

                  {detailsLoading ? (
                    <div className="p-8 text-center">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading details...</p>
                    </div>
                  ) : orderDetails ? (
                    <div className="p-6 space-y-6">
                      {/* Order Summary */}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Order Number:</span>
                            <span className="font-medium">{orderDetails.order.order_number}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium">{formatDate(orderDetails.order.created_at)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(orderDetails.order.status)}`}>
                              {getStatusText(orderDetails.order.status)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Items</h3>
                        <div className="space-y-3">
                          {orderDetails.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              {item.img && (
                                <img
                                  src={item.img}
                                  alt={item.product_name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">{item.product_name}</p>
                                <p className="text-sm text-gray-600">
                                  Rs {parseFloat(item.product_price).toFixed(2)} × {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">Rs {parseFloat(item.item_total).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Address */}
                      {orderDetails.order.delivery_address && (
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-blue-500" />
                            Delivery Address
                          </h3>
                          <div className="bg-gray-50 rounded-lg p-3 text-sm">
                            {(() => {
                              const address = typeof orderDetails.order.delivery_address === 'string' 
                                ? JSON.parse(orderDetails.order.delivery_address)
                                : orderDetails.order.delivery_address;
                              
                              return (
                                <>
                                  <p className="font-medium">{address.address_line1}</p>
                                  {address.address_line2 && <p className="text-gray-600">{address.address_line2}</p>}
                                  <p className="text-gray-600">
                                    {address.city}, {address.state} {address.zip_code}
                                  </p>
                                  <p className="text-gray-600">{address.country}</p>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      )}

                      {/* Payment Information */}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <FaCreditCard className="text-green-500" />
                          Payment Information
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-3 text-sm">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Method:</span>
                            <span className="font-medium capitalize">{orderDetails.order.payment_method}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              orderDetails.order.payment_status === 'paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {orderDetails.order.payment_status === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Total */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-lg font-bold text-gray-900">
                            <span>Total Amount</span>
                            <span>Rs {parseFloat(orderDetails.order.total_amount).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <FaShoppingBag className="text-4xl text-gray-300 mx-auto mb-3" />
                      <p>Unable to load order details</p>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State for Details */}
              {!selectedOrder && (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <FaReceipt className="text-4xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Order Details</h3>
                  <p className="text-gray-500 text-sm">
                    Select an order from the list to view its details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Clear Old Orders Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scaleIn">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaExclamationTriangle className="text-orange-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Clear Old Orders</h3>
                  <p className="text-sm text-gray-600">
                    This will remove {getOldOrdersCount()} orders older than 30 days that are delivered or cancelled.
                  </p>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-orange-800">
                  <strong>Note:</strong> This action only removes orders from your view. They will reappear when you refresh the page.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-200 hover:scale-105"
                  disabled={clearing}
                >
                  Cancel
                </button>
                <button
                  onClick={clearOldOrders}
                  disabled={clearing}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-200 flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50"
                >
                  {clearing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Clearing...
                    </>
                  ) : (
                    <>
                      <FaTrash />
                      Clear Orders
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;