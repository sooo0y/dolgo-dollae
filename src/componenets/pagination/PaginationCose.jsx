import React from 'react'
import Pagination from "react-js-pagination";
import '../../css/paging.css';

const PaginationCose = ({page, count, setPage, postPerPage}) => {
  // const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };


  return (
    <>
        <Pagination
            activePage={page} //현재페이지
            itemsCountPerPage={5} //한 페이지당 보여줄 리스트 아이템 개수
            totalItemsCount={count ? count : 0} // 총 아이템 개수
            pageRangeDisplayed={5} // paginator내에서 보여줄 페이지의 범위
            prevPageText={"‹"} 
            nextPageText={"›"}
            onChange={setPage}
        />
    </>
  )
}


export default PaginationCose