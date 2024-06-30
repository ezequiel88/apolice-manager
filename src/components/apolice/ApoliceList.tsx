import { delay } from '@/utils/delay';
import React, { useEffect, useState } from 'react';
import Loading from '../ui/Loading';
import ApoliceItemList from './ApoliceItemList';
import { Apolice } from '@/types/Apolice';
import ApoliceListPagination from './ApoliceListPagination';
import { ApoliceService } from '@/services/apoliceService';
import { toast } from 'react-toastify';

export default function ApoliceList() {

  const apoliceService = new ApoliceService();
  const [data, setData] = useState<Apolice[]>([]);
  const [filteredList, setFilteredList] = useState<Apolice[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    try {
      const response = await apoliceService.readApolices({ page: 1, per_page: 1000 });
      if (response && response.data) {
        setData(response.data);
        setFilteredList(response.data);
      } else {
        setData([]);
        setFilteredList([]);
      }
    } catch (error) {
      toast.error('Não foi possível listar as Apólices');
    } finally {
      await delay(1000);
      setLoading(false);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilter = (filter: string) => {
    setSearchValue(filter);
    const copyList = [...data];
    if (filter.length > 0) {
      const dataTemp = copyList.filter((a: Apolice) => {
        return (
          a.segurado.nome && a.segurado.nome.toLowerCase().includes(filter.toLowerCase())
          ||
          a.segurado.email && a.segurado.email.toLowerCase().includes(filter.toLowerCase())
        );
      });
      setFilteredList(dataTemp);
    } else {
      setFilteredList(copyList);
    }
    setCurrentPage(1);
  };

  const paginatedData = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    loading ? (
      <div className="-ml-2">
        <Loading size={64} />
      </div>
    ) : data.length ? (
      <>
        <div className="flex mb-5 w-full md:w-1/3 lg:w-1/4">
          <input
            type="search"
            name="search"
            id="search"
            value={searchValue}
            placeholder="Pesquisa por nome ou email..."
            onChange={e => handleFilter(e.target.value)}
            className="w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-66"
          />
        </div>
        {filteredList.length > 0 ? (
          <>
            <ul role="list" className="space-y-4">
              {paginatedData.map((apolice: Apolice) => (
                <ApoliceItemList key={apolice.id} apolice={apolice} />
              ))}
            </ul>
            {filteredList.length > itemsPerPage && (
              <div className="flex justify-center items-center">
                <ApoliceListPagination currentPage={currentPage} totalPages={Math.ceil(filteredList.length / itemsPerPage)} onPageChange={onPageChange} />
              </div>
            )}
          </>
        ) : (
          <p className="text-sm font-semibold leading-6 text-gray-600">Sua busca não retornou resultados</p>
        )}
      </>
    ) : (
      <p className="text-sm font-semibold leading-6 text-gray-600">Nenhum registro encontrado</p>
    )
  );
}
