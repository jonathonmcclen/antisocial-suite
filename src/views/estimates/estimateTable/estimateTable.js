import { NavLink } from "react-router-dom";
import { Table, Button, Panel } from "rsuite";

const { Column, HeaderCell, Cell } = Table;
const data = [{ id: 100, customer: "john McClenodn" }, ""];

function EstimateTable() {
  return (
    <>
      <div>
        <Panel
          header="Created Estimates"
          shaded
          style={{
            display: "inline-block",
            width: "100%",
            minWidth: 1000,
          }}
        >
          <Button to={"/estimates/new"} as={NavLink}>
            Create New
          </Button>
          <Table
            height={500}
            data={data}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column width={200} align="center" fixed>
              <HeaderCell>Estimate #</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={200}>
              <HeaderCell>Customer</HeaderCell>
              <Cell dataKey="customer" />
            </Column>

            <Column width={150}>
              <HeaderCell>Created</HeaderCell>
              <Cell dataKey="created" />
            </Column>

            <Column width={150}>
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey="status" />
            </Column>

            <Column width={200}>
              <HeaderCell>Total</HeaderCell>
              <Cell dataKey="total" />
            </Column>

            <Column width={100}>
              <HeaderCell>Items</HeaderCell>
              <Cell dataKey="items" />
            </Column>
            <Column width={100} fixed="right">
              <HeaderCell>...</HeaderCell>

              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <Button
                    appearance="link"
                    onClick={() => alert(`id:${rowData.id}`)}
                  >
                    Edit
                  </Button>
                )}
              </Cell>
            </Column>
          </Table>
        </Panel>
      </div>
    </>
  );
}

export default EstimateTable;
