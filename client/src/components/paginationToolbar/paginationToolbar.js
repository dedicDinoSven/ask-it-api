import React from "react";
import { usePagination } from "./usePagination";

// PROPS
// numberOfRowsInDropdown - array which contains numbers of rows to show per page, which will be displayed in dropdown
// numberOfPages - total number of pages
// state - state in which active page and number of rows to show will be stored {page: number, numberOfRows: number}
// setState - state setter
// loading - boolean which is true while data is being fetched

const PaginationToolbar = (props) => {
    const pagesArray = usePagination({
        dataCount: props?.dataCount ?? 0,
        numberOfRows: props?.state?.numberOfRows,
        currentPage: props?.state?.page
    });

    return (
        <div className="pagination-toolbar">
            <div className="number-of-rows">
                Select Number of Rows
                <select className="pages-dropdown"
                        value={props?.state?.numberOfRows}
                        onChange={(event) => {
                            props?.setState(
                                { page: 1, numberOfRows: event.target.value });
                        }}>
                    {props?.numberOfRowsInDropdown?.map((item) => {
                        return <option key={item}>{item}</option>;
                    })}
                </select>
            </div>
            <div className="pages">
                <button className="page-box navigation-box"
                        disabled={props?.loading} onClick={() => {
                    if (props?.state?.page - 1 !== 0) props?.setState({
                        ...props?.state,
                        page: props?.state?.page - 1
                    });
                }}>
                    &lt;
                </button>
                {pagesArray?.map((item, index) => {
                    let boxClass = "page-box";
                    if (item === props?.state?.page) boxClass += " active-box";
                    if (item === "DOTS") return <button key={index}
                                                        className="page-box">&#8230;</button>;
                    return <button className={boxClass} key={index}
                                   disabled={props?.loading}
                                   onClick={() => props?.setState({
                                       ...props?.state,
                                       page: item
                                   })}>{item}</button>;
                })}
                <button className="page-box navigation-box"
                        disabled={props?.loading} onClick={() => {
                    if (props?.state.page + 1 !== props?.dataCount /
                        props?.state?.numberOfRows + 1)
                        props?.setState({
                            ...props?.state,
                            page: props?.state?.page + 1
                        });
                }}>
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default PaginationToolbar;