import useGetAllBooks from "../../../hooks/useGetAllBooks";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import Loader from "../../Shared/Loader/Loader";
import BookRequestTable from "./BookRequestTable";
import { Helmet } from "react-helmet-async";
const BookRequest = () => {
  const [data, isLoading, error, refetch] = useGetAllBooks();
  if (isLoading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-10">
      <Helmet>
        <title>Book Valley | Book Request</title>
      </Helmet>
      <HeaderTitle title="Book request from Publishers"></HeaderTitle>
      <div className="overflow-x-auto w-full mt-10 card-body bg-slate-50 rounded-xl">
        <table className="table">
          <thead>
            <tr className="text-base">
              <th className="text-base text-purple">Book Image</th>
              <th className="text-base text-purple">Book Name</th>
              <th className="text-base text-purple">Writer</th>
              <th className="text-base text-purple">Publisher</th>
              <th className="text-base text-purple">Author Commission</th>
              <th className="text-base text-purple">Agreement Paper</th>
              <th className="text-base text-purple">Book Copy</th>
              <th className="text-base text-purple">Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((data) => data.writerApproval === "approved")
              .reverse()
              .map((data, index) => (
                <BookRequestTable
                  refetch={refetch}
                  request={data}
                  key={index}
                ></BookRequestTable>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookRequest;
