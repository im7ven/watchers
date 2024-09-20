import { Flex, Table } from "@radix-ui/themes";

type Props = {
  revenue?: number;
  budget?: number;
  releaseDate?: string;
  country?: string;
};

const MovieDataList = ({ revenue, budget, releaseDate, country }: Props) => {
  return (
    <Flex className="my-10" justify="center">
      <Table.Root className="w-[90%]" size="3">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Budget</Table.ColumnHeaderCell>
            <Table.Cell>${budget?.toLocaleString()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.ColumnHeaderCell>Revenue</Table.ColumnHeaderCell>
            <Table.Cell>${revenue?.toLocaleString()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.ColumnHeaderCell>Release Date</Table.ColumnHeaderCell>
            <Table.Cell>{releaseDate}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.ColumnHeaderCell>Country</Table.ColumnHeaderCell>
            <Table.Cell>{country}</Table.Cell>
          </Table.Row>
        </Table.Header>
      </Table.Root>
    </Flex>
  );
};

export default MovieDataList;
