import dlete from "../../../assets/delete.png";
const AllusersTable = ({ user }) => {
  return (
    <tr className="text-base">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={user.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <img className="h-10" src={dlete} alt="" />
      </td>
    </tr>
  );
};

export default AllusersTable;
