import HeaderTitle from "../../../Shared/HeaderTitle/HeaderTitle";
import book from "../../../../assets/Writer/book.png";
import withdraw from "../../../../assets/Writer/withdraw.png";
import totalamount from "../../../../assets/Writer/total-amount.png";
import earning from "../../../../assets/Writer/earning.png";
import Loader from "../../../Shared/Loader/Loader";
import useGetAllBooks from "../../../../hooks/useGetAllBooks";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { Helmet } from "react-helmet-async";
const Earning = () => {
  const [data, isLoading, error, refetch] = useGetAllBooks();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: withdrawData,
    isLoading: withdrawLoading,
    error: withdrawError,
    refetch: refetchWithdraw,
  } = useQuery({
    queryKey: ["withdraw"],
    queryFn: async () => {
      const res = await axiosSecure("/getWithdrawAmount");
      return res.data;
    },
  });
  if (isLoading || withdrawLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (withdrawError) {
    return <div>Error: {withdrawError.message}</div>;
  }

  const writerbooks = data.filter(
    (data) => data.writerEmail === user.email && data.status === "approved"
  );
  const writerTotalEarning = writerbooks.reduce((sum, val) => {
    return (sum += (val.soldUnit * val.bookPrice * val.percentage) / 100);
  }, 0);
  const bookSoldUnit = writerbooks.reduce((sum, val) => {
    return (sum += val.soldUnit);
  }, 0);

  const withdrawMoney = (money) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const withdrewalDetails = {
      name: withdrawData.name,
      email: withdrawData.email,
      BankAccount: withdrawData.bankAccount,
      Branch: withdrawData.bankDetails,
      amount: writerTotalEarning - withdrawData.withdraw,
      transactionId: uuidv4(),
      date: formattedDate,
    };

    Swal.fire({
      title: "Confirm Withdraw",
      text: "",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#B91C1C",
      cancelButtonColor: "#B85EE6",
      confirmButtonText: "Confirm ",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/updateWithdrawAmount`, { amount: money })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              axiosSecure
                .patch(`/updateWithdrawHistory`, withdrewalDetails)
                .then((res) => {
                  if (res.data.modifiedCount > 0) {
                    refetchWithdraw();
                    Swal.fire({
                      position: "top-center",
                      icon: "success",
                      title: "payment sent to your bank account successfully!",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  }
                });
            }
          });
      }
    });
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <Helmet>
          <title>Book Valley | Earning</title>
        </Helmet>
        <div className="container px-5 py-10 mx-auto">
          <HeaderTitle title="Your Earning History"></HeaderTitle>
          <div className="flex flex-wrap justify-center  my-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <img className="h-12 mx-auto" src={book} alt="" />
                <h2 className="stat-value">{bookSoldUnit}U</h2>
                <p className="stat-title">Book Sold</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <img className="h-12 mx-auto" src={earning} alt="" />
                <h2 className="stat-value">{writerTotalEarning}$</h2>
                <p className="stat-title">Total Earning</p>
              </div>
            </div>
            {/* <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <img className="h-12 mx-auto" src={totalamount} alt="" />
                <h2 className="stat-value">2.7K</h2>
                <p className="stat-title">Total Amount</p>
              </div>
            </div> */}
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <img className="h-12 mx-auto" src={withdraw} alt="" />
                <h2 className="stat-value">{withdrawData.withdraw}$</h2>
                <p className="stat-title">Total Withdraw</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center">
        <div className="stats bg-blue-600 text-primary-content">
          <div className="stat">
            <div className="stat-title">Account balance</div>
            <div className="stat-value">
              ${writerTotalEarning - withdrawData.withdraw}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Current balance</div>
            <div className="stat-value">
              ${writerTotalEarning - withdrawData.withdraw}
            </div>
            <div className="stat-actions">
              <button
                onClick={() => withdrawMoney(writerTotalEarning)}
                className="btn btn-sm"
              >
                Withdrawal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Earning;
