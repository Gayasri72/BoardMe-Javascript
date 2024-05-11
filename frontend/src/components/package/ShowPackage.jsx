import  { useState, useEffect } from 'react';
import axios from 'axios';
import AddPackage from './AddPckage';
import { jsPDF } from 'jspdf';


function ShowPackage() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    pac_name: '',
    features: '',
    price: '',
  });
  const [formDataEdit, setFormDataEdit] = useState({
    pac_name: '',
    features: '',
    price: '',
    _id: '',
  });
  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setAddSection(false);
    setEditSection(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editSection) {
        response = await axios.put(`/api/package/${formDataEdit._id}`, formDataEdit);
      } else {
        response = await axios.post('/api/package', formData);
      }
      console.log(response.data);
      setFormData({
        pac_name: '',
        features: '',
        price: '',
      });
      setFormDataEdit({
        pac_name: '',
        features: '',
        price: '',
        _id: '',
      });
      setAddSection(false);
      setEditSection(false);
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/package');
      setDataList(response.data.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/package/${id}`);
      console.log(response.data);
      alert(response.data.message);
      fetchData();
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  const updateData = () => {
    fetchData();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = dataList.filter((item) =>
    item.pac_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.price.toString().includes(searchQuery)
);


  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;
  
    doc.text('Package Details', 10, y);
    y += 20;
  
    filteredData.forEach(pkg => {
      doc.text(`Package Name: ${pkg.pac_name}`, 10, y);
      y += 10;
      doc.text(`Description: ${pkg.features}`, 10, y); // Move this line up
      y += 15; // Increment y here instead
      doc.text(`Price: ${pkg.price}`, 10, y);
      y += 5;
      y += 20; // Add some spacing between each package
    });
  
    doc.save('packages.pdf');
  };
  return (
    <div className="container mx-auto p-4">
      <div className="mt-4 max-w-md mx-auto p-4 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Search by package name or price..."
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={searchQuery}
          onChange={handleSearch}
          
        />
      </div>
      <div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" onClick={() => setAddSection(true)}>
      Add
    </button>
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 ml-4" onClick={generatePDF}>
      Generate PDF
    </button>
  </div>

      {addSection || editSection ? (
        <AddPackage
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleClose={handleClose}
          formData={editSection ? formDataEdit : formData}
          updateData={updateData}
        />
      ) : null}
      <div className="tableContainer">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Package name</th>
              <th className="border border-gray-400 px-4 py-2">Description</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
              <th className="border border-gray-400 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((el) => (
                <tr key={el._id}>
                  <td className="border border-gray-400 px-4 py-2">{el.pac_name}</td>
                  <td className="border border-gray-400 px-4 py-2">{el.features}</td>
                  <td className="border border-gray-400 px-4 py-2">{el.price}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleEdit(el)}>Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-400 px-4 py-2" colSpan="5" style={{ textAlign: 'center' }}>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowPackage;
