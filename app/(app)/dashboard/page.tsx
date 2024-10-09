// "use client";
// import { Navbar1 } from '@/components/layout/compiler/Navbar1';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import React, { useEffect, useState } from 'react';

// type Code = {
//   id: string;
//   fileName: string;
//   language: string;
//   code: string;
//   createdAt: Date; // Use Date if you plan to parse it as a date
// };


// function Dashboard() {
//   const [codes, setCodes] = useState([]);
//   const { data: session } = useSession();
//   const userID = session?.user.id;

//   useEffect(() => {
//     // Function to fetch saved codes for the user
//     const fetchCodes = async () => {
//       try {
//         const response = await axios.get(`/api/save-code?userID=${userID}`); // Replace "your-endpoint" with your actual API route
//         const data = await response.data
//         setCodes(data.codes);
//       } catch (error) {
//         console.error("Error fetching codes:", error);
//       }
//     };

//     fetchCodes();
//   }, [userID]);

//   if(!session){
//     return(
//       <>
//       Loading...
//       </>
//     )
//   }

//   return (
//     <div>
//       <Navbar1 />
//       <h1>Dashboard</h1>
//       <div className="code-list">
//         {codes.length > 0 ? (
//           codes.map((code:Code) => (
//             <div key={code.id} className="code-item">
//               <h2>{code.fileName}</h2>
//               <p>Language: {code.language}</p>
//               {/* <pre>{atob(code.code)}</pre> */}
//               <p>Created at: {new Date(code.createdAt).toLocaleString()}</p>
//             </div>
//           ))
//         ) : (
//           <p>No saved codes found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


///////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { Trash2, Edit, Share2, Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Navbar1 } from '@/components/layout/compiler/Navbar1';

// type Code = {
//   id: string;
//   fileName: string;
//   language: string;
//   code: string;
//   createdAt: Date;
// };

// const Dashboard = () => {
//   const [codes, setCodes] = useState<Code[]>([]);
//   const [filteredCodes, setFilteredCodes] = useState<Code[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [codesPerPage] = useState(10);
//   const { data: session } = useSession();
//   const userID = session?.user.id;

//   useEffect(() => {
//     const fetchCodes = async () => {
//       try {
//         const response = await axios.get(`/api/save-code?userID=${userID}`);
//         setCodes(response.data.codes);
//         setFilteredCodes(response.data.codes);
//       } catch (error) {
//         console.error("Error fetching codes:", error);
//       }
//     };

//     if (userID) {
//       fetchCodes();
//     }
//   }, [userID]);

//   useEffect(() => {
//     const results = codes.filter(code =>
//       code.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       code.language.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCodes(results);
//     setCurrentPage(1);
//   }, [searchTerm, codes]);

//   const handleDelete = async (id: string) => {
//     // Implement delete functionality
//     console.log("Delete code with id:", id);
//   };

//   const handleEdit = (id: string) => {
//     // Implement edit functionality
//     console.log("Edit code with id:", id);
//   };

//   const handleShare = (id: string) => {
//     // Implement share functionality
//     console.log("Share code with id:", id);
//   };

//   const handleDownload = (id: string) => {
//     // Implement download functionality
//     console.log("Download code with id:", id);
//   };

//   // Pagination
//   const indexOfLastCode = currentPage * codesPerPage;
//   const indexOfFirstCode = indexOfLastCode - codesPerPage;
//   const currentCodes = filteredCodes.slice(indexOfFirstCode, indexOfLastCode);

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   if (!session) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-2xl font-semibold text-color-1"
//         >
//           Loading...
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <Navbar1 />
//       <div className="container mx-auto px-4 py-8">
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl font-bold mb-8 text-color-1"
//         >
//           Hello {session.user?.name}
//         </motion.h1>
        
//         <div className="mb-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search by file name or language..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-color-1"
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//           </div>
//         </div>

//         <div className="bg-card rounded-lg shadow-lg overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-muted">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Serial No</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">File Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Language</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Created At</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-muted">
//               {currentCodes.length > 0 ? (
//                 currentCodes.map((code, index) => (
//                   <motion.tr 
//                     key={code.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                     className="hover:bg-muted/50"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">{indexOfFirstCode + index + 1}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{code.fileName}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{code.language}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{new Date(code.createdAt).toLocaleString()}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex space-x-2">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => handleEdit(code.id)}
//                           className="text-blue-500 hover:text-blue-700"
//                         >
//                           <Edit size={18} />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => handleDelete(code.id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <Trash2 size={18} />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => handleShare(code.id)}
//                           className="text-green-500 hover:text-green-700"
//                         >
//                           <Share2 size={18} />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => handleDownload(code.id)}
//                           className="text-purple-500 hover:text-purple-700"
//                         >
//                           <Download size={18} />
//                         </motion.button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))
//               ) : (
//                 <motion.tr
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">
//                     No data available in table
//                   </td>
//                 </motion.tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
//           <div>
//             Showing {indexOfFirstCode + 1} to {Math.min(indexOfLastCode, filteredCodes.length)} of {filteredCodes.length} entries
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => paginate(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border rounded-md disabled:opacity-50"
//             >
//               <ChevronLeft size={18} />
//             </button>
//             <button
//               onClick={() => paginate(currentPage + 1)}
//               disabled={indexOfLastCode >= filteredCodes.length}
//               className="px-3 py-1 border rounded-md disabled:opacity-50"
//             >
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

////////////////////////////////////////////


"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Trash2, Edit, Share2, Download, Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { Navbar1 } from '@/components/layout/compiler/Navbar1';

type Code = {
  id: string;
  fileName: string;
  language: string;
  code: string;
  createdAt: Date;
};

type SortKey = 'fileName' | 'language' | 'createdAt';

const Dashboard = () => {
  const [codes, setCodes] = useState<Code[]>([]);
  const [filteredCodes, setFilteredCodes] = useState<Code[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [codesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>(null);
  const { data: session } = useSession();
  const userID = session?.user.id;

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get(`/api/save-code?userID=${userID}`);
        setCodes(response.data.codes);
        setFilteredCodes(response.data.codes);
      } catch (error) {
        console.error("Error fetching codes:", error);
      }
    };

    if (userID) {
      fetchCodes();
    }
  }, [userID]);

  useEffect(() => {
    const results = codes.filter(code =>
      code.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCodes(results);
    setCurrentPage(1);
  }, [searchTerm, codes]);

  const handleDelete = async (id: string) => {
    // Implement delete functionality
    console.log("Delete code with id:", id);
  };

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log("Edit code with id:", id);
  };

  const handleShare = (id: string) => {
    // Implement share functionality
    console.log("Share code with id:", id);
  };

  const handleDownload = (id: string) => {
    // Implement download functionality
    console.log("Download code with id:", id);
  };

  const handleSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (sortConfig !== null) {
      const sortedCodes = [...filteredCodes].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setFilteredCodes(sortedCodes);
    }
  }, [sortConfig]);

  // Pagination
  const indexOfLastCode = currentPage * codesPerPage;
  const indexOfFirstCode = indexOfLastCode - codesPerPage;
  const currentCodes = filteredCodes.slice(indexOfFirstCode, indexOfLastCode);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-color-1"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar1 />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-color-1"
          >
            Hello {session.user?.name}
          </motion.h1>
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search by file name or language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color-1"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Serial No</th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('fileName')}
                >
                  File Name <ArrowUpDown size={14} className="inline ml-1" />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('language')}
                >
                  Language <ArrowUpDown size={14} className="inline ml-1" />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  Created At <ArrowUpDown size={14} className="inline ml-1" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {currentCodes.length > 0 ? (
                currentCodes.map((code, index) => (
                  <motion.tr 
                    key={code.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-muted/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{indexOfFirstCode + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{code.fileName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{code.language}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(code.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(code.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(code.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleShare(code.id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          <Share2 size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDownload(code.id)}
                          className="text-purple-500 hover:text-purple-700"
                        >
                          <Download size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">
                    No data available in table
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
          <div>
            Showing {indexOfFirstCode + 1} to {Math.min(indexOfLastCode, filteredCodes.length)} of {filteredCodes.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastCode >= filteredCodes.length}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;