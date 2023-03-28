import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';

import { Box, Button, Text, Heading, Spinner, useToast } from '@chakra-ui/react'
import { SourceCard } from '@/components/rudderstack/SourceCard'
import { SourceModal } from '@/components/rudderstack/SourceModal';
import { getAllSources, deleteSource, createOrUpdateSource as createOrUpdateSourceApi, getAllTemplates } from '../api';
import { Source } from '@/interfaces';

const BASE_SOURCE = {
  name: '',
  templateId: null,
  fields: []
}

export default function Home() {
  const [sources, setSources] = useState<any>(null);
  const [templates, setTemplates] = useState<any>(null);
  const [selectedSourceId, setSelectedSourceId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  useEffect(() => {
    getAllSources()
      .then((data) => setSources(data))
      .catch((error) => {
        setError('Could not get sources, please refresh the page')
        console.log('GET sources failed', error)
      })
  }, []);

  useEffect(() => {
    getAllTemplates()
      .then((data) => setTemplates(data))
      .catch((error) => {
        setError('Could not get templates, please refresh the page')
        console.log('GET templates failed: ', error)
      })
  }, [])

  const createOrUpdateSource = async (source: Source) => {
    createOrUpdateSourceApi(source)
      .then((data) => {
        toast({
          title: source.id ? 'Data source config updated!' : 'New Data source created',
          status: 'success',
          isClosable: true,
          position: 'top-right'
        })
        // update
        if (source.id) {
          setSources((s) => s.map((s) => s.id !== source.id ? s : data))
        } else {
          setSources((s) => [...s, data])
        }
      })
      .catch((error) => {
        toast({
          title: error.message || 'Something went wrong!',
          status: 'error',
          isClosable: true,
          position: 'top-right'
        })
      }).finally(() => {
        setSelectedSourceId(null);
      })
  }

  const onDeleteSource = async (sourceId: number) => {
    if (!sourceId) return;
    deleteSource(sourceId).then((data) => {
      toast({
        title: `Deleted data source`,
        status: 'success',
        isClosable: true,
        position: 'top-right'
      })
      setSources((source) => source.filter((s) => s.id !== sourceId))
    }).catch((error) => {
      toast({
        title: error.message || 'Something went wrong!',
        status: 'error',
        isClosable: true,
        position: 'top-right'
      })
    }).finally(() => {
      setSelectedSourceId(null);
    })
  }

  const source = useMemo(() => 
      selectedSourceId === -1 ? BASE_SOURCE : sources?.filter((s) => s.id === selectedSourceId)[0],
    [selectedSourceId]
    )

  return (
    <>
      <Head>
        <title>Rudderstack</title>
        <meta name="description" content="RudderStack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start">
          <Heading mt="3rem" mb="1rem">Data Sources</Heading>
          {error && (
            <Text color="red" >{error}</Text>
          )}
          {!error && (sources === null || templates === null) ? (
            <Spinner />
          ) : (
            <>
              <Button onClick={() => setSelectedSourceId(-1)} >Add Source</Button>
              {sources.map((source: { name: string, id: number }) => (
                <>  
                  <Box key={source.id} mt="1rem">
                    <SourceCard name={source.name} id={source.id} onClick={(id) => setSelectedSourceId(id)} />
                  </Box>
                </>
              ))}
            </>
          )}
          {selectedSourceId && (
            <SourceModal 
              source={source}
              templates={templates} 
              onClose={() => setSelectedSourceId(null)}
              onSubmit={(source) => {
                createOrUpdateSource(source);
              }}
              onDeleteSource={onDeleteSource}
            />
          )}
        </Box>
      </main>
    </>
  )
}
