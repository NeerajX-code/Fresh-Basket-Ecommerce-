import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadproducts } from '../store/reducers/productSlice'
import { asyncLoadProduct } from '../store/actions/productActions'
import CartControl from '../components/CartControl';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from '../utils/axios'

const Products = () => {
  let navigate = useNavigate();
  // let products = useSelector((state) => state.productReducer.products);
  let user = useSelector((state) => state.user.user);
  let dispatch = useDispatch();
  let products = useSelector((state) => state.productReducer.products);

  const [hasMore, sethasMore] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/products?_limit=6&_start=${products.length}`);
      if (data && data.length > 0) {
        sethasMore(true);
        dispatch(loadproducts([...products, ...data]));
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  const searchHandler = (input) => {
    const keyword = input.toLowerCase().trim();

    if (keyword === "") {
      dispatch(asyncLoadProduct());
      return;
    }

    const filtered = products?.filter((product) => product.title.toLowerCase().includes(keyword)
    );

    dispatch(loadproducts(filtered));
  }

  const categoryHandler = (e) => {
    const input = e.target.value.trim().toLowerCase();
    console.log(input)
    dispatch(asyncLoadProduct());
    if (input === "vegetable" || input == "fruit" || input === "exotic") {
      setTimeout(() => {
         const filterProducts = products.filter((f) => f.category === input)
      console.log(filterProducts)
      dispatch(loadproducts(filterProducts));
      }, 500);
    }
    else {
      dispatch(asyncLoadProduct());
    }
  };

  useEffect(() => {
    dispatch(asyncLoadProduct());
    // The dependency array should be empty to run only once on mount.
    // If you put [products], it will cause an infinite loop because fetchData updates products.
  }, [])



  const underHandler = (checked) => {
    if (checked) {
      const filtered = products.filter((f) => f.price <= 2);
      dispatch(loadproducts(filtered));
    } else {
      dispatch(asyncLoadProduct());
    }
  };

  const aboveHandler = (checked) => {
    if (checked) {
      const filtered = products.filter((f) => f.price > 2);
      dispatch(loadproducts(filtered));
    } else {
      dispatch(asyncLoadProduct());
    }
  };

  let renderProducts = products?.map((data) => (
    <div
      key={data?.id}
      className="bg-[#efefe35f] backdrop-blur-lg text-white rounded-xl overflow-hidden shadow-lg w-full max-w-[220px] h-[255px] flex flex-col"
    >
      {/* Image */}
      <div className="w-full aspect-square overflow-hidden">
        <img
          src={data?.image}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between items-center px-2 py-1 gap-1 h-[45%]">
        <h1 className="text-center text-sm font-semibold truncate w-full">
          {data?.title}
        </h1>
        <h2 className="text-sm">Price: ${data?.price}</h2>

        <button
          onClick={() => navigate(`/product/details/${data.id}`)}
          className="text-sm underline"
        >
          More Details
        </button>
        <CartControl data={data} user={user} />
      </div>

    </div>
  ));

  return (
    <div className='w-full h-[90%] text-[18px] text-black px-2 flex flex-col gap-2 overflow-hidden'>

      <div className='flex max-[940px]:flex-col max-[940px]:gap-4 max-[370px]:w-[98%] max-[430px]:pl-[10px] max-[630px]:justify-items-center max-[700px]:mx-0 max-[700px]:pr-0 py-2 mx-5 pr-4 justify-between items-center' style={{ fontFamily: "Josefin Sans" }}>
        <input
          onInput={(e) => searchHandler(e.target.value)}
          className='bg-[#ffffff75] w-fit py-3 px-6 outline-0 rounded-2xl backdrop-blur-2xl max-[940px]:w-full'
          type="text"
          placeholder='Search Products'
        />

        <form className='flex gap-1 flex-wrap justify-between text-white items-center max-[640px]:text-[12px] max-[640px]:w-full'>
          <div className='flex justify-center items-center max-[720px]:w-full'>
            <h2>Filters</h2>
            <select onChange={categoryHandler} className='py-2 px-3 rounded-md outline-0'>
              <option className='bg-gray-600' value="">Select Options</option>
              <option className='bg-gray-600' value="vegetable">Vegetables</option>
              <option className='bg-gray-600' value="fruit">Fruits</option>
              <option className='bg-gray-600' value="exotic">Exotic</option>
            </select>
          </div>

          {/* Price Filter */}
          <div className='text-center flex gap-2 items-center flex-wrap justify-center max-[720px]:w-full'>
            <p>By Price</p>
            <input type="checkbox" id="under2" onChange={(e) => underHandler(e.target.checked)} />
            <label htmlFor="under2">Under - 2$</label>

            <input type="checkbox" id="above2" onChange={(e) => aboveHandler(e.target.checked)} />
            <label htmlFor="above2">Above - 2$</label>
          </div>
        </form>
      </div>

      {/* Product Grid */}
      <div id="scrollableDiv" style={{ height: '80vh', overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={products?.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          <div className='w-full h-full grid gap-4 px-6 grid-cols-2 max-[430px]:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 content-start' style={{ fontFamily: "Josefin Sans" }}>
            {renderProducts}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Products