import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import Loader from "../../Shared/Loader/Loader";
import book from "../../../assets/Writer/book.png";
import user from "../../../assets/Dashboard/alluser.png";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { Helmet } from "react-helmet-async";
const Statistic = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getAllStatistic"],
    queryFn: async () => {
      const res = await axiosSecure(`/getAllStatistic`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const userData = [
    {
      user: "Reader",
      uv: data.userInfo.reader,
      pv: 2400,
      amt: 2400,
    },
    {
      user: "Writer",
      uv: data.userInfo.writer,
      pv: 1398,
      amt: 2210,
    },
    {
      user: "Publisher",
      uv: data.userInfo.publisher,
      pv: 9800,
      amt: 2290,
    },
  ];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div>
      <HeaderTitle title="Statistic"></HeaderTitle>
      <Helmet>
        <title>Book Valley | Statistic</title>
      </Helmet>
      <div className="grid grid-cols-1 my-10 md:grid-cols-6 gap-6 lg:grid-cols-2">
        <div className="stats  py-5 bg-blue-600 text-primary-content">
          <div className="stat">
            <div className="stat-title font-semibold text-white">
              Premimum Books
            </div>
            <div className="stat-value text-gray-800 flex">
              {data.publishedBook.premimumBook}
              <img src={book} className="h-8 mt-2" alt="" />
            </div>
          </div>
        </div>
        <div className="stats  py-5 bg-pink-400 text-primary-content">
          <div className="stat">
            <div className="stat-title font-semibold text-white">Book Sold</div>
            <div className="stat-value text-gray-800 flex">
              {data.publishedBook.booksold}
              <img src={book} className="h-8 mt-2" alt="" />
            </div>
          </div>
        </div>
        <div className="stats  py-5 bg-sky-500 text-primary-content">
          <div className="stat">
            <div className="stat-title font-semibold text-white">
              Total Earning
            </div>
            <div className="stat-value text-gray-800">
              ${data.publishedBook.totalEarning}
            </div>
          </div>
        </div>
        <div className="stats  py-5 bg-purple-500 text-primary-content">
          <div className="stat">
            <div className="stat-title font-semibold text-white">
              Blog Published
            </div>
            <div className="stat-value text-gray-800">{data.totalBlog}</div>
          </div>
        </div>
        <div className="stats  py-5 bg-blue-400 text-primary-content">
          <div className="stat">
            <div className="stat-title font-semibold text-white">
              Total User
            </div>
            <div className="stat-value text-gray-800 flex">
              {data.userInfo.writer +
                data.userInfo.reader +
                data.userInfo.publisher}
              <img src={user} className="h-8 mt-2" alt="" />
            </div>
          </div>
        </div>
        <div className="stats  py-5 bg-cyan-500 text-primary-content">
          <div className="stat">
            <div className="stat-title font-semibold text-white">
              Total Freebooks
            </div>
            <div className="stat-value text-gray-800 flex">
              {data.freeBook}
              <img src={book} className="h-8 mt-2" alt="" />
            </div>
          </div>
        </div>
      </div>
      <HeaderTitle title="User Statistics"></HeaderTitle>
      <div className="flex justify-center">
        <BarChart
          width={500}
          height={300}
          data={userData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="user" />
          <YAxis />
          <Bar
            dataKey="uv"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {userData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default Statistic;
