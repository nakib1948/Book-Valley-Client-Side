import React from "react";
import dlete from "../../../assets/delete.png";
import { useContext } from "react";
import { pdfContext } from "../../../Providers/PdfLinkProvider";
import preview from "../../../assets/admin/preview.png";
import approve from "../../../assets/admin/approve.png";
import { useNavigate } from "react-router-dom";

const BookRequestTable = ({ request }) => {
  const [booklink, setBookLink] = useContext(pdfContext);
  const navigate = useNavigate()
  const bookPreview = async(link)=>{
     await setBookLink(link);
     navigate("/pdfreader")
  }
  return (
    <tr className="text-base">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={request.bookCoverPhoto}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
        </div>
      </td>
      <td>{request.name}</td>
      <td>{request.writerName}</td>
      <td>{request.publisherName}</td>
      <td className="font-bold">{request.percentage}%</td>
      <td className="lg:tooltip" data-tip="Preview">
        <img onClick={()=>{bookPreview(request.agreement)}} className="h-10 btn btn-square" src={preview} alt="" />
        </td>
      <td><img onClick={()=>{bookPreview(request.bookCopy)}} className="h-10 btn btn-square" src={preview} alt="" /></td>
      <td>
        <div className="flex">
          
          <img className="h-10 btn btn-circle" src={approve} alt="" />
          <img className="h-10 btn btn-circle" src={dlete} alt="" />
        </div>
      </td>
    </tr>
  );
};

export default BookRequestTable;
