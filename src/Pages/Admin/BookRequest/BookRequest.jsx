import useGetAllBooks from "../../../hooks/useGetAllBooks";
import Loader from "../../Shared/Loader/Loader";
import BookRequestTable from "./BookRequestTable";

const BookRequest = () => {
  const [data, isLoading, error, refetch] = useGetAllBooks();
  if (isLoading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(data);
  return (
    <div className="overflow-x-auto w-full card-body bg-slate-50 rounded-xl">
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
            {
                data.filter(data=> data.writerApproval === "approved")
                .map((data,index)=><BookRequestTable refetch={refetch} request={data} key={index}></BookRequestTable>)
            }
        </tbody>
      </table>
    </div>
  );
};

export default BookRequest;
