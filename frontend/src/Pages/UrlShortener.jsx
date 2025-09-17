import React, { useState } from 'react';
import { Center, Text, Card, Stack, TextInput, Button, Anchor } from '@mantine/core';
import Service from '../utils/http';
import { QRCodeSVG } from 'qrcode.react';

export default function Urlshortner() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [shortUrlData, setShortUrlData] = useState(null); // null means no data yet

  const service = new Service();

  const getShortUrl = async () => {
    try {
      const response = await service.post('s', {
        customUrl,
        originalUrl,
        expiresAt: expiry,
        title: name,
      });
      console.log(response);
      setShortUrlData(response);
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  };

  // Disable button if originalUrl is empty or only whitespace
  const isCreateDisabled = !originalUrl.trim();

  return (
    <Center style={{ height: '90vh' }}>
      {!shortUrlData ? (
        <Card shadow="xl" padding="xl" radius="lg" withBorder style={{ minWidth: 350, maxWidth: 400 }}>
          <Stack spacing="md">
            <Text size="xl" weight={700} align="center" style={{ fontFamily: 'Segoe UI' }}>
              URL Shortener
            </Text>
            <TextInput
              label="Original URL"
              placeholder="Enter your long URL"
              required
              value={originalUrl}
              onChange={e => setOriginalUrl(e.target.value)}
              radius="sm"
            />
            <TextInput
              label="Customize Your URL (optional)"
              placeholder="e.g. my-custom-link"
              value={customUrl}
              onChange={e => setCustomUrl(e.target.value)}
              radius="sm"
            />
            <TextInput
              label="Name (optional)"
              placeholder="Give this link a name"
              value={name}
              onChange={e => setName(e.target.value)}
              radius="sm"
            />
            <TextInput
              label="Expiry (optional)"
              placeholder="e.g. 2025-12-31"
              value={expiry}
              onChange={e => setExpiry(e.target.value)}
              type="date"
              radius="sm"
            />
            <Button onClick={getShortUrl} radius="sm" fullWidth disabled={isCreateDisabled}>
              Create & Shorten URL
            </Button>
          </Stack>
        </Card>
      ) : (
        <Stack spacing="md" align="center">
          <Anchor
            href={`${service.getBaseURL()}/api/s/${shortUrlData.shortCode}`}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            weight={500}
          >
            {`${service.getBaseURL()}/api/s/${shortUrlData.shortCode}`}
          </Anchor>
          <QRCodeSVG value={`${service.getBaseURL()}/api/s/${shortUrlData.shortCode}`} />
          
        </Stack>
      )}
    </Center>
  );
}
