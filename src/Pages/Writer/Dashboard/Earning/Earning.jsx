import HeaderTitle from "../../../Shared/HeaderTitle/HeaderTitle";
import book from "../../../../assets/Writer/book.png";
import withdraw from "../../../../assets/Writer/withdraw.png";
import totalamount from "../../../../assets/Writer/total-amount.png";
import earning from "../../../../assets/Writer/earning.png";
import Loader from "../../../Shared/Loader/Loader";
import useGetAllBooks from "../../../../hooks/useGetAllBooks";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";

const Earning = () => {
  const [data, isLoading, error, refetch] = useGetAllBooks();
  const { user } = useContext(AuthContext);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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

  console.log(writerTotalEarning, bookSoldUnit);

  return (
    <>
      <section className="text-gray-600 body-font">
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
                <h2 className="stat-value">2.7$</h2>
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
            <div className="stat-value">$89,400</div>
          </div>

          <div className="stat">
            <div className="stat-title">Current balance</div>
            <div className="stat-value">$89,400</div>
            <div className="stat-actions">
              <button className="btn btn-sm">Withdrawal</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Earning;
