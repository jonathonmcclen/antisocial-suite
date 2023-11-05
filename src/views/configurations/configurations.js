import { NavLink } from "react-router-dom";
import { Table, Button, Panel } from "rsuite";

const { Column, HeaderCell, Cell } = Table;
const data = [{ id: 100, customer: "john McClenodn" }, ""];

function Configurations() {
  return (
    <>
      <div style={{ margin: "50px" }}>
        <h1>Configurations</h1>
        <Panel
          shaded
          style={{
            display: "inline-block",
            width: "100%",
          }}
        >
          <Button to={"/configurations/new"} as={NavLink}>
            Create New
          </Button>
          <Table
            height={500}
            data={data}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column width={280} fixed>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={400}>
              <HeaderCell>Description</HeaderCell>
              <Cell dataKey="customer" />
            </Column>

            <Column width={100}>
              <HeaderCell>Permissions</HeaderCell>
              <Cell dataKey="created" />
            </Column>

            <Column width={150} align="center" fixed="right">
              <HeaderCell>Actions</HeaderCell>

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

export default Configurations;
