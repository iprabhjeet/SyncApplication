// import React, { useState } from 'react';
// import axios from 'axios';
// import Loader from './Loader'; // Import the Loader component

// function ActionPage() {
//   const [folderPath, setFolderPath] = useState('');
//   const [loading, setLoading] = useState(false); // State to manage loading

//   const handleFolderPathChange = (e) => {
//     setFolderPath(e.target.value);
//   };

//   const handleDeleteFolder = async () => {
//     console.log('Setting loading to true');
//     setLoading(true); // Set loading to true
//     try {
//       const response = await axios.delete('http://localhost:8080/delete-folder', {
//         data: { folderPath }
//       });
//       console.log(response.data); // Handle success response
//     } catch (error) {
//       console.error(error); // Handle error
//     } finally {
//       console.log('Setting loading to false');
//       setLoading(false); // Set loading to false
//     }
//   };
  
//   const handleUpdateFolder = async () => {
//     console.log('Setting loading to true');
//     setLoading(true); // Set loading to true
//     try {
//       const response = await axios.put('http://localhost:8080/update-folder', {
//         folderPath
//       });
//       console.log(response.data); // Handle success response
//     } catch (error) {
//       console.error(error); // Handle error
//     } finally {
//       console.log('Setting loading to false');
//       setLoading(false); // Set loading to false
//     }
//   };
  

//   return (
//     <div className="container">
//       {loading && <Loader />} {/* Display loader when loading */}
//       <h1>Action Page</h1>
//       <div className="form-group">
//         <label htmlFor="folderPath">Folder Path:</label>
//         <input
//           type="text"
//           id="folderPath"
//           value={folderPath}
//           onChange={handleFolderPathChange}
//           className="input-field"
//           placeholder="Enter folder path"
//           maxLength={255} // Set the maximum length of input here
//         />
//       </div>
//       <button onClick={handleDeleteFolder} className="action-btn">Delete Folder</button>
//       <button onClick={handleUpdateFolder} className="action-btn">Update Folder</button>
//     </div>
//   );
// }

// export default ActionPage;
import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader'; // Import the Loader component

function ActionPage() {
  const [folderPath, setFolderPath] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleFolderPathChange = (e) => {
    setFolderPath(e.target.value);
  };

  const handleDeleteFolder = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.delete('http://localhost:8080/delete-folder', {
        data: { folderPath }
      });
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error(error); // Handle error
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleUpdateFolder = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.put('http://localhost:8080/update-folder', {
        folderPath
      });
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error(error); // Handle error
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="container">
      {loading && <Loader />} {/* Display loader when loading */}
      <h1>Action Page</h1>
      <div className="form-group">
        <label htmlFor="folderPath">Folder Path:</label>
        <input
          type="text"
          id="folderPath"
          value={folderPath}
          onChange={handleFolderPathChange}
          className="input-field"
          placeholder="Enter folder path"
          maxLength={255} // Set the maximum length of input here
        />
      </div>
      <button onClick={handleDeleteFolder} className="action-btn">Delete Folder</button>
      <button onClick={handleUpdateFolder} className="action-btn">Update Folder</button>
    </div>
  );
}

export default ActionPage;

