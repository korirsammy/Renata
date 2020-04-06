import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
 
    return ( 
        


      
    
        <div aria-label="Pagination Navigation" role="navigation" className="ui pagination menu">
          {pages.map(page => (
           
              <a  
              key={page} 
            
              onClick={() => onPageChange(page)}
              className={page === currentPage ? "item active" : "item"}
              >
                {page}
              </a>
           
          ))}
      
      </div>


    );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;