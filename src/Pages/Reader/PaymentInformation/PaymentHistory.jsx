import useAxiosSecure from "../../../hooks/useAxiosSecure";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import Loader from "../../Shared/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getPaymentDetails"],
    queryFn: async () => {
      const res = await axiosSecure(`/getPaymentDetails`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="ml-10 mt-10">
      <Helmet>
        <title>Book Valley | Payment History</title>
      </Helmet>
      {data.length ? (
        <>
          <HeaderTitle title="Your payment details"></HeaderTitle>
          <table className="table">
            <thead>
              <tr className="text-base">
                <th className="text-base text-purple">Email</th>
                <th className="text-base text-purple">Book Copy</th>
                <th className="text-base text-purple">Price</th>
                <th className="text-base text-purple">TransactionId</th>
                <th className="text-base text-purple">Date</th>
                <th className="text-base text-purple">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((paymentDetails, index) => (
                <tr key={index} className="text-base">
                  <td className="font-bold text-base">
                    {paymentDetails.email}
                  </td>
                  <td className="font-bold text-base">
                    {paymentDetails.quantity}
                  </td>
                  <td className="font-bold text-base">
                    {paymentDetails.price}
                  </td>
                  <td className="font-bold text-base">
                    {paymentDetails.transactionId}
                  </td>
                  <td className="font-bold text-base">{paymentDetails.date}</td>
                  <td className="font-bold text-base text-green-600">
                    {paymentDetails.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <HeaderTitle title="You have no payment history"></HeaderTitle>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
