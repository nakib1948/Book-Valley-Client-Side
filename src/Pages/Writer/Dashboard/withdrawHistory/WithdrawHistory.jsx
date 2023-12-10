import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Shared/Loader/Loader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import HeaderTitle from "../../../Shared/HeaderTitle/HeaderTitle";

const WithdrawHistory = () => {

    const [axiosSecure] = useAxiosSecure();
    const {
      data,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ["withdrawHistory"],
      queryFn: async () => {
        const res = await axiosSecure("/getWithdrawAmount");
        return res.data;
      },
    });
    if (isLoading ) {
      return <Loader />;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
        <div className="ml-10 mt-10">
      {data ? (
        <>
          <HeaderTitle title="Your withdraw details"></HeaderTitle>
          <table className="table mt-5">
            <thead>
              <tr className="text-base">
                <th className="text-base text-purple">Name</th>
                <th className="text-base text-purple">Email</th>
                <th className="text-base text-purple">Bank Account</th>
                <th className="text-base text-purple">Bank Details</th>
                <th className="text-base text-purple">Amount</th>
                <th className="text-base text-purple">TransactionId</th>
                <th className="text-base text-purple">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.withdrawHistory.map((withdrawDetails, index) => (
                <tr key={index} className="text-base">
                  <td className="font-bold text-base">
                    {withdrawDetails.name}
                  </td>
                  <td className="font-bold text-base">
                    {withdrawDetails.email}
                  </td>
                  <td className="font-bold text-base">
                    {withdrawDetails.BankAccount}
                  </td>
                  <td className="font-bold text-base">
                    {withdrawDetails.Branch}
                  </td>
                  <td className="font-bold text-base">
                    {withdrawDetails.amount}<span className="font-bold">$</span>
                  </td>
                  <td className="font-bold text-base">
                    {withdrawDetails.transactionId}
                  </td>
                  <td className="font-bold text-base">{withdrawDetails.date}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <HeaderTitle title="You have no withdrawn history"></HeaderTitle>
        </div>
      )}
    </div>
    );
};

export default WithdrawHistory;