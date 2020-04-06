import React from "react";
import { Table, Button ,Pagination} from "semantic-ui-react";
import { format } from "date-fns";
import NumberFormat from "react-number-format";

const PhonesTable = (props) => {
  const { data, onDelete, submitting, target,onSort,onPageChange } = props;

 




  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell onClick={()=>onSort("createdOn") }>Date</Table.HeaderCell>
          <Table.HeaderCell onClick={()=>onSort("description") } >Model</Table.HeaderCell>
          <Table.HeaderCell onClick={()=>onSort("imeiNumber") }>IMEI Number</Table.HeaderCell>
          <Table.HeaderCell onClick={()=>onSort("venderId") }>Supplier</Table.HeaderCell>
          <Table.HeaderCell onClick={()=>onSort("venderPrice") }>Vendor Cost</Table.HeaderCell>
          <Table.HeaderCell onClick={()=>onSort("sellingPrice") } >Selling Price</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((product) => (
          <Table.Row key={product.id}>
            <Table.Cell>{product.id}</Table.Cell>
            <Table.Cell>{format(product.createdOn, "dd/MM/yyyy")}</Table.Cell>
            <Table.Cell>{product.description}</Table.Cell>
            <Table.Cell>{product.imeiNumber}</Table.Cell>
            <Table.Cell>{product.venderId}</Table.Cell>
            <Table.Cell>
              <NumberFormat
                value={product.venderPrice}
                displayType={"text"}
                thousandSeparator={true}
              />
            </Table.Cell>
            <Table.Cell>
              <NumberFormat
                value={product.sellingPrice}
                displayType={"text"}
                thousandSeparator={true}
              />
            </Table.Cell>
            <Table.Cell>
              <Button
                name={product.id}
                loading={target == product.id && submitting}
                onClick={(e) => onDelete(e, product.id)}
                disabled={target == product.id && submitting}
                negative
              >
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
     
    </Table>
  );
};

export default PhonesTable;
