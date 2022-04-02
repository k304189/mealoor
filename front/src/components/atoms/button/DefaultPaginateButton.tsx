import { memo, VFC } from "react";
import ReactPaginate from "react-paginate";

type Props = {
  onPageChange: (page: { selected: number }) => void;
  totalPage: number;
};

export const DefaultPaginateButton: VFC<Props> = memo((props) => {
  const { onPageChange, totalPage } = props;
  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      pageCount={totalPage}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName="pagination"
    />
  );
});
