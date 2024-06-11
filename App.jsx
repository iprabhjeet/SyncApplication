// import React, { useState } from 'react';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [sourceFolder, setSourceFolder] = useState('');
//   const [destinationFolder, setDestinationFolder] = useState('');
//   const [reportData, setReportData] = useState([]);

//   const handleSourceFolderChange = (e) => {
//     setSourceFolder(e.target.value);
//   };

//   const handleDestinationFolderChange = (e) => {
//     setDestinationFolder(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post('http://localhost:8081/sync-folders', {
//         sourcePath: sourceFolder,
//         targetPath: destinationFolder
//       }, {
//         headers: {
//           'Access-Control-Allow-Origin': 'http://localhost:5174',
//           'Content-Type': 'application/json'
//         }
//       });
//       setReportData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Folder Comparison Tool</h1>
//       <form onSubmit={handleSubmit} className="form">
//         <div className="form-group">
//           <label htmlFor="sourceFolder">Source Folder Path:</label>
//           <input
//             type="text"
//             id="sourceFolder"
//             value={sourceFolder}
//             onChange={handleSourceFolderChange}
//             className="input-field"
//             placeholder="Enter source folder path"
//             maxLength={100} // Set the maximum length of input here
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="destinationFolder">Destination Folder Path:</label>
//           <input
//             type="text"
//             id="destinationFolder"
//             value={destinationFolder}
//             onChange={handleDestinationFolderChange}
//             className="input-field"
//             placeholder="Enter destination folder path"
//             maxLength={100} // Set the maximum length of input here
//           />
//         </div>
//         <button type="submit" className="submit-btn">Compare Folders</button>
//       </form>

//       {reportData.length > 0 && (
//         <div className="report">
//           <h2>Synchronization Report:</h2>
//           <ul>
//             {reportData.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import ActionPage from './Action'; // Import the ActionPage component
import Loader from './Loader'; // Import the Loader component

function App() {
  const [sourceFolder, setSourceFolder] = useState('');
  const [destinationFolder, setDestinationFolder] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading
  const [showActionPage, setShowActionPage] = useState(false); // State to toggle ActionPage

  const handleSourceFolderChange = (e) => {
    setSourceFolder(e.target.value);
  };

  const handleDestinationFolderChange = (e) => {
    setDestinationFolder(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post('http://localhost:8081/sync-folders', {
        sourcePath: sourceFolder,
        targetPath: destinationFolder
      }, {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5174',
          'Content-Type': 'application/json'
        }
      });
      setReportData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="container">
      {loading && <Loader />} {/* Display loader when loading */}
      <h1>Folder Comparison Tool</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="sourceFolder">Source Folder Path:</label>
          <input
            type="text"
            id="sourceFolder"
            value={sourceFolder}
            onChange={handleSourceFolderChange}
            className="input-field"
            placeholder="Enter source folder path"
            maxLength={100} // Set the maximum length of input here
          />
        </div>
        <div className="form-group">
          <label htmlFor="destinationFolder">Destination Folder Path:</label>
          <input
            type="text"
            id="destinationFolder"
            value={destinationFolder}
            onChange={handleDestinationFolderChange}
            className="input-field"
            placeholder="Enter destination folder path"
            maxLength={100} // Set the maximum length of input here
          />
        </div>
        <button type="submit" className="submit-btn">Compare Folders</button>
        {/* <button type="button" className="action-btn" onClick={() => setShowActionPage(!showActionPage)}>
          {showActionPage ? 'Hide Action Page' : 'Show Action Page'}
        </button> */}
      </form>

      {reportData.length > 0 && (
        <div className="report">
          <h2>Synchronization Report:</h2>
          <ul>
            {reportData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* {showActionPage && <ActionPage />} Toggle ActionPage */}
    </div>
  );
}

export default App;
