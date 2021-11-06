/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { Card, CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface IResponse {
  data: Card[];
  after: string;
}

export default function Home(): JSX.Element {
  const fetchApi = async ({ pageParam = null }): Promise<IResponse> => {
    let apiCall = () => api.get<IResponse>('/api/images');
    if (pageParam) {
      apiCall = () =>
        api.get<IResponse>('/api/images', {
          params: {
            after: pageParam,
          },
        });
    }

    const { data } = await apiCall();

    return data;
  };
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchApi, {
    getNextPageParam: lastPage => lastPage.after ?? null,
  });

  const formattedData = useMemo(() => {
    let formattedDataTotal = [] as Card[];
    const dataPages = data?.pages;

    dataPages?.forEach(page => {
      formattedDataTotal = [...formattedDataTotal, ...page.data];
    });

    return formattedDataTotal;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={['0.5rem', 20]} mx="auto" my={20}>
        <CardList cards={formattedData} />
        <Button
          mt="40px"
          disabled={!hasNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
        </Button>
      </Box>
    </>
  );
}
