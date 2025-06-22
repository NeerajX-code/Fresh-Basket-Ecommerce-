import { lazy } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadproducts } from '../store/reducers/productSlice'
import { asyncLoadProduct } from '../store/actions/productActions'
const CartControl = lazy(() => import('../components/CartControl'));
import InfiniteScroll from "react-infinite-scroll-component";
import axios from '../utils/axios'
import ProductFilters from '../components/ProductFilters'

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productReducer.products);

  const [hasMore, sethasMore] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/products?_limit=6&_start=${products.length}`);
      if (data && data.length > 0) {
        const unique = mergeUniqueProducts(products, data);
        dispatch(loadproducts(unique));
        sethasMore(true);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  function mergeUniqueProducts(existing, incoming) {
    const map = new Map();
    [...existing, ...incoming].forEach(p => map.set(p._id, p));
    return Array.from(map.values());
  }

  useEffect(()=>{
    fetchData();
  },[])


  useEffect(() => {
    dispatch(asyncLoadProduct());
    // The dependency array should be empty to run only once on mount.
    // If you put [products], it will cause an infinite loop because fetchData updates products.
  }, [])




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
        <CartControl data={data} />
      </div>

    </div>
  ));

  return (
    <div className='w-full h-[90%] text-[18px] text-black px-2 flex flex-col gap-2 overflow-hidden'>

      <ProductFilters />

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