import React, { useEffect, useState } from 'react';
import Service from '../utils/http';
import { Anchor, Table, Text } from '@mantine/core';

const MyUrls = () => {
  const service = new Service();
  const [data, setData] = useState([]);


  const getData = async () => {
    try {
      const response = await service.get('user/my/urls');
      setData(response.shortURLs || []);
    } catch (err) {
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        style={{
          tableLayout: 'fixed',
          width: '100%',
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: '20%', wordWrap: 'break-word' }}>Title</Table.Th>
            <Table.Th style={{ width: '50%', wordWrap: 'break-word' }}>Original URL</Table.Th>
            <Table.Th style={{ width: '30%', wordWrap: 'break-word' }}>Short URL</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={3} style={{ textAlign: 'center' }}>
                No URLs found
              </Table.Td>
            </Table.Tr>
          ) : (
            data.map((d, index) => (
              <Table.Tr key={d._id || index}>
                <Table.Td style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                  <Text>{d?.title || 'NA'}</Text>
                </Table.Td>
                <Table.Td style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                  <Anchor href={d?.originalUrl} target="_blank" rel="noopener noreferrer">
                    {d?.originalUrl}
                  </Anchor>
                </Table.Td>
                <Table.Td style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                  <Anchor
                    href={`https://url-shortener-bootcamp.onrender.com/api/s/${d?.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d?.shortCode || 'NA'}
                  </Anchor>
                </Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>
    </div>

  );
};

export default MyUrls;
