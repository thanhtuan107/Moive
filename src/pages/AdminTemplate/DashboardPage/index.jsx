import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UsersPage from '../UsersPage';
import { fetchListMovie } from './slice';
import Movie from './Movie';

export default function DashboardPage() {
  const [isFilmDropdownOpen, setIsFilmDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const dispatch = useDispatch();
  const state = useSelector((state) => state.DashboardPageReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchListMovie());
  }, [dispatch]);

  useEffect(() => {
    console.log('State:', state); // kiểm tra state
  }, [state]);

  const toggleFilmDropdown = () => {
    setIsFilmDropdownOpen(!isFilmDropdownOpen);
  };


  const renderListMovie = () => {
    if (!state || !state.data) {
      return null;
    }
    return state.data.map((movie) => <Movie key={movie.maPhim} movie={movie} />);
  };

  if (state?.loading) return <p>Loading...</p>; 

  const renderActivePage = () => {
    switch (activePage) {
      case 'users':
        return <UsersPage onBack={() => setActivePage('dashboard')} />;
      default:
        return (
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="mx-auto max-w-screen-xl">
              <div className="relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                  <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                      <label htmlFor="search-input" className="sr-only">Search</label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input type="text" id="search-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search users or films" required />
                      </div>
                    </form>
                  </div>
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button type="button" onClick={() => navigate('/admin/add-movie')} className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">
                      <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                      Thêm phim
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-4 py-3">Mã Phim</th>
                        <th scope="col" className="px-4 py-3">Hình Ảnh</th>
                        <th scope="col" className="px-4 py-3">Tên Phim</th>
                        <th scope="col" className="px-4 py-3">Mô tả</th>
                        <th scope="col" className="px-4 py-3">Hành Động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderListMovie()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActivePage('users')} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="ml-3">USER</span>
              </button>
            </li>
            <li>
              <button onClick={toggleFilmDropdown} className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="ml-3">FILM</span>
                <svg className={`w-6 h-6 ml-auto transition-transform ${isFilmDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isFilmDropdownOpen && (
                <ul className="space-y-2 pl-6">
                  <li>
                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="ml-3">Manage List</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="ml-3">Add New</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </aside>
      <div className="flex-1 p-6">
        {renderActivePage()}
        
      </div>
    </div>
  );
}
