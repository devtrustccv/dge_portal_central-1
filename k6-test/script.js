import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export const options = {
  stages: [
    { duration: '60s', target: 20 },
    { duration: '50s', target: 10 },
    { duration: '75s', target: 40 },
    { duration: '25s', target: 50 },
    { duration: '90s', target: 80 },
    { duration: '50s', target: 120 },
    { duration: '60s', target: 200 },
    { duration: '50s', target: 150 },
    { duration: '40s', target: 70 },
  ],
};

export default function () {
  const req = [
  {
    method: 'GET',
    url: 'https://kremais.gov.cv/sistema-nacional-qualificacoes',
  },
  {
    method: 'GET',
    url: 'https://kremais.gov.cv',
  },
  {
    method: 'GET',
    url: 'https://kremais.gov.cv/formacao-profissional-acreditada',
  },
  {
     method: 'GET',
     url: 'https://kremais.gov.cv/ofertas-formativas',
   },
  {
   method: 'GET',
     url: 'https://kremais.gov.cv/emprego/ofertas?tipo_oferta=estagio',
  },
  /*{
    method: 'POST',
    url: 'https://kremais-meili.gov.cv//indexes/dge-oferta-formativa/search',
    params: {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 77b154da4bc7553cfceffa48d5352c748cf12ff2r9828491c1d3c48bdf256257'
      },
    },
    body: JSON.stringify({
      "q":"",
      "attributesToRetrieve": ["*"],
      "hitsPerPage":10,
      "page":1,
      "attributesToCrop":["description"],
      "cropLength":1,
      "cropMarker":"...",
      "attributesToHighlight":["description"],
      "showMatchesPosition":false,
      "showRankingScore":false,
      "attributesToSearchOn":["*"],
      "matchingStrategy": "last"
    }),
  },
  {
    method: 'POST',
    url: 'https://kremais-meili.gov.cv//indexes/dge-documento/search',
    params: {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 77b154da4bc7553cfceffa48d5352c748cf12ff2r9828491c1d3c48bdf256257'
      },
    },
    body: JSON.stringify({
      "q":"",
      "attributesToRetrieve": ["*"],
      "hitsPerPage":10,
      "page":1,
      "attributesToCrop":["description"],
      "cropLength":1,
      "cropMarker":"...",
      "attributesToHighlight":["description"],
      "showMatchesPosition":false,
      "showRankingScore":false,
      "attributesToSearchOn":["*"],
      "matchingStrategy": "last"
    }),
  },
  {
    method: 'POST',
    url: 'https://kremais-meili.gov.cv//indexes/dge-service/search',
    params: {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 77b154da4bc7553cfceffa48d5352c748cf12ff2r9828491c1d3c48bdf256257'
      },
    },
    body: JSON.stringify({
      "q":"",
      "attributesToRetrieve": ["*"],
      "hitsPerPage":10,
      "page":1,
      "attributesToCrop":["description"],
      "cropLength":1,
      "cropMarker":"...",
      "attributesToHighlight":["description"],
      "showMatchesPosition":false,
      "showRankingScore":false,
      "attributesToSearchOn":["*"],
      "matchingStrategy": "last"
    }),
  }*/
];

  const responses = http.batch(req);
  check(responses[0], {'status was 200': (r) => r.status == 200 });
  sleep(1);
}