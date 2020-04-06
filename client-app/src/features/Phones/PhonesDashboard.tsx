import React, { useEffect, Fragment, SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { IProduct } from "./../../app/models/product";
import agent from "../../app/api/agent";
import PhonesTable from "./phonesTable";
import { paginate } from "../../utils/paginate";
import Pagination from "../../app/common/table/pagination";
import _ from "lodash";
import { Input, Form } from "semantic-ui-react";
import SearchBox from "../../app/common/search/searchBox";
import { Link } from "react-router-dom";
import PhoneForm from "../Products/form/PhoneForm";


const PhonesDashboard: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({path:'description', order:'asc'});
  const [searchQuery, setSearchQuery] = useState('');

  const pageSize = 5;



  const handlePageChange = (page: any) => {
    setcurrentPage(page);   
  };

  
  const handleDelete = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Products.delete(id)
      .then(() => {
        setProducts([...products.filter((a) => a.id !== id)]);
        setSortedProducts(_.orderBy([...products.filter((a) => a.id !== id)],[sortColumn.path],['asc'])); 
      })
      .then(() => setSubmitting(false));
  };

  const handleSort = (path: any) => {
   
    const sortCol= {...sortColumn};
    
    if(sortCol.path===path){
       
        sortCol.order =(sortCol.order==='asc') ? 'desc': 'asc';  
       if(sortCol.order==='asc'){
        setSortedProducts(_.orderBy(products,[sortColumn.path],['asc']))
       }else{
        setSortedProducts(_.orderBy(products,[sortColumn.path],['desc']))
       }
      
        
    }else{
        sortCol.path=path;
        sortCol.order='asc';
        setSortedProducts(_.orderBy(products,[sortColumn.path],['asc'])); 
       
    }
    setSortColumn(sortCol);
  
   
  };
  const handleSearch = (query: any) => {
    setSearchQuery(query)
  
   
    if (searchQuery!=''){

      setSortedProducts ( products.filter(m =>
        m.description.toLowerCase().startsWith(query.toLowerCase())
      ));
     
    }else{
      setSortedProducts(_.orderBy(products,[sortColumn.path],['asc']));      
    }
    //setPaginatedData( paginate(sortedProducts, currentPage, pageSize));
  
  };

  useEffect(() => {
    agent.Products.list()
      .then((response) => {
        let products: IProduct[] = [];
        response.forEach((product) => {         
          products.push(product);
        });
        setProducts(products);
        setSortedProducts(_.orderBy(products,[sortColumn.path],['asc'])); 
      })
      .then(() => setLoading(false));
  }, []);
  
  //const sorted= _.orderBy(products,[sortColumn.path],'desc');
  const paginatedData = paginate(sortedProducts, currentPage, pageSize);

  if (products.length === 0 && loading === false)
    return (
      <div className="ui warning message">
        <div className="header">There are no phones in the database.</div>
        <p>Add new phones.</p>
      </div>
    );


  return (
    <Fragment>

      
        <SearchBox value={searchQuery} onChange={handleSearch} />
     
      <br></br>
      {loading === false && <b>Showing {products.length} records in the database.</b>}

      <PhonesTable
            data={paginatedData}
            onDelete={handleDelete}
            submitting={submitting}
            target={target}
            onSort={handleSort}
     />
       
       <Pagination
            itemsCount={sortedProducts.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />



    </Fragment>
  );
};

export default observer(PhonesDashboard);
