
const BASE_URL = 'http://localhost:3001'
import { Source } from '../interfaces';

export const request = (url: string, body?: BodyInit, method='GET') => {
  return fetch(BASE_URL+url, {
    method,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(async (d) => {
    const json = await d.json();
    if (d.status !== 200) {
      throw json;
    }
    return json
  })
  .catch((error) => {
    throw error
  });
}

export const URL = {
  sources: '/sources',
  templates: '/templates',
  source: (id: number) => `/source/${id}`
}

export const getAllSources = () => {
  return request(URL.sources)
    .then((data) => data)
    .catch((error) => {
      console.error('GET sources failed', error)
      throw error;
    });
}

export const getAllTemplates = () => {
  return request(URL.templates)
    .then((data) => data)
    .catch((error) => {
      console.error('GET sources failed', error)
      throw error;
    });
}

export const createOrUpdateSource = (source: Source) => {
  const method = source.id ? 'PUT' : 'POST';
  return request(URL.sources, JSON.stringify(source), method)
    .then((data) => data)
    .catch((error) => {
      console.error('CREATE or UPDATE source failed', error)
      throw error;
    });
}

export const deleteSource = (sourceId: number) => {
  if (!sourceId) return Promise.resolve();
  return request(URL.source(sourceId), null, 'DELETE')
  .then((data) => data)
  .catch((error) => {
    console.error('DELETE source failed', error)
    throw error;
  });
}